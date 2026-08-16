import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

// GET /api/coupons?code=XXXX  → التحقق من صلاحية كوبون
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    const user = getCurrentUser();
    if (!requireRole(user, ["SUPER_ADMIN", "MANAGER"])) return failure("غير مصرح لك بهذا الإجراء", 403);
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
    return success(coupons);
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon || !coupon.isActive) return failure("الكوبون غير صالح", 404);
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return failure("الكوبون منتهي الصلاحية", 400);
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return failure("تم استنفاد الكوبون", 400);

  return success(coupon);
}

const schema = z.object({
  code: z.string().min(3),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  value: z.number().positive(),
  minOrder: z.number().optional(),
  usageLimit: z.number().int().optional(),
  expiresAt: z.string().optional()
});

export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER"])) return failure("غير مصرح لك بهذا الإجراء", 403);

  try {
    const body = schema.parse(await req.json());
    const coupon = await prisma.coupon.create({
      data: { ...body, expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined }
    });
    return success(coupon, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إنشاء الكوبون", 500);
  }
}
