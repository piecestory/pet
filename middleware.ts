import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// middleware يعمل على Edge Runtime، الذي لا يدعم مكتبة jsonwebtoken المستخدمة
// في lib/auth.ts (تعتمد على وحدات Node.js). لذلك نستخدم هنا "jose" فقط للتحقق
// السريع من صلاحية التوكن قبل السماح بالوصول لصفحات لوحة التحكم.
// التحقق الكامل (توليد التوكن، إلخ) يبقى في lib/auth.ts كما هو.

const COOKIE_NAME = "auth_token";
const ADMIN_ROLES = ["SUPER_ADMIN", "MANAGER", "STAFF"];

async function getRoleFromToken(token: string | undefined): Promise<string | null> {
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return (payload.role as string) || null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // صفحة تسجيل الدخول نفسها يجب أن تبقى متاحة دائمًا، وإلا نُنشئ حلقة تحويل لا نهائية
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const role = await getRoleFromToken(token);

  if (!role || !ADMIN_ROLES.includes(role)) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
