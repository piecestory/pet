const INTERESTS = [
  { id: "1", name: "فيصل الدوسري", item: "سيف عربي تراثي نادر", maxBudget: 13000 },
  { id: "2", name: "لطيفة السبيعي", item: "تحفة برونزية أوروبية", maxBudget: 16000 }
];

export default function AdminAuctionInterestPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>طلبات الاهتمام بالمزادات</h1>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--section)", textAlign: "right" }}>
              <th style={{ padding: 14 }}>العميل</th>
              <th>القطعة</th>
              <th>أعلى ميزانية</th>
            </tr>
          </thead>
          <tbody>
            {INTERESTS.map((i) => (
              <tr key={i.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 14 }}>{i.name}</td>
                <td>{i.item}</td>
                <td style={{ color: "var(--gold)", fontWeight: 700 }}>SAR {i.maxBudget.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
              </div>
      </div>
    </div>
  );
}
