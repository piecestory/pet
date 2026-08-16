import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const POSTS = [
  { slug: "post-1", title: "كيف تميّز التحف الأصلية عن المقلدة", image: "/images/blog-1.jpg" },
  { slug: "post-2", title: "قصة الأثاث الفرنسي الكلاسيكي", image: "/images/blog-2.jpg" },
  { slug: "post-3", title: "دليل العناية بالقطع الأثرية النادرة", image: "/images/blog-3.jpg" }
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="container page-padding">
        <h1 style={{ fontSize: 28, marginBottom: 24 }}>المدونة</h1>
        <div className="grid-auto grid-3">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card" style={{ overflow: "hidden" }}>
              <div style={{ width: "100%", height: 200, backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
