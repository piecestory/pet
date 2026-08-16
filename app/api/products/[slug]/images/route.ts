import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

const schema = z.object({
  urls: z.array(z.string()).min(1)
});

// POST /api/products/[slug]/images  — إضافة صور جديدة لمنتج موجود
// يُستخدم بعد رفع الملفات عبر /api/upload والحصول على الروابط
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER", "STAFF"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }

  try {
    const body = schema.parse(await req.json());

    const product = await prisma.product.findUnique({ where: { slug: params.slug } });
    if (!product) return failure("المنتج غير موجود", 404);

    const lastImage = await prisma.productImage.findFirst({
      where: { productId: product.id },
      orderBy: { order: "desc" }
    });
    const startOrder = (lastImage?.order ?? -1) + 1;

    await prisma.productImage.createMany({
      data: body.urls.map((url, i) => ({
        productId: product.id,
        url,
        order: startOrder + i
      }))
    });

    const images = await prisma.productImage.findMany({
      where: { productId: product.id },
      orderBy: { order: "asc" }
    });

    return success(images, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إضافة الصور", 500);
  }
}
