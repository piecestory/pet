const ORDERS = [
  { id: "QW-1001", date: "2026-07-20", status: "تم التوصيل", total: 4200 },
  { id: "QW-1002", date: "2026-07-28", status: "قيد الشحن", total: 2950 }
];

export default function OrdersPage() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>طلباتي</h1>
      <div className="table-scroll">
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "right" }}>
            <th style={{ padding: "10px 0" }}>رقم الطلب</th>
            <th>التاريخ</th>
            <th>الحالة</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((o) => (
            <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "12px 0" }}>{o.id}</td>
              <td>{o.date}</td>
              <td>
                <span style={{ background: "var(--section)", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>{o.status}</span>
              </td>
              <td style={{ color: "var(--gold)", fontWeight: 700 }}>SAR {o.total.toLocaleString("en-US")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
