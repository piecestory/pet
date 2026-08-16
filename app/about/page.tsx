import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container page-padding" style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 30, marginBottom: 20 }}>من نحن</h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 2 }}>
          &quot;قطعة وقصة&quot; معرض إلكتروني فاخر متخصص في التحف والأنتيك والأثاث الكلاسيكي واللوحات الفنية والنجف
          والقطع النادرة. نؤمن أن كل قطعة تحمل قصة، ونسعى لإيصالها إليك بأعلى مستويات الفخامة والثقة.
        </p>
      </main>
      <Footer />
    </>
  );
}
