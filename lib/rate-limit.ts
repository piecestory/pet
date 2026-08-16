// حماية بسيطة داخل الذاكرة ضد محاولات تسجيل الدخول المتكررة (Brute Force).
// كافية لتطبيق يعمل على سيرفر Node.js واحد (حالة Hostinger هنا)؛ إن انتقل المشروع
// لاحقًا لعدة سيرفرات (Load Balancer)، يُستبدل بحل مشترك مثل Redis.

const attempts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 دقيقة
const MAX_ATTEMPTS = 8;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

// تنظيف دوري بسيط لمنع تسرّب الذاكرة على المدى الطويل
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of attempts.entries()) {
    if (now > entry.resetAt) attempts.delete(key);
  }
}, WINDOW_MS).unref?.();
