import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { order: "asc" } }, category: true, auctionItem: true }
  });

  if (!product) return failure("المنتج غير موجود", 404);

  await prisma.product.update({
    where: { id: product.id },
    data: { viewsCount: { increment: 1 } }
  });

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
    take: 4,
    include: { images: { take: 1 } }
  });

  return success({ product, related });
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER", "STAFF"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }
  const body = await req.json();
  const updated = await prisma.product.update({ where: { slug: params.slug }, data: body });
  return success(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }
  await prisma.product.delete({ where: { slug: params.slug } });
  return success({ message: "تم حذف المنتج" });
}
