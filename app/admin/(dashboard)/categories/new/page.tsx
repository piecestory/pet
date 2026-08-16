"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function toSlug(text: string) {
    return text
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\u0621-\u064Aa-zA-Z0-9-]/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name) {
      setError("يرجى إدخال اسم التصنيف");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug: `${toSlug(name)}-${Date.now()}`, description })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "فشل إنشاء التصنيف");

      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>إضافة تصنيف جديد</h1>

      {error && (
        <div style={{ background: "#FBEAE6", border: "1px solid var(--error)", color: "var(--error)", padding: "12px 16px", borderRadius: "var(--radius-sm)", marginBottom: 18, fontSize: 14 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
        <div>
          <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>اسم التصنيف *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "11px 14px" }} />
        </div>
        <div>
          <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>وصف مختصر (اختياري)</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "11px 14px", fontFamily: "var(--font-ar)" }} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "fit-content" }}>
          {loading ? "جاري الحفظ..." : "حفظ التصنيف"}
        </button>
      </form>
    </div>
  );
}
