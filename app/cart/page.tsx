import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Trash2, ArrowLeft } from "lucide-react";

const ITEMS = [
  { id: "1", title: "ساعة كلاسيكية فرنسية", price: 2950, qty: 1, image: "/images/product-clock.jpg" },
  { id: "2", title: "نجفة كريستال ذهبية", price: 4200, qty: 1, image: "/images/product-chandelier.jpg" }
];

export default function CartPage() {
  const subtotal = ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.15 * 100) / 100;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <main className="container layout-split page-padding">
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 24 }}>سلة التسوق</h1>
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 16, marginBottom: 16, alignItems: "center" }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "var(--radius-sm)",
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 140 }}>
                <h3 style={{ fontSize: 16, marginBottom: 6 }}>{item.title}</h3>
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>SAR {item.price.toLocaleString("en-US")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "6px 12px" }}>
                <button>-</button>
                <span>{item.qty}</span>
                <button>+</button>
              </div>
              <button aria-label="حذف" style={{ color: "var(--error)" }}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* كوبون الخصم */}
          <div className="card" style={{ display: "flex", gap: 10, padding: 16, marginTop: 8 }}>
            <input
              placeholder="أدخل كود الخصم"
              style={{
                flex: 1,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 14px",
                fontFamily: "var(--font-ar)"
              }}
            />
            <button className="btn btn-dark">تطبيق</button>
          </div>
        </div>

        {/* ملخص الطلب */}
        <aside className="card" style={{ padding: 24, height: "fit-content" }}>
          <h3 style={{ fontSize: 18, marginBottom: 20 }}>ملخص الطلب</h3>
          <Row label="المجموع الفرعي" value={subtotal} />
          <Row label="الشحن" value={shipping} />
          <Row label="الضريبة (15%)" value={tax} />
          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "14px 0" }} />
          <Row label="الإجمالي" value={total} bold />
          <Link href="/checkout" className="btn btn-primary" style={{ width: "100%", marginTop: 20 }}>
            إتمام الطلب <ArrowLeft size={16} />
          </Link>
        </aside>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontWeight: bold ? 700 : 400, fontSize: bold ? 16 : 14 }}>
      <span style={{ color: bold ? "var(--text)" : "var(--text-secondary)" }}>{label}</span>
      <span style={{ color: bold ? "var(--gold)" : "var(--text)" }}>SAR {value.toLocaleString("en-US")}</span>
    </div>
  );
}
