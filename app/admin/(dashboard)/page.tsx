const STATS = [
  { label: "عدد المنتجات", value: "248" },
  { label: "عدد الطلبات", value: "1,024" },
  { label: "الإيرادات", value: "SAR 512,300" },
  { label: "طلبات الباحث الشخصي", value: "37" },
  { label: "طلبات المزادات", value: "52" }
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>لوحة التحكم</h1>
      <div className="grid-auto grid-5" style={{ gap: 16 }}>
        {STATS.map((s) => (
          <div key={s.label} className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--primary)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20, marginTop: 24 }}>
        <h3 style={{ fontSize: 16, marginBottom: 14 }}>المنتجات الأكثر مشاهدة</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          تعرض هذه اللوحة أعلى المنتجات مشاهدة بناءً على حقل viewsCount في قاعدة البيانات.
        </p>
      </div>
    </div>
  );
}
