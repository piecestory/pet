import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategoryStrip from "@/components/home/CategoryStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import LatestProducts from "@/components/home/LatestProducts";
import RareFinds from "@/components/home/RareFinds";
import PromoBanners from "@/components/home/PromoBanners";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import TrustBadges from "@/components/home/TrustBadges";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryStrip />
        <LatestProducts />
        <PromoBanners />
        <FeaturedProducts />
        <RareFinds />
        <Testimonials />
        <BlogPreview />
      </main>
      <TrustBadges />
      <Footer />
    </>
  );
}
