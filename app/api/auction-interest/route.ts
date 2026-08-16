import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER", "STAFF"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }
  const interests = await prisma.auctionInterest.findMany({
    orderBy: { createdAt: "desc" },
    include: { auctionItem: { include: { product: true } } }
  });
  return success(interests);
}

const schema = z.object({
  auctionItemId: z.string(),
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  maxBudget: z.number().positive(),
  notes: z.string().optional()
});

export async function POST(req: NextRequest) {
  const user = getCurrentUser();

  try {
    const body = schema.parse(await req.json());

    const interest = await prisma.auctionInterest.create({
      data: { ...body, userId: user?.userId }
    });

    return success(interest, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء تسجيل الاهتمام", 500);
  }
}
