import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Search,
  Gavel,
  Ticket,
  Settings,
  BarChart3
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

// لوحة الإدارة تعرض بيانات حيّة من قاعدة البيانات في كل صفحة،
// لذا يجب منع Next.js من محاولة توليدها بشكل ثابت (Static) وقت البناء —
// لأن الاتصال بقاعدة البيانات غير متاح في تلك اللحظة على معظم منصات الاستضافة.
export const dynamic = "force-dynamic";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/categories", label: "التصنيفات", icon: FolderTree },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/personal-shopper", label: "الباحث الشخصي", icon: Search },
  { href: "/admin/auction-interest", label: "طلبات المزادات", icon: Gavel },
  { href: "/admin/coupons", label: "الكوبونات", icon: Ticket },
  { href: "/admin/reports", label: "التقارير", icon: BarChart3 },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside
        className="admin-sidebar"
        style={{
          background: "var(--primary)",
          color: "#EFE7DD",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--gold)", marginBottom: 20, textAlign: "center" }}>
          قطعة وقصة
          <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>لوحة الإدارة</div>
        </div>
        <nav className="admin-nav" style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: 14,
                whiteSpace: "nowrap"
              }}
            >
              <l.icon size={17} />
              {l.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
