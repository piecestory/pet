import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8)
});

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());

    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) return failure("البريد الإلكتروني مستخدم مسبقًا", 409);

    const passwordHash = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        passwordHash,
        role: "CUSTOMER"
      }
    });

    const token = signToken({ userId: user.id, role: user.role });
    setAuthCookie(token);

    return success({ id: user.id, name: user.name, email: user.email }, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إنشاء الحساب", 500);
  }
}
