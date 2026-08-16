import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="container layout-split page-padding">
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 24 }}>إتمام الطلب</h1>

          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>بيانات العميل</h3>
            <div className="grid-auto grid-2" style={{ gap: 14 }}>
              <Field label="الاسم الكامل" />
              <Field label="رقم الهاتف" />
              <Field label="البريد الإلكتروني" full />
            </div>
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>عنوان الشحن</h3>
            <div className="grid-auto grid-2" style={{ gap: 14 }}>
              <Field label="الدولة" />
              <Field label="المدينة" />
              <Field label="الحي" />
              <Field label="الشارع" />
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>طريقة الدفع</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["الدفع عند الاستلام", "بطاقة ائتمانية / مدى", "Apple Pay"].map((method) => (
                <label key={method} style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px 16px" }}>
                  <input type="radio" name="payment" /> {method}
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="card" style={{ padding: 24, height: "fit-content" }}>
          <h3 style={{ fontSize: 18, marginBottom: 20 }}>ملخص الطلب</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "var(--text-secondary)" }}>
            <span>المجموع الفرعي</span>
            <span>SAR 7,150.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "var(--text-secondary)" }}>
            <span>الشحن</span>
            <span>مجاني</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "var(--text-secondary)" }}>
            <span>الضريبة (15%)</span>
            <span>SAR 1,072.50</span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "14px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
            <span>الإجمالي</span>
            <span style={{ color: "var(--gold)" }}>SAR 8,222.50</span>
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }}>
            تأكيد الطلب
          </button>
        </aside>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, full }: { label: string; full?: boolean }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{label}</label>
      <input
        style={{
          width: "100%",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "11px 14px",
          fontFamily: "var(--font-ar)"
        }}
      />
    </div>
  );
}
