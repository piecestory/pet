import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="art-dark"
      style={{
        position: "relative",
        minHeight: 420,
        height: "60vh",
        maxHeight: 560
      }}
    >
      {/* توقيع بصري: زخرفة إناء خطّية + زوايا إطار ذهبية (بدل الاعتماد على صورة خلفية غير متوفرة) */}
      <div className="vase-motif" style={{ width: 230, height: 320, top: "8%", left: "6%" }}>
        <svg viewBox="0 0 220 320" fill="none" stroke="currentColor" strokeWidth="1.4">
          <ellipse cx="110" cy="300" rx="52" ry="9" />
          <path d="M78 285 C64 240 60 190 72 150 C80 122 66 100 68 68 C69 42 88 24 110 24 C132 24 151 42 152 68 C154 100 140 122 148 150 C160 190 156 240 142 285 C142 293 78 293 78 285 Z" />
          <ellipse cx="110" cy="24" rx="26" ry="8" />
          <line x1="66" y1="82" x2="154" y2="82" />
          <line x1="60" y1="152" x2="160" y2="152" />
        </svg>
      </div>
      <div className="frame-corners">
        <i /><i /><i /><i />
      </div>

      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          textAlign: "right",
          maxWidth: 560,
          position: "relative",
          zIndex: 2
        }}
      >
        <span style={{ color: "var(--accent-light)", fontSize: 13, letterSpacing: 2, marginBottom: 14, fontWeight: 600 }}>
          معرض قطعة وقصة الفاخر
        </span>
        <h1 className="hero-title" style={{ color: "var(--surface)", fontSize: 44, lineHeight: 1.3, marginBottom: 16 }}>
          حيث تلتقي الأصالة بالفخامة
        </h1>
        <p className="hero-text" style={{ color: "#EFE7DD", fontSize: 16, marginBottom: 24, lineHeight: 1.9 }}>
          اكتشف مجموعة مختارة بعناية من التحف والقطع النادرة المصممة لتروي قصة كل عصر.
        </p>
        <Link href="/shop" className="btn btn-primary">
          تصفح المتجر
          <ArrowLeft size={18} />
        </Link>
      </div>
    </section>
  );
}
