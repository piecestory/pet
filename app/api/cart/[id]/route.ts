import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

const updateSchema = z.object({ quantity: z.number().int().positive() });

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  try {
    const body = updateSchema.parse(await req.json());
    const item = await prisma.cartItem.updateMany({
      where: { id: params.id, userId: user.userId },
      data: { quantity: body.quantity }
    });
    if (item.count === 0) return failure("العنصر غير موجود", 404);
    return success({ message: "تم تحديث الكمية" });
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء التحديث", 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return failure("يجب تسجيل الدخول", 401);

  await prisma.cartItem.deleteMany({ where: { id: params.id, userId: user.userId } });
  return success({ message: "تم حذف المنتج من السلة" });
}
