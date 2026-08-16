import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container page-padding" style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 24, textAlign: "center" }}>تواصل معنا</h1>
        <form className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="الاسم" />
          <Field label="البريد الإلكتروني" />
          <TextArea label="رسالتك" />
          <button className="btn btn-primary" type="submit">
            إرسال
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
      <textarea rows={5} style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "11px 14px", fontFamily: "var(--font-ar)" }} />
    </div>
  );
}
