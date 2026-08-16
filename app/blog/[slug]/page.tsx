import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Header />
      <main className="container page-padding" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 20 }}>مقال المدونة: {params.slug}</h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 2 }}>
          محتوى المقال يُدار من لوحة الإدارة ويُعرض هنا بناءً على الـ slug المحدد.
        </p>
      </main>
      <Footer />
    </>
  );
}
