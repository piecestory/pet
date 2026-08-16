const CUSTOMERS = [
  { id: "1", name: "سارة العتيبي", email: "sara@example.com", orders: 4 },
  { id: "2", name: "خالد الشمري", email: "khaled@example.com", orders: 2 },
  { id: "3", name: "منى الحربي", email: "mona@example.com", orders: 7 }
];

export default function AdminCustomersPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>العملاء</h1>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--section)", textAlign: "right" }}>
              <th style={{ padding: 14 }}>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>عدد الطلبات</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 14 }}>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
              </div>
      </div>
    </div>
  );
}
