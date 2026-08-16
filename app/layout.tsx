import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar-loaded",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-en-loaded",
  display: "swap"
});

export const metadata: Metadata = {
  title: "قطعة وقصة | Piece & Story - معرض التحف والأنتيك الفاخر",
  description:
    "قطعة وقصة - معرض إلكتروني فاخر لبيع التحف والأنتيك والأثاث الكلاسيكي واللوحات الفنية والنجف والقطع النادرة.",
  keywords: ["تحف", "أنتيك", "أثاث كلاسيكي", "لوحات فنية", "نجف", "قطع نادرة", "قطعة وقصة"]
};

// حاسم لتفعيل الاستجابة على الجوال والتابلت — بدونه تتجاهل المتصفحات المحمولة كل استعلامات @media
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${plexArabic.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
