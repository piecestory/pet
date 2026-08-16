import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search } from "lucide-react";

export default function PersonalShopperPage() {
  return (
    <>
      <Header />
      <main className="container page-padding" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Search size={32} color="var(--accent)" style={{ margin: "0 auto 10px" }} />
          <h1 style={{ fontSize: 28 }}>الباحث الشخصي</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>
            أخبرنا عن القطعة التي تبحث عنها وسنساعدك في إيجادها
          </p>
        </div>

        <form className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="ماذا تبحث؟ / نوع القطعة" />
          <div className="grid-auto grid-2" style={{ gap: 16 }}>
            <Field label="الحقبة" />
            <Field label="بلد المنشأ" />
          </div>
          <Field label="الميزانية التقريبية (SAR)" />
          <TextArea label="وصف تفصيلي" />
          <div>
            <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              رفع صور مرجعية (اختياري)
            </label>
            <input type="file" multiple accept="image/*" />
          </div>
          <button className="btn btn-primary" type="submit">
            إرسال الطلب
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

function Field({ label }: { label: string }) {
  return (
    <div>
      <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{label}</label>
      <input style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "11px 14px" }} />
    </div>
  );
}

function TextArea({ label }: { label: string }) {
  return (
    <div>
      <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{label}</label>
      <textarea
        rows={4}
        style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "11px 14px", fontFamily: "var(--font-ar)" }}
      />
    </div>
  );
}
