import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

// DELETE /api/products/[slug]/images/[imageId]  — حذف صورة واحدة من منتج
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string; imageId: string } }
) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER", "STAFF"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }

  const image = await prisma.productImage.findUnique({ where: { id: params.imageId } });
  if (!image) return failure("الصورة غير موجودة", 404);

  await prisma.productImage.delete({ where: { id: params.imageId } });

  return success({ message: "تم حذف الصورة" });
}
