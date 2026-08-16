import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // بيانات المدير الأول تُقرأ من متغيرات البيئة (ADMIN_EMAIL / ADMIN_PASSWORD)
  // ولا يوجد أي قيمة افتراضية مكتوبة بالكود — تجنبًا لتكرار مشكلة كلمة مرور
  // معروفة/متوقّعة قد يستغلها أي شخص اطّلع على الكود المصدري.
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error(
      "❌ يجب تحديد ADMIN_EMAIL و ADMIN_PASSWORD في ملف .env قبل تشغيل الزرع (seed).\n" +
        "   مثال:\n" +
        '   ADMIN_EMAIL="you@example.com"\n' +
        '   ADMIN_PASSWORD="كلمة مرور قوية وطويلة"'
    );
    process.exit(1);
  }
  if (adminPassword.length < 10) {
    console.error("❌ ADMIN_PASSWORD قصيرة جدًا — استخدم 10 أحرف على الأقل.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "مدير النظام",
      email: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN"
    }
  });
  console.log(`✅ تم إنشاء/تأكيد حساب المدير: ${adminEmail}`);

  // التصنيفات
  const categories = [
    { name: "تحف وانتيك", slug: "antiques" },
    { name: "أواني منزلية", slug: "household" },
    { name: "قطع أثرية", slug: "rare-pieces" },
    { name: "لوحات فنية", slug: "paintings" },
    { name: "أثاث كلاسيك", slug: "classic-furniture" },
    { name: "نجف وإضاءة", slug: "chandeliers" }
  ];

  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  console.log("تم زرع البيانات الأساسية بنجاح ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
