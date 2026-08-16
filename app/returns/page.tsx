import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container page-padding" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 26 }}>قريبًا</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 10 }}>هذه الصفحة قيد الإعداد.</p>
      </main>
      <Footer />
    </>
  );
}
