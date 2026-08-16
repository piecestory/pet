import { clearAuthCookie } from "@/lib/auth";
import { success } from "@/lib/api-response";

export async function POST() {
  clearAuthCookie();
  return success({ message: "تم تسجيل الخروج بنجاح" });
}
