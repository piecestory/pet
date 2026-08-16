import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function VaseMotif() {
  return (
    <div className="vase-motif" style={{ width: 140, height: 200, bottom: "-10%", left: "8%" }}>
      <svg viewBox="0 0 220 320" fill="none" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="110" cy="300" rx="52" ry="9" />
        <path d="M78 285 C64 240 60 190 72 150 C80 122 66 100 68 68 C69 42 88 24 110 24 C132 24 151 42 152 68 C154 100 140 122 148 150 C160 190 156 240 142 285 C142 293 78 293 78 285 Z" />
        <ellipse cx="110" cy="24" rx="26" ry="8" />
      </svg>
    </div>
  );
}

export default function PromoBanners() {
  return (
    <section className="container grid-auto grid-2" style={{ marginTop: 24 }}>
      <div
        className="art-dark"
        style={{
          position: "relative",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          minHeight: 230,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px",
          textAlign: "right"
        }}
      >
        <VaseMotif />
        <h3 style={{ color: "var(--surface)", fontSize: 24, marginBottom: 8, position: "relative", zIndex: 2 }}>
          المزادات الإلكترونية
        </h3>
        <p style={{ color: "#ddd", fontSize: 14, marginBottom: 18, position: "relative", zIndex: 2 }}>
          شارك الآن واقتنِ القطع النادرة
        </p>
        <Link href="/auction" className="btn btn-primary" style={{ width: "fit-content", position: "relative", zIndex: 2 }}>
          اكتشف المزادات
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div
        className="art-dark"
        style={{
          position: "relative",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          minHeight: 230,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px",
          textAlign: "right",
          background: "linear-gradient(135deg, #5a3b26, #2b1a10)"
        }}
      >
        <VaseMotif />
        <h3 style={{ color: "var(--surface)", fontSize: 24, marginBottom: 8, position: "relative", zIndex: 2 }}>
          الباحث الشخصي
        </h3>
        <p style={{ color: "#ddd", fontSize: 14, marginBottom: 18, position: "relative", zIndex: 2 }}>
          نبحث لك عن القطعة التي تريدها
        </p>
        <Link
          href="/personal-shopper"
          className="btn btn-dark"
          style={{ width: "fit-content", position: "relative", zIndex: 2, background: "rgba(255,255,255,0.14)" }}
        >
          اطلب الآن
          <ArrowLeft size={16} />
        </Link>
      </div>
    </section>
  );
}
