import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--primary)", color: "#EFE7DD", marginTop: 60 }}>
      <div className="container footer-grid" style={{ padding: "60px 40px 30px" }}>
        <div>
          <h3 style={{ color: "var(--gold)", fontSize: 22, marginBottom: 12 }}>قطعة وقصة</h3>
          <p style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.9 }}>
            معرض فاخر للتحف والأنتيك والأثاث الكلاسيكي، حيث تلتقي الأصالة بالفخامة في كل قطعة نقدمها.
          </p>
        </div>
        <div>
          <h4 style={{ color: "var(--surface)", fontSize: 16, marginBottom: 16 }}>روابط سريعة</h4>
          <FooterLinks
            links={[
              { href: "/shop", label: "المتجر" },
              { href: "/auction", label: "المزادات" },
              { href: "/personal-shopper", label: "الباحث الشخصي" },
              { href: "/about", label: "من نحن" }
            ]}
          />
        </div>
        <div>
          <h4 style={{ color: "var(--surface)", fontSize: 16, marginBottom: 16 }}>خدمة العملاء</h4>
          <FooterLinks
            links={[
              { href: "/contact", label: "تواصل معنا" },
              { href: "/faq", label: "الأسئلة الشائعة" },
              { href: "/shipping", label: "الشحن والتوصيل" },
              { href: "/returns", label: "الإرجاع والاستبدال" }
            ]}
          />
        </div>
        <div>
          <h4 style={{ color: "var(--surface)", fontSize: 16, marginBottom: 16 }}>تواصل معنا</h4>
          <p style={{ fontSize: 14, opacity: 0.8 }}>الرياض، المملكة العربية السعودية</p>
          <p style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>info@qet3a-w-qesa.sa</p>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          textAlign: "center",
          padding: "18px",
          fontSize: 13,
          opacity: 0.65
        }}
      >
        © {new Date().getFullYear()} قطعة وقصة — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

function FooterLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} style={{ fontSize: 14, opacity: 0.8 }}>
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
