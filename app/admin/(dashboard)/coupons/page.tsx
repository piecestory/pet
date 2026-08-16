const COUPONS = [
  { code: "WELCOME10", type: "نسبة مئوية", value: "10%", used: 34 },
  { code: "FREESHIP", type: "قيمة ثابتة", value: "SAR 50", used: 12 }
];

export default function AdminCouponsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>الكوبونات</h1>
        <button className="btn btn-primary">+ إضافة كوبون</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--section)", textAlign: "right" }}>
              <th style={{ padding: 14 }}>الكود</th>
              <th>النوع</th>
              <th>القيمة</th>
              <th>مرات الاستخدام</th>
            </tr>
          </thead>
          <tbody>
            {COUPONS.map((c) => (
              <tr key={c.code} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 14, fontWeight: 700 }}>{c.code}</td>
                <td>{c.type}</td>
                <td>{c.value}</td>
                <td>{c.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
              </div>
      </div>
    </div>
  );
}
