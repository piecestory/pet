"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "بيانات الدخول غير صحيحة");
        return;
      }

      const adminRoles = ["SUPER_ADMIN", "MANAGER", "STAFF"];
      if (!adminRoles.includes(data.data.role)) {
        setError("هذا الحساب لا يملك صلاحية الوصول للوحة التحكم");
        // نسجّل خروجه فورًا حتى لا تبقى كوكي جلسة عميل عادي على صفحة إدارية
        await fetch("/api/auth/logout", { method: "POST" });
        return;
      }

      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("تعذّر الاتصال بالخادم، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--primary)",
        padding: 20
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ width: "100%", maxWidth: 380, padding: 32, background: "var(--surface)" }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "var(--primary)" }}>قطعة وقصة</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>تسجيل دخول لوحة الإدارة</div>
        </div>

        {error && (
          <div
            style={{
              background: "#fbeceb",
              color: "var(--error)",
              fontSize: 13,
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              marginBottom: 16
            }}
          >
            {error}
          </div>
        )}

        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>البريد الإلكتروني</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "11px 14px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            marginBottom: 16,
            fontSize: 14
          }}
        />

        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>كلمة المرور</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "11px 14px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            marginBottom: 22,
            fontSize: 14
          }}
        />

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
