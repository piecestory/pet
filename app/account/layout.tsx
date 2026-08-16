import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { User, Package, Heart, MapPin } from "lucide-react";

const LINKS = [
  { href: "/account/profile", label: "الملف الشخصي", icon: User },
  { href: "/account/orders", label: "الطلبات", icon: Package },
  { href: "/account/wishlist", label: "المفضلة", icon: Heart },
  { href: "/account/addresses", label: "العناوين", icon: MapPin }
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container layout-sidebar page-padding">
        <aside className="card" style={{ padding: 16, height: "fit-content" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: 14,
                fontWeight: 500
              }}
            >
              <l.icon size={18} color="var(--accent)" />
              {l.label}
            </Link>
          ))}
        </aside>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  );
}
