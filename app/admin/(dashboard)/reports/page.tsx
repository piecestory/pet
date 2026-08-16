export default function AdminReportsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>التقارير</h1>
      <div className="card" style={{ padding: 20 }}>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 2 }}>
          تعرض هذه الصفحة تقارير المبيعات، أداء المنتجات، وسلوك العملاء بناءً على بيانات جداول orders و
          order_items و products، ويمكن تصديرها كملفات Excel/PDF في مرحلة لاحقة.
        </p>
      </div>
    </div>
  );
}
