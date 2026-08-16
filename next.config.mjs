/** @type {import('next').NextConfig} */
const nextConfig = {
  // كل الصور حاليًا محلية (رفع مباشر لـ /public/uploads أو لوحات بديلة CSS)، فلا حاجة
  // للسماح بتحسين صور من أي نطاق خارجي — ترك "**" مفتوحًا يُستغل لإرهاق السيرفر
  // (DoS) عبر تمرير روابط صور ضخمة من مصادر خارجية إلى واجهة /_next/image.
  // إن احتجت مستقبلاً صورًا من نطاق خارجي محدد (CDN مثلاً)، أضفه صراحة هنا بدل "**".
  images: {
    remotePatterns: []
  },
  experimental: {
    serverActions: { bodySizeLimit: "10mb" }
  }
};

export default nextConfig;
