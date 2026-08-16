import { Star } from "lucide-react";

const REVIEWS = [
  { name: "سارة العتيبي", text: "تجربة استثنائية، القطعة وصلت مغلفة بعناية فائقة وبنفس جودة الصور.", rating: 5 },
  { name: "خالد الشمري", text: "خدمة الباحث الشخصي ساعدتني أجد قطعة كنت أبحث عنها منذ سنوات.", rating: 5 },
  { name: "منى الحربي", text: "تعامل راقٍ ومنتجات أصلية، أنصح بالتعامل معهم بكل ثقة.", rating: 5 }
];

export default function Testimonials() {
  return (
    <section style={{ background: "var(--section)", padding: "50px 0", marginTop: 50 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <span className="section-label">ثقة عملائنا</span>
          <h2 style={{ fontSize: 28, marginTop: 8 }}>آراء العملاء</h2>
        </div>
        <div className="grid-auto grid-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={16} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 14 }}>{r.text}</p>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
