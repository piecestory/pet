# قطعة وقصة | Piece & Story — النسخة التجارية الأولى (MVP)

معرض إلكتروني فاخر لبيع التحف والأنتيك والأثاث الكلاسيكي، مبني بـ **Next.js (App Router + TypeScript)** و **Prisma** و **MySQL**.

## المكدس التقني
- **Frontend:** Next.js 14 (App Router), TypeScript, Server Components
- **Backend:** Next.js API Routes
- **Database:** MySQL عبر Prisma ORM
- **Auth:** JWT + HttpOnly Cookies
- **Validation:** Zod

## هيكل المشروع
```
app/
  page.tsx                 → الصفحة الرئيسية
  shop/                     → المتجر (بحث + فلاتر)
  product/[slug]/           → صفحة المنتج
  cart/                     → السلة
  checkout/                 → إتمام الطلب
  account/                  → حساب العميل (طلبات، مفضلة، عناوين، ملف شخصي)
  auction/                  → المزادات (تسجيل اهتمام)
  personal-shopper/         → الباحث الشخصي
  admin/                    → لوحة الإدارة الكاملة
  api/                      → جميع واجهات API (auth, products, cart, orders...)
components/
  layout/                   → Header, Footer, TopBar
  home/                     → أقسام الصفحة الرئيسية
  product/                  → بطاقة المنتج
lib/
  prisma.ts                 → عميل Prisma
  auth.ts                   → توليد/تحقق JWT + كوكيز
  api-response.ts           → دوال موحدة للردود
prisma/
  schema.prisma             → جميع الجداول والعلاقات
  seed.ts                   → بيانات أولية (تصنيفات + مدير)
```

## خطوات التشغيل

1. تثبيت الحزم:
```bash
npm install
```

2. إعداد المتغيرات البيئية — انسخ `.env.example` إلى `.env` وعدّل بيانات قاعدة البيانات:
```bash
cp .env.example .env
```

3. إنشاء الجداول في MySQL:
```bash
npx prisma migrate dev --name init
```

4. زرع بيانات أولية (مدير النظام + التصنيفات):
```bash
npm run prisma:seed
```

5. تشغيل المشروع:
```bash
npm run dev
```

الموقع سيعمل على: `http://localhost:3000`
لوحة الإدارة: `http://localhost:3000/admin`

بيانات دخول المدير الافتراضية بعد الزرع:
- البريد: `admin@qet3a-w-qesa.sa`
- كلمة المرور: `Admin@12345`
(يجب تغييرها فورًا في بيئة الإنتاج)

## قاعدة البيانات
يحتوي `prisma/schema.prisma` على جميع الجداول المطلوبة:
`users, addresses, categories, products, product_images, cart, wishlist, orders, order_items, coupons, auction_items, auction_interest, personal_shopper_requests, notifications, settings`

## نظام الصلاحيات
`SUPER_ADMIN` / `MANAGER` / `STAFF` / `CUSTOMER` — يتم التحقق منها في كل مسار API عبر `requireRole()` في `lib/auth.ts`.

## الهوية البصرية
جميع الألوان والخطوط مطبّقة في `app/globals.css` كمتغيرات CSS مطابقة تمامًا لملف الهوية البصرية المرسل (البني `#3A2418`، الذهبي `#B68A4A`/`#C79A52`، خلفية `#F8F4EE`... إلخ)، مع خطوط IBM Plex Sans Arabic / Cairo للعربية و Inter للإنجليزية، والاتجاه RTL مفعّل بالكامل.

## ملاحظات مهمة
- هذا هيكل **MVP** كامل وقابل للتشغيل الفعلي بعد ربطه بقاعدة بيانات MySQL حقيقية وتنفيذ `npm install`.
- بيانات المنتجات المعروضة في الواجهات حاليًا (Hero, أحدث القطع...) هي بيانات نموذجية static؛ يجب استبدالها بجلب حقيقي من `/api/products` عند الربط الكامل بقاعدة البيانات (الكود الخاص بذلك جاهز في `app/api/products/route.ts`).
- الصور المرجعية في `public/images/` غير مرفقة فعليًا — استبدلها بصور المنتجات الحقيقية.
- البنية جاهزة لإضافة: المزادات الحية، الدفع الإلكتروني، الإشعارات الفورية، والتطبيقات، دون الحاجة لإعادة هيكلة المشروع (كما ورد في المتطلبات).
