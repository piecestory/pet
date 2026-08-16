import ProductCard, { ProductCardData } from "@/components/product/ProductCard";

const WISHLIST: ProductCardData[] = [
  { id: "1", slug: "vintage-vase", title: "مزهرية صينية قديمة", price: 1850, image: "/images/product-vase.jpg" },
  { id: "2", slug: "french-clock", title: "ساعة كلاسيكية فرنسية", price: 2950, image: "/images/product-clock.jpg" }
];

export default function WishlistPage() {
  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>المفضلة</h1>
      <div className="grid-auto grid-3">
        {WISHLIST.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
