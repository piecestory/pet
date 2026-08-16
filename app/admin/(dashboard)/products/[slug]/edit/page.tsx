import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";
import DatabaseErrorNotice from "@/components/admin/DatabaseErrorNotice";

// تُبنى هذه الصفحة من بيانات حيّة في قاعدة البيانات — يجب تعطيل التوليد الثابت
export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { slug: string } }) {
  let product: Awaited<ReturnType<typeof prisma.product.findUnique>> = null;
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = [];
  let errorDetail: string | null = null;

  try {
    [product, categories] = await Promise.all([
      prisma.product.findUnique({
        where: { slug: params.slug },
        include: { images: { orderBy: { order: "asc" } } }
      }),
      prisma.category.findMany({ orderBy: { order: "asc" } })
    ]);
  } catch (err) {
    errorDetail = err instanceof Error ? err.message : "خطأ غير معروف أثناء الاتصال بقاعدة البيانات";
  }

  if (errorDetail) {
    return (
      <div>
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>تعديل المنتج</h1>
        <DatabaseErrorNotice detail={errorDetail} />
      </div>
    );
  }

  if (!product) notFound();

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>تعديل المنتج: {product.title}</h1>
      <EditProductForm
        product={{
          id: product.id,
          slug: product.slug,
          sku: product.sku,
          title: product.title,
          categoryId: product.categoryId,
          price: Number(product.price),
          description: product.description ?? "",
          story: product.story ?? "",
          countryOfOrigin: product.countryOfOrigin ?? "",
          era: product.era ?? "",
          material: product.material ?? "",
          dimensions: product.dimensions ?? "",
          condition: product.condition ?? "",
          stock: product.stock,
          images: (product.images ?? []).map((img: { id: string; url: string }) => ({ id: img.id, url: img.url }))
        }}
        categories={categories.map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
