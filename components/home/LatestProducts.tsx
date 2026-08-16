import Link from "next/link";
import ProductCard, { ProductCardData } from "@/components/product/ProductCard";

const SAMPLE_PRODUCTS: ProductCardData[] = [
  { id: "1", slug: "vintage-vase", title: "مزهرية صينية قديمة", price: 1850, image: "/images/product-vase.jpg", tone: "" },
  { id: "2", slug: "french-clock", title: "ساعة كلاسيكية فرنسية", price: 2950, image: "/images/product-clock.jpg", tone: "ph-2" },
  { id: "3", slug: "luxury-chair", title: "كرسي كلاسيك فاخر", price: 3750, image: "/images/product-chair.jpg", tone: "ph-3" },
  { id: "4", slug: "crystal-chandelier", title: "نجفة كريستال ذهبية", price: 4200, image: "/images/product-chandelier.jpg", tone: "" },
  { id: "5", slug: "vintage-gramophone", title: "جرامافون أنتيك قديم", price: 2150, image: "/images/product-gramophone.jpg", tone: "ph-2" }
];

export default function LatestProducts() {
  return (
    <section className="container" style={{ marginTop: 50 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h2 style={{ fontSize: 26 }}>أحدث القطع</h2>
        <Link href="/shop" style={{ color: "var(--accent)", fontWeight: 600 }}>
          عرض الكل
        </Link>
      </div>
      <div className="grid-auto grid-5">
        {SAMPLE_PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
