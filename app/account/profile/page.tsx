export default function ProfilePage() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>الملف الشخصي</h1>
      <div className="grid-auto grid-2" style={{ gap: 16, maxWidth: 560 }}>
        {["الاسم الكامل", "البريد الإلكتروني", "رقم الهاتف"].map((label) => (
          <div key={label}>
            <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{label}</label>
            <input style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "11px 14px" }} />
          </div>
        ))}
      </div>
      <button className="btn btn-primary" style={{ marginTop: 24 }}>
        حفظ التغييرات
      </button>
    </div>
  );
}
