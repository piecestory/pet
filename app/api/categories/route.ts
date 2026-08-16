import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } }
  });
  return success(categories);
}

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional()
});

export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }
  try {
    const body = schema.parse(await req.json());
    const category = await prisma.category.create({ data: body });
    return success(category, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إنشاء التصنيف", 500);
  }
}
