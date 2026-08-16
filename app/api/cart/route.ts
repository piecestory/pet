import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  const items = await prisma.cartItem.findMany({
    where: { userId: user.userId },
    include: { product: { include: { images: { take: 1 } } } }
  });

  const subtotal = items.reduce(
    (sum: number, i: (typeof items)[number]) => sum + Number(i.product.price) * i.quantity,
    0
  );

  return success({ items, subtotal });
}

const addSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().default(1)
});

export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  try {
    const body = addSchema.parse(await req.json());

    const item = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: user.userId, productId: body.productId } },
      update: { quantity: { increment: body.quantity } },
      create: { userId: user.userId, productId: body.productId, quantity: body.quantity }
    });

    return success(item, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إضافة المنتج للسلة", 500);
  }
}
