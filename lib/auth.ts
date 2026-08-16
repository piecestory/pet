import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET_RAW = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const COOKIE_NAME = "auth_token";

if (!JWT_SECRET_RAW || JWT_SECRET_RAW.length < 16) {
  // فشل سريع وواضح عند الإقلاع إن كان JWT_SECRET غير معرَّف أو ضعيفًا جدًا،
  // بدل أن يفشل التوقيع لاحقًا برسالة غامضة وقت أول محاولة تسجيل دخول فعلية
  throw new Error(
    "JWT_SECRET غير معرَّف أو قصير جدًا. ضع قيمة عشوائية طويلة (32+ حرفًا) في ملف .env"
  );
}
// ثابت مُعاد التصريح بنوع string صريح، حتى تحتفظ الدوال أدناه (signToken/verifyToken)
// بالتضييق (narrowing) رغم أن TypeScript لا يمرّره تلقائيًا عبر حدود الدوال المغلقة (closures)
const JWT_SECRET: string = JWT_SECRET_RAW;

export interface JwtPayload {
  userId: string;
  role: "SUPER_ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 أيام
  });
}

export function clearAuthCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getCurrentUser(): JwtPayload | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function requireRole(payload: JwtPayload | null, roles: JwtPayload["role"][]): boolean {
  if (!payload) return false;
  return roles.includes(payload.role);
}
