import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DatabaseErrorNotice from "@/components/admin/DatabaseErrorNotice";

interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  _count?: { products: number };
}

export default async function AdminCategoriesPage() {
  let categories: CategoryWithCount[] = [];
  let errorDetail: string | null = null;

  try {
    categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { products: true } } }
    });
  } catch (err) {
    errorDetail = err instanceof Error ? err.message : "خطأ غير معروف أثناء الاتصال بقاعدة البيانات";
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>التصنيفات</h1>
        <Link href="/admin/categories/new" className="btn btn-primary">
          + إضافة تصنيف
        </Link>
      </div>

      {errorDetail ? (
        <DatabaseErrorNotice detail={errorDetail} />
      ) : categories.length === 0 ? (
        <div className="card" style={{ padding: 30, textAlign: "center", color: "var(--text-secondary)" }}>
          لا توجد تصنيفات بعد. أضف أول تصنيف قبل إضافة المنتجات.
        </div>
      ) : (
        <div className="grid-auto grid-3" style={{ gap: 16 }}>
          {categories.map((c) => (
            <div key={c.id} className="card" style={{ padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{c._count?.products ?? 0} منتج</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ color: "var(--error)" }}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
