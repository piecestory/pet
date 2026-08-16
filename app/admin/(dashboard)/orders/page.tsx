const ORDERS = [
  { id: "QW-1001", customer: "سارة العتيبي", date: "2026-07-20", status: "تم التوصيل", total: 4200 },
  { id: "QW-1002", customer: "خالد الشمري", date: "2026-07-28", status: "قيد الشحن", total: 2950 },
  { id: "QW-1003", customer: "منى الحربي", date: "2026-08-01", status: "قيد المعالجة", total: 1850 }
];

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>الطلبات</h1>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--section)", textAlign: "right" }}>
              <th style={{ padding: 14 }}>رقم الطلب</th>
              <th>العميل</th>
              <th>التاريخ</th>
              <th>الحالة</th>
              <th>الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 14 }}>{o.id}</td>
                <td>{o.customer}</td>
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
    </div>
  );
}
