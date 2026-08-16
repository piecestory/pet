"use client";

import Link from "next/link";

const POSTS = [
  { slug: "post-1", title: "كيف تميّز التحف الأصلية عن المقلدة", image: "/images/blog-1.jpg", tone: "" },
  { slug: "post-2", title: "قصة الأثاث الفرنسي الكلاسيكي", image: "/images/blog-2.jpg", tone: "ph-2" },
  { slug: "post-3", title: "دليل العناية بالقطع الأثرية النادرة", image: "/images/blog-3.jpg", tone: "ph-3" }
];

export default function BlogPreview() {
  return (
    <section className="container" style={{ marginTop: 50 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h2 style={{ fontSize: 26 }}>المدونة</h2>
        <Link href="/blog" style={{ color: "var(--accent)", fontWeight: 600 }}>
          عرض الكل
        </Link>
      </div>
      <div className="grid-auto grid-3">
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card" style={{ overflow: "hidden" }}>
            <div className={`ph ${p.tone}`} style={{ position: "relative", width: "100%", height: 180 }}>
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
