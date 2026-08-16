import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

// GET /api/products?search=&category=&country=&era=&material=&minPrice=&maxPrice=&sort=&page=&limit=
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const page = Number(params.get("page") || 1);
  const limit = Number(params.get("limit") || 12);

  const where: Record<string, unknown> = { isActive: true };

  const search = params.get("search");
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } }
    ];
  }
  const category = params.get("category");
  if (category) where.category = { slug: category };

  const country = params.get("country");
  if (country) where.countryOfOrigin = country;

  const era = params.get("era");
  if (era) where.era = era;

  const material = params.get("material");
  if (material) where.material = material;

  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: Number(minPrice) } : {}),
      ...(maxPrice ? { lte: Number(maxPrice) } : {})
    };
  }

  const sortParam = params.get("sort");
  const orderBy =
    sortParam === "price_asc"
      ? { price: "asc" as const }
      : sortParam === "price_desc"
      ? { price: "desc" as const }
      : sortParam === "newest"
      ? { createdAt: "desc" as const }
      : { createdAt: "desc" as const };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { images: { orderBy: { order: "asc" } }, category: true }
    }),
    prisma.product.count({ where })
  ]);

  return success({ items, total, page, pages: Math.ceil(total / limit) });
}

const createSchema = z.object({
  sku: z.string(),
  title: z.string().min(2),
  categoryId: z.string(),
  price: z.number().positive(),
  description: z.string().optional(),
  story: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  era: z.string().optional(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  condition: z.string().optional(),
  stock: z.number().int().nonnegative().default(1),
  images: z.array(z.string()).optional()
});

// POST /api/products (لوحة الإدارة فقط)
export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER", "STAFF"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }

  try {
    const body = createSchema.parse(await req.json());
    const slug = body.title
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\u0621-\u064Aa-zA-Z0-9-]/g, "");

    const product = await prisma.product.create({
      data: {
        sku: body.sku,
        title: body.title,
        slug: `${slug}-${Date.now()}`,
        categoryId: body.categoryId,
        price: body.price,
        description: body.description,
        story: body.story,
        countryOfOrigin: body.countryOfOrigin,
        era: body.era,
        material: body.material,
        dimensions: body.dimensions,
        condition: body.condition,
        stock: body.stock,
        images: body.images
          ? { create: body.images.map((url, i) => ({ url, order: i })) }
          : undefined
      },
      include: { images: true }
    });

    return success(product, 201);
  } catch (err) {
    if (err instanceof z.ZodError) return failure(err.errors[0].message, 422);
    return failure("حدث خطأ أثناء إنشاء المنتج", 500);
  }
}
