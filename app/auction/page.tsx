import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Gavel } from "lucide-react";

const AUCTION_ITEMS = [
  { id: "1", title: "سيف عربي تراثي نادر", estimatedPrice: 12000, deadline: "2026-08-25", image: "/images/rare-1.jpg" },
  { id: "2", title: "تحفة برونزية أوروبية", estimatedPrice: 15500, deadline: "2026-09-01", image: "/images/rare-3.jpg" },
  { id: "3", title: "قطعة سيراميك أثرية", estimatedPrice: 8900, deadline: "2026-08-30", image: "/images/rare-2.jpg" }
];

export default function AuctionPage() {
  return (
    <>
      <Header />
      <main className="container page-padding">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Gavel size={32} color="var(--accent)" style={{ margin: "0 auto 10px" }} />
          <h1 style={{ fontSize: 30 }}>المزادات الإلكترونية</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>
            سجّل اهتمامك بالقطعة وسيتم التواصل معك عند اقتراب موعد المزاد
          </p>
        </div>

        <div className="grid-auto grid-3" style={{ gap: 24 }}>
          {AUCTION_ITEMS.map((item) => (
            <div key={item.id} className="card" style={{ overflow: "hidden" }}>
              <div
                style={{
                  aspectRatio: "4 / 3",
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div style={{ padding: 18 }}>
                <h3 style={{ fontSize: 16, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>
                  السعر التقديري: <strong style={{ color: "var(--gold)" }}>SAR {item.estimatedPrice.toLocaleString("en-US")}</strong>
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 14 }}>
                  آخر موعد لاستقبال الطلبات: {item.deadline}
                </p>
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  سجّل اهتمامك
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
