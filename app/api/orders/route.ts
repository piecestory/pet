import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  const isAdmin = requireRole(user, ["SUPER_ADMIN", "MANAGER", "STAFF"]);
  const where = isAdmin ? {} : { userId: user.userId };

  const orders = await prisma.order.findMany({
    where,
    include: { items: true, address: true },
    orderBy: { createdAt: "desc" }
  });

  return success(orders);
}

const checkoutSchema = z.object({
  addressId: z.string().optional(),
  address: z
    .object({
      fullName: z.string(),
      phone: z.string(),
      country: z.string(),
      city: z.string(),
      district: z.string().optional(),
      street: z.string().optional()
    })
    .optional(),
  paymentMethod: z.string(),
  couponCode: z.string().optional(),
  notes: z.string().optional()
});

export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  try {
    const body = checkoutSchema.parse(await req.json());

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.userId },
      include: { product: true }
    });
    if (cartItems.length === 0) return failure("السلة فارغة", 400);

    const subtotal = cartItems.reduce(
      (sum: number, i: (typeof cartItems)[number]) => sum + Number(i.product.price) * i.quantity,
      0
    );

    let discount = 0;
    let couponId: string | undefined;
    if (body.couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: body.couponCode } });
      if (coupon && coupon.isActive && (!coupon.expiresAt || coupon.expiresAt > new Date())) {
        discount = coupon.type === "PERCENTAGE" ? (subtotal * Number(coupon.value)) / 100 : Number(coupon.value);
        couponId = coupon.id;
      }
    }

    const shippingFee = subtotal > 1000 ? 0 : 50;
    const taxAmount = Math.round((subtotal - discount) * 0.15 * 100) / 100; // ضريبة القيمة المضافة 15%
    const total = subtotal - discount + shippingFee + taxAmount;

    let addressId = body.addressId;
    if (!addressId && body.address) {
      const created = await prisma.address.create({
        data: { ...body.address, userId: user.userId }
      });
      addressId = created.id;
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: `QW-${Date.now()}`,
        userId: user.userId,
        addressId,
        subtotal,
        shippingFee,
        taxAmount,
        discount,
        total,
        couponId,
        paymentMethod: body.paymentMethod,
        notes: body.notes,
        items: {
          create: cartItems.map((i: (typeof cartItems)[number]) => ({
            productId: i.productId,
            title: i.product.title,
            price: i.product.price,
            quantity: i.quantity
          }))
        }
      },
      include: { items: true }
    });

    await prisma.cartItem.deleteMany({ where: { userId: user.userId } });
    if (couponId) await prisma.coupon.update({ where: { id: couponId }, data: { usedCount: { increment: 1 } } });

    return success(order, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إنشاء الطلب", 500);
  }
}
