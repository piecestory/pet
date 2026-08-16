const ADDRESSES = [
  { id: "1", fullName: "عبدالله الحربي", city: "الرياض", district: "النرجس", phone: "05xxxxxxxx", isDefault: true }
];

export default function AddressesPage() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 22 }}>العناوين</h1>
        <button className="btn btn-primary">إضافة عنوان جديد</button>
      </div>
      {ADDRESSES.map((a) => (
        <div key={a.id} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{a.fullName}</strong>
            {a.isDefault && (
              <span style={{ fontSize: 12, background: "var(--section)", padding: "2px 10px", borderRadius: 20 }}>
                افتراضي
              </span>
            )}
          </div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 6 }}>
            {a.district}، {a.city} — {a.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
