"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import TopBar from "./TopBar";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
  { href: "/collections", label: "المجموعات" },
  { href: "/services", label: "الخدمات" },
  { href: "/shop", label: "المتجر" },
  { href: "/auction", label: "المزادات" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
      <TopBar />
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          gap: 16
        }}
      >
        {/* زر القائمة (جوال) + الشعار */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            className="mobile-only"
            aria-label="فتح القائمة"
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <Menu size={24} color="var(--primary)" />
          </button>

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-ar)",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "var(--primary)"
                }}
              >
                قطعة وقصة
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: "var(--accent)",
                  fontFamily: "var(--font-en)"
                }}
              >
                PIECE &amp; STORY
              </div>
            </div>
          </Link>
        </div>

        {/* البحث — مخفي على الجوال */}
        <div
          className="desktop-only"
          style={{
            flex: 1,
            maxWidth: 420,
            margin: "0 24px",
            alignItems: "center",
            gap: 10,
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 16px"
          }}
        >
          <Search size={18} color="var(--text-secondary)" />
          <input
            placeholder="ابحث عن منتج..."
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              width: "100%",
              fontFamily: "var(--font-ar)",
              color: "var(--text)"
            }}
          />
        </div>

        {/* التنقل — مخفي على الجوال */}
        <nav className="desktop-only" style={{ gap: 22, fontSize: 14, fontWeight: 500 }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ color: "var(--text)", whiteSpace: "nowrap" }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* الأيقونات */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
          <Link href="/account/profile" className="desktop-only">
            <User size={20} color="var(--primary)" />
          </Link>
          <Link href="/account/wishlist" style={{ position: "relative" }}>
            <Heart size={20} color="var(--primary)" />
            <Badge count={0} />
          </Link>
          <Link href="/cart" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ position: "relative" }}>
              <ShoppingCart size={20} color="var(--primary)" />
              <Badge count={0} />
            </div>
            <span className="desktop-only" style={{ fontWeight: 600, fontSize: 14 }}>
              SAR 0.00
            </span>
          </Link>
        </div>
      </div>

      {/* القائمة المنسدلة على الجوال */}
      {menuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu-panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: "var(--primary)" }}>القائمة</span>
              <button
                aria-label="إغلاق القائمة"
                onClick={() => setMenuOpen(false)}
                style={{ background: "none", border: "none" }}
              >
                <X size={22} />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 16px",
                marginBottom: 24
              }}
            >
              <Search size={18} color="var(--text-secondary)" />
              <input
                placeholder="ابحث عن منتج..."
                style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: "var(--font-ar)" }}
              />
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ padding: "12px 8px", fontSize: 15, fontWeight: 500, borderBottom: "1px solid var(--border)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account/profile"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "12px 8px", fontSize: 15, fontWeight: 500, color: "var(--accent)" }}
              >
                حسابي
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span
      style={{
        position: "absolute",
        top: -8,
        left: -8,
        background: "var(--primary)",
        color: "var(--surface)",
        fontSize: 10,
        width: 16,
        height: 16,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {count}
    </span>
  );
}
