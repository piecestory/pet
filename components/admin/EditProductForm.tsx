"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface ExistingImage {
  id: string;
  url: string;
}

interface ProductData {
  id: string;
  slug: string;
  sku: string;
  title: string;
  categoryId: string;
  price: number;
  description: string;
  story: string;
  countryOfOrigin: string;
  era: string;
  material: string;
  dimensions: string;
  condition: string;
  stock: number;
  images: ExistingImage[];
}

interface Category {
  id: string;
  name: string;
}

export default function EditProductForm({ product, categories }: { product: ProductData; categories: Category[] }) {
  const router = useRouter();
  const [images, setImages] = useState<ExistingImage[]>(product.images);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    sku: product.sku,
    title: product.title,
    categoryId: product.categoryId,
    price: String(product.price),
    description: product.description,
    story: product.story,
    countryOfOrigin: product.countryOfOrigin,
    era: product.era,
    material: product.material,
    dimensions: product.dimensions,
    condition: product.condition,
    stock: String(product.stock)
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleNewFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setNewFiles(files);
    setNewPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  // حذف صورة موجودة مسبقًا (طلب فوري لقاعدة البيانات)
  async function handleDeleteExisting(imageId: string) {
    if (!confirm("هل تريد حذف هذه الصورة؟")) return;
    setDeletingId(imageId);
    setError("");
    try {
      const res = await fetch(`/api/products/${product.slug}/images/${imageId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "فشل حذف الصورة");
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.sku || !form.categoryId || !form.price) {
      setError("يرجى تعبئة الحقول الأساسية: SKU، الاسم، التصنيف، السعر");
      return;
    }

    setLoading(true);
    try {
      // 1) رفع أي صور جديدة وإرفاقها بالمنتج
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok || !uploadJson.success) throw new Error(uploadJson.error || "فشل رفع الصور");

        const attachRes = await fetch(`/api/products/${product.slug}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: uploadJson.data.urls })
        });
        const attachJson = await attachRes.json();
        if (!attachRes.ok || !attachJson.success) throw new Error(attachJson.error || "فشل إرفاق الصور");

        setImages(attachJson.data);
        setNewFiles([]);
        setNewPreviews([]);
      }

      // 2) تحديث بيانات المنتج
      const updateRes = await fetch(`/api/products/${product.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: form.sku,
          title: form.title,
          categoryId: form.categoryId,
          price: Number(form.price),
          description: form.description || null,
          story: form.story || null,
          countryOfOrigin: form.countryOfOrigin || null,
          era: form.era || null,
          material: form.material || null,
          dimensions: form.dimensions || null,
          condition: form.condition || null,
          stock: Number(form.stock)
        })
      });
      const updateJson = await updateRes.json();
      if (!updateRes.ok || !updateJson.success) throw new Error(updateJson.error || "فشل تحديث المنتج");

      setSuccess("تم حفظ التعديلات بنجاح");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
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
      {success && (
        <div
          style={{
            background: "#EAF2E4",
            border: "1px solid var(--success)",
            color: "var(--success)",
            padding: "12px 16px",
            borderRadius: "var(--radius-sm)",
            marginBottom: 18,
            fontSize: 14
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        {/* الصور الحالية */}
        <div>
          <label style={labelStyle}>الصور الحالية</label>
          {images.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>لا توجد صور بعد لهذا المنتج.</p>
          ) : (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              {images.map((img) => (
                <div
                  key={img.id}
                  style={{
                    position: "relative",
                    width: 90,
                    height: 90,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    overflow: "hidden"
                  }}
                >
                  <Image src={img.url} alt="صورة المنتج" fill style={{ objectFit: "cover" }} unoptimized />
                  <button
                    type="button"
                    onClick={() => handleDeleteExisting(img.id)}
                    disabled={deletingId === img.id}
                    aria-label="حذف الصورة"
                    style={{
                      position: "absolute",
                      top: 4,
                      left: 4,
                      background: "rgba(43,33,27,0.75)",
                      border: "none",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Trash2 size={13} color="#fff" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* إضافة صور جديدة */}
        <div>
          <label style={labelStyle}>إضافة صور جديدة</label>
          <input type="file" multiple accept="image/*" onChange={handleNewFiles} />
          {newPreviews.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              {newPreviews.map((src, i) => (
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
          {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
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
