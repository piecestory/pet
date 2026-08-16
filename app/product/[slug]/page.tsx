import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard, { ProductCardData } from "@/components/product/ProductCard";
import DatabaseErrorNotice from "@/components/admin/DatabaseErrorNotice";
import { prisma } from "@/lib/prisma";
import { Heart, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

// صفحة المنتج تُبنى من بيانات حيّة في قاعدة البيانات حسب الـ slug في الرابط
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  let product: Awaited<ReturnType<typeof prisma.product.findUnique>> = null;
  let related: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let errorDetail: string | null = null;

  try {
    product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { images: { orderBy: { order: "asc" } }, category: true }
    });

    if (product) {
      related = await prisma.product.findMany({
        where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
        take: 4,
        include: { images: { take: 1 } }
      });
    }
  } catch (err) {
    errorDetail = err instanceof Error ? err.message : "خطأ غير معروف أثناء الاتصال بقاعدة البيانات";
  }

  if (errorDetail) {
    return (
      <>
        <Header />
        <main className="container page-padding">
          <DatabaseErrorNotice detail={errorDetail} />
        </main>
        <Footer />
      </>
    );
  }

  if (!product) notFound();

  const relatedCards: ProductCardData[] = related.map((r: (typeof related)[number]) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    price: Number(r.price),
    image: r.images?.[0]?.url || "/images/placeholder.jpg"
  }));

  const productImages = product.images ?? [];
  const images =
    productImages.length > 0
      ? productImages.map((i: (typeof productImages)[number]) => i.url)
      : ["/images/placeholder.jpg"];

  return (
    <>
      <Header />
      <main className="container page-padding">
        <div className="product-detail-grid">
          {/* معرض الصور */}
          <div>
            <div
              className="card"
              style={{
                aspectRatio: "1 / 1",
                backgroundImage: `url(${images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginBottom: 14
              }}
            />
            {images.length > 1 && (
              <div className="grid-auto" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {images.map((img: string, i: number) => (
                  <div
                    key={i}
                    className="card"
                    style={{
                      aspectRatio: "1 / 1",
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* تفاصيل المنتج */}
          <div>
            <h1 style={{ fontSize: 30, marginBottom: 10 }}>{product.title}</h1>
            <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 24 }}>
              SAR {Number(product.price).toLocaleString("en-US")}
            </span>

            {product.description && (
              <p style={{ marginTop: 20, color: "var(--text-secondary)", lineHeight: 2 }}>{product.description}</p>
            )}

            {product.story && (
              <div style={{ background: "var(--section)", borderRadius: "var(--radius-lg)", padding: 20, marginTop: 20 }}>
                <h3 style={{ fontSize: 16, marginBottom: 8, color: "var(--accent)" }}>القصة التاريخية</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 2 }}>{product.story}</p>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
              {product.countryOfOrigin && <Spec label="بلد المنشأ" value={product.countryOfOrigin} />}
              {product.era && <Spec label="الفترة الزمنية" value={product.era} />}
              {product.dimensions && <Spec label="الأبعاد" value={product.dimensions} />}
              {product.material && <Spec label="المادة" value={product.material} />}
              {product.condition && <Spec label="الحالة" value={product.condition} />}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <button className="btn btn-primary" style={{ flex: 1, minWidth: 160 }}>
                <ShoppingBag size={18} /> إضافة للسلة
              </button>
              <button className="btn btn-outline">
                <Heart size={18} /> إضافة للمفضلة
              </button>
            </div>

            <div style={{ display: "flex", gap: 24, marginTop: 24, fontSize: 13, color: "var(--text-secondary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Truck size={16} color="var(--accent)" /> شحن سريع وآمن
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ShieldCheck size={16} color="var(--accent)" /> قطعة أصلية موثقة
              </span>
            </div>
          </div>
        </div>

        {relatedCards.length > 0 && (
          <section style={{ marginTop: 60 }}>
            <h2 style={{ fontSize: 24, marginBottom: 22 }}>منتجات مشابهة</h2>
            <div className="grid-auto grid-4">
              {relatedCards.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
