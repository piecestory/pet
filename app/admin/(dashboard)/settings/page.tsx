export default function AdminSettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>الإعدادات</h1>
      <div className="card" style={{ padding: 24, maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="اسم المتجر" defaultValue="قطعة وقصة" />
        <Field label="البريد الإلكتروني للتواصل" defaultValue="info@qet3a-w-qesa.sa" />
        <Field label="رقم الهاتف" />
        <Field label="نسبة الضريبة (%)" defaultValue="15" />
        <button className="btn btn-primary" style={{ width: "fit-content" }}>
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{label}</label>
      <input
        defaultValue={defaultValue}
        style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "11px 14px" }}
      />
    </div>
  );
}
