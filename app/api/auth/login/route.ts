import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken, setAuthCookie } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";
import { isRateLimited } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());

    // المفتاح يجمع البريد + IP لتفادي حظر مستخدم بسبب عناوين IP مشتركة (شبكات NAT)
    // مع منع أي جهة من تجربة آلاف كلمات المرور على نفس البريد بسرعة
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(`login:${body.email}:${ip}`)) {
      return failure("محاولات دخول كثيرة، حاول مرة أخرى بعد قليل", 429);
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user || !user.isActive) return failure("بيانات الدخول غير صحيحة", 401);

    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) return failure("بيانات الدخول غير صحيحة", 401);

    const token = signToken({ userId: user.id, role: user.role });
    setAuthCookie(token);

    return success({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء تسجيل الدخول", 500);
  }
}
