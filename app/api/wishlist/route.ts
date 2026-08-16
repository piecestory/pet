import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.userId },
    include: { product: { include: { images: { take: 1 } } } }
  });
  return success(items);
}

const schema = z.object({ productId: z.string() });

export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  try {
    const body = schema.parse(await req.json());
    const existing = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId: user.userId, productId: body.productId } }
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return success({ added: false });
    }

    await prisma.wishlistItem.create({ data: { userId: user.userId, productId: body.productId } });
    return success({ added: true }, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء تحديث المفضلة", 500);
  }
}
