"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    sku: "",
    title: "",
    categoryId: "",
    price: "",
    description: "",
    story: "",
    countryOfOrigin: "",
    era: "",
    material: "",
    dimensions: "",
    condition: "",
    stock: "1"
  });

  // جلب التصنيفات عند فتح الصفحة
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setCategories(res.data);
      });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.sku || !form.categoryId || !form.price) {
      setError("يرجى تعبئة الحقول الأساسية: SKU، الاسم، التصنيف، السعر");
      return;
    }

    setLoading(true);
    try {
      // 1) رفع الصور أولًا (إن وُجدت)
      let imageUrls: string[] = [];
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadJson = await uploadRes.json();

        if (!uploadRes.ok || !uploadJson.success) {
          throw new Error(uploadJson.error || "فشل رفع الصور");
        }
        imageUrls = uploadJson.data.urls;
      }

      // 2) إنشاء المنتج
      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: form.sku,
          title: form.title,
          categoryId: form.categoryId,
          price: Number(form.price),
          description: form.description || undefined,
          story: form.story || undefined,
          countryOfOrigin: form.countryOfOrigin || undefined,
          era: form.era || undefined,
          material: form.material || undefined,
          dimensions: form.dimensions || undefined,
          condition: form.condition || undefined,
          stock: Number(form.stock),
          images: imageUrls
        })
      });

      const productJson = await productRes.json();
      if (!productRes.ok || !productJson.success) {
        throw new Error(productJson.error || "فشل إنشاء المنتج");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>إضافة منتج جديد</h1>

      {error && (
        <div
          style={{
            background: "#FBEAE6",
            border: "1px solid var(--error)",
            color: "var(--error)",
            padding: "12px 16px",
            borderRadius: "var(--radius-sm)",
            marginBottom: 18,
            fontSize: 14
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        {/* رفع الصور */}
        <div>
          <label style={labelStyle}>صور المنتج (يمكن اختيار عدة صور)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageSelect} />
          {previews.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              {previews.map((src, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    width: 90,
                    height: 90,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    overflow: "hidden"
                  }}
                >
                  <Image src={src} alt={`معاينة ${i + 1}`} fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid-auto grid-2" style={{ gap: 16 }}>
          <Field label="رمز المنتج (SKU)" name="sku" value={form.sku} onChange={handleChange} required />
          <Field label="اسم المنتج" name="title" value={form.title} onChange={handleChange} required />

          <div>
            <label style={labelStyle}>التصنيف *</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} style={inputStyle} required>
              <option value="">اختر التصنيف</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Field label="السعر (SAR)" name="price" type="number" value={form.price} onChange={handleChange} required />
          <Field label="الكمية المتوفرة" name="stock" type="number" value={form.stock} onChange={handleChange} />
          <Field label="بلد المنشأ" name="countryOfOrigin" value={form.countryOfOrigin} onChange={handleChange} />
          <Field label="الحقبة الزمنية" name="era" value={form.era} onChange={handleChange} />
          <Field label="المادة" name="material" value={form.material} onChange={handleChange} />
          <Field label="الأبعاد" name="dimensions" value={form.dimensions} onChange={handleChange} />
          <Field label="الحالة" name="condition" value={form.condition} onChange={handleChange} />
        </div>

        <TextArea label="الوصف التفصيلي" name="description" value={form.description} onChange={handleChange} />
        <TextArea label="القصة التاريخية" name="story" value={form.story} onChange={handleChange} />

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "fit-content" }}>
          {loading ? "جاري الحفظ..." : "حفظ المنتج"}
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 };
const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "11px 14px",
  fontFamily: "var(--font-ar)"
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label} {required && "*"}
      </label>
      <input name={name} type={type} value={value} onChange={onChange} style={inputStyle} />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea name={name} rows={4} value={value} onChange={onChange} style={inputStyle} />
    </div>
  );
}
