export default function TopBar() {
  return (
    <div style={{ background: "var(--primary)", color: "var(--surface)" }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 13,
          padding: "8px 40px",
          opacity: 0.9,
          gap: 12,
          overflowX: "auto",
          whiteSpace: "nowrap"
        }}
      >
        <div className="desktop-only" style={{ gap: 20 }}>
          <span>تواصل معنا</span>
          <span>الأسئلة الشائعة</span>
          <span>تتبع الطلب</span>
        </div>
        <div className="desktop-only" style={{ gap: 20 }}>
          <span>تغليف فاخر وآمن</span>
          <span>منتجات أصلية</span>
          <span>شحن سريع داخل السعودية</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span>SAR</span>
          <span>العربية</span>
        </div>
      </div>
    </div>
  );
}
