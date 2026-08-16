"use client";

import Link from "next/link";

const CATEGORIES = [
  { slug: "antiques", name: "تحف وانتيك", image: "/images/cat-antiques.jpg", tone: "" },
  { slug: "household", name: "أواني منزلية", image: "/images/cat-household.jpg", tone: "ph-2" },
  { slug: "rare-pieces", name: "قطع أثرية", image: "/images/cat-rare.jpg", tone: "ph-3" },
  { slug: "paintings", name: "لوحات فنية", image: "/images/cat-paintings.jpg", tone: "" },
  { slug: "classic-furniture", name: "أثاث كلاسيك", image: "/images/cat-furniture.jpg", tone: "ph-2" },
  { slug: "chandeliers", name: "نجف وإضاءة", image: "/images/cat-chandeliers.jpg", tone: "ph-3" }
];

export default function CategoryStrip() {
  return (
    <section className="container category-strip" style={{ position: "relative", zIndex: 2 }}>
      <div
        className="card grid-6"
        style={{
          display: "grid",
          gap: 16,
          padding: 24
        }}
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "14px 16px",
              transition: "border-color .2s ease, background .2s ease"
            }}
          >
            <div
              className={`ph ${cat.tone}`}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                flexShrink: 0
              }}
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%"
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: "var(--accent)" }}>تسوق الآن</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
