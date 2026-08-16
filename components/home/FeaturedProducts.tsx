import ProductCard, { ProductCardData } from "@/components/product/ProductCard";

const FEATURED: ProductCardData[] = [
  { id: "f1", slug: "featured-1", title: "لوحة زيتية أوروبية أصلية", price: 6500, image: "/images/featured-1.jpg", tone: "" },
  { id: "f2", slug: "featured-2", title: "صندوق مجوهرات عثماني", price: 3200, image: "/images/featured-2.jpg", tone: "ph-2" },
  { id: "f3", slug: "featured-3", title: "طاولة قهوة كلاسيكية", price: 4800, image: "/images/featured-3.jpg", tone: "ph-3" },
  { id: "f4", slug: "featured-4", title: "مرآة ذهبية منحوتة", price: 2600, image: "/images/featured-4.jpg", tone: "" }
];

export default function FeaturedProducts() {
  return (
    <section style={{ background: "var(--section)", padding: "50px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <span className="section-label">مختارات المعرض</span>
          <h2 style={{ fontSize: 28, marginTop: 8 }}>المنتجات المميزة</h2>
        </div>
        <div className="grid-auto grid-4">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
