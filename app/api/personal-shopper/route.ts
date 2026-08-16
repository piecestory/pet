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
  const requests = await prisma.personalShopperRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true, phone: true } } }
  });
  return success(requests);
}

const schema = z.object({
  itemType: z.string().min(2),
  era: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  budget: z.number().positive().optional(),
  description: z.string().min(10),
  referenceImages: z.array(z.string()).optional()
});

export async function POST(req: NextRequest) {
  const user = getCurrentUser();

  try {
    const body = schema.parse(await req.json());

    const request = await prisma.personalShopperRequest.create({
      data: {
        userId: user?.userId,
        itemType: body.itemType,
        era: body.era,
        countryOfOrigin: body.countryOfOrigin,
        budget: body.budget,
        description: body.description,
        referenceImages: body.referenceImages ? JSON.stringify(body.referenceImages) : undefined
      }
    });

    return success(request, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إرسال الطلب", 500);
  }
}
