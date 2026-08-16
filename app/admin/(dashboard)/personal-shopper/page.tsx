const REQUESTS = [
  { id: "1", name: "أحمد القحطاني", itemType: "لوحة زيتية إيطالية", budget: 5000, status: "جديد" },
  { id: "2", name: "ريم العنزي", itemType: "خزانة خشبية عثمانية", budget: 8000, status: "قيد المتابعة" }
];

export default function AdminPersonalShopperPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>طلبات الباحث الشخصي</h1>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--section)", textAlign: "right" }}>
              <th style={{ padding: 14 }}>العميل</th>
              <th>ماذا يبحث</th>
              <th>الميزانية</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {REQUESTS.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 14 }}>{r.name}</td>
                <td>{r.itemType}</td>
                <td style={{ color: "var(--gold)", fontWeight: 700 }}>SAR {r.budget.toLocaleString("en-US")}</td>
                <td>
                  <span style={{ background: "var(--section)", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
              </div>
      </div>
    </div>
  );
}
