import { Truck, Gift, ShieldCheck, Headphones, PackageCheck } from "lucide-react";

const BADGES = [
  { icon: Truck, title: "شحن سريع وآمن", subtitle: "داخل السعودية" },
  { icon: Gift, title: "تغليف فاخر", subtitle: "وحماية مضمونة" },
  { icon: ShieldCheck, title: "منتجات أصلية", subtitle: "100% موثوقة" },
  { icon: Headphones, title: "دعم العملاء", subtitle: "على مدار الساعة" },
  { icon: PackageCheck, title: "إرجاع واستبدال", subtitle: "سهل وسريع" }
];

export default function TrustBadges() {
  return (
    <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", marginTop: 50 }}>
      <div
        className="container grid-5"
        style={{
          display: "grid",
          padding: "28px 40px",
          gap: 20,
          rowGap: 24
        }}
      >
        {BADGES.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <b.icon size={26} color="var(--accent)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{b.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{b.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
