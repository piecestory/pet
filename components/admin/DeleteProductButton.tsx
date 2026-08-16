"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "فشل حذف المنتج");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading} style={{ color: "var(--error)", display: "flex", alignItems: "center", gap: 4 }}>
      <Trash2 size={14} />
      {loading ? "جارٍ الحذف..." : "حذف"}
    </button>
  );
}
