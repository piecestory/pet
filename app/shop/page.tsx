import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard, { ProductCardData } from "@/components/product/ProductCard";
import DatabaseErrorNotice from "@/components/admin/DatabaseErrorNotice";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// هذه الصفحة تعرض بيانات حيّة من قاعدة البيانات في كل زيارة — يجب تعطيل التوليد الثابت
export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

interface ShopPageProps {
  searchParams: {
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  };
}

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const search = searchParams.search?.trim() || "";
  const categorySlug = searchParams.category || "";
  const sort = searchParams.sort || "newest";
  const page = Math.max(1, Number(searchParams.page) || 1);

  const where: Prisma.ProductWhereInput = { isActive: true };
  if (search) {
    where.OR = [{ title: { contains: search } }, { description: { contains: search } }];
  }
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price_asc" ? { price: "asc" } : sort === "price_desc" ? { price: "desc" } : { createdAt: "desc" };

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let total = 0;
  let categories: CategoryOption[] = [];
  let errorDetail: string | null = null;

  try {
    [products, total, categories] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: { images: { orderBy: { order: "asc" }, take: 1 } }
      }),
      prisma.product.count({ where }),
      prisma.category.findMany({ orderBy: { order: "asc" } })
    ]);
  } catch (err) {
    errorDetail = err instanceof Error ? err.message : "خطأ غير معروف أثناء الاتصال بقاعدة البيانات";
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const productCards: ProductCardData[] = products.map(
    (p: { id: string; slug: string; title: string; price: number | string; images: { url: string }[] }) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      price: Number(p.price),
      image: p.images?.[0]?.url || "/images/placeholder.jpg"
    })
  );

  // يبني رابط استعلام جديد مع الحفاظ على بقية الفلاتر الحالية
  function buildLink(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const merged = { search, category: categorySlug, sort, page: String(page), ...overrides };
    Object.entries(merged).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const qs = params.toString();
    return qs ? `/shop?${qs}` : "/shop";
  }

  return (
    <>
      <Header />
      <main className="container layout-sidebar page-padding">
        {/* الفلاتر */}
        <aside className="card" style={{ padding: 24, height: "fit-content" }}>
          <h3 style={{ fontSize: 18, marginBottom: 18 }}>الفلاتر</h3>

          <form action="/shop" method="get" style={{ marginBottom: 22 }}>
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            {sort && <input type="hidden" name="sort" value={sort} />}
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>البحث</div>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="ابحث عن منتج..."
              style={{
                width: "100%",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 14px",
                fontFamily: "var(--font-ar)",
                marginBottom: 10
              }}
            />
            <button type="submit" className="btn btn-outline" style={{ width: "100%" }}>
              بحث
            </button>
          </form>

          <div style={{ marginBottom: 22 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>التصنيف</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link
                href={buildLink({ category: undefined, page: undefined })}
                style={{
                  fontSize: 13,
                  color: !categorySlug ? "var(--accent)" : "var(--text-secondary)",
                  fontWeight: !categorySlug ? 700 : 400
                }}
              >
                كل التصنيفات
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={buildLink({ category: c.slug, page: undefined })}
                  style={{
                    fontSize: 13,
                    color: categorySlug === c.slug ? "var(--accent)" : "var(--text-secondary)",
                    fontWeight: categorySlug === c.slug ? 700 : 400
                  }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {(search || categorySlug) && (
            <Link href="/shop" className="btn btn-dark" style={{ width: "100%" }}>
              مسح الفلاتر
            </Link>
          )}
        </aside>

        {/* المنتجات */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>{total} منتج</span>
            <div style={{ display: "flex", gap: 8 }}>
              <SortLink label="الأحدث" active={sort === "newest"} href={buildLink({ sort: "newest", page: undefined })} />
              <SortLink label="السعر: الأقل" active={sort === "price_asc"} href={buildLink({ sort: "price_asc", page: undefined })} />
              <SortLink label="السعر: الأعلى" active={sort === "price_desc"} href={buildLink({ sort: "price_desc", page: undefined })} />
            </div>
          </div>

          {errorDetail ? (
            <DatabaseErrorNotice detail={errorDetail} />
          ) : productCards.length === 0 ? (
            <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--text-secondary)" }}>
              لا توجد منتجات مطابقة حاليًا. جرّب تعديل الفلاتر أو تصفح كل التصنيفات.
            </div>
          ) : (
            <div className="grid-auto grid-3">
              {productCards.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40, flexWrap: "wrap" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={buildLink({ page: String(n) })}
                  className="btn"
                  style={{
                    background: n === page ? "var(--primary)" : "var(--surface)",
                    color: n === page ? "var(--surface)" : "var(--text)",
                    border: "1px solid var(--border)",
                    minWidth: 40,
                    justifyContent: "center"
                  }}
                >
                  {n}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function SortLink({ label, active, href }: { label: string; active: boolean; href: string }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 13,
        padding: "8px 14px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: active ? "var(--primary)" : "var(--surface)",
        color: active ? "var(--surface)" : "var(--text)",
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </Link>
  );
}
