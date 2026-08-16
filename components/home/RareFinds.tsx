import ProductCard, { ProductCardData } from "@/components/product/ProductCard";

const RARE: ProductCardData[] = [
  { id: "r1", slug: "rare-1", title: "سيف عربي تراثي نادر", price: 12000, image: "/images/rare-1.jpg", tone: "ph-2", badge: "نادرة" },
  { id: "r2", slug: "rare-2", title: "قطعة سيراميك أثرية", price: 8900, image: "/images/rare-2.jpg", tone: "", badge: "نادرة" },
  { id: "r3", slug: "rare-3", title: "تحفة برونزية أوروبية", price: 15500, image: "/images/rare-3.jpg", tone: "ph-3", badge: "نادرة" }
];

export default function RareFinds() {
  return (
    <section className="container" style={{ marginTop: 50 }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <span className="section-label">لعشاق التميز</span>
        <h2 style={{ fontSize: 28, marginTop: 8 }}>التحف النادرة</h2>
      </div>
      <div className="grid-auto grid-3">
        {RARE.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
