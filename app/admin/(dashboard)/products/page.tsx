import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import DatabaseErrorNotice from "@/components/admin/DatabaseErrorNotice";

export default async function AdminProductsPage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let errorDetail: string | null = null;

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true }
    });
  } catch (err) {
    errorDetail = err instanceof Error ? err.message : "خطأ غير معروف أثناء الاتصال بقاعدة البيانات";
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>المنتجات</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          + إضافة منتج جديد
        </Link>
      </div>

      {errorDetail ? (
        <DatabaseErrorNotice detail={errorDetail} />
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {products.length === 0 ? (
            <div style={{ padding: 30, textAlign: "center", color: "var(--text-secondary)" }}>
              لا توجد منتجات بعد. اضغط &quot;إضافة منتج جديد&quot; لإضافة أول منتج.
            </div>
          ) : (
            <div className="table-scroll">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--section)", textAlign: "right" }}>
                  <th style={{ padding: 14 }}>المنتج</th>
                  <th>التصنيف</th>
                  <th>السعر</th>
                  <th>المخزون</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map(
                  (p: { id: string; title: string; slug: string; price: number | string; stock: number; category: { name: string } | null }) => (
                  <tr key={p.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: 14 }}>{p.title}</td>
                    <td>{p.category?.name}</td>
                    <td style={{ color: "var(--gold)", fontWeight: 700 }}>SAR {Number(p.price).toLocaleString("en-US")}</td>
                    <td>{p.stock}</td>
                    <td style={{ display: "flex", gap: 10 }}>
                      <Link href={`/admin/products/${p.slug}/edit`} style={{ color: "var(--accent)" }}>
                        تعديل
                      </Link>
                      <DeleteProductButton slug={p.slug} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
