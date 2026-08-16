import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { success, failure } from "@/lib/api-response";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// أنواع الصور المسموح بها فقط — يمنع رفع ملفات تنفيذية أو HTML/SVG قد تحمل أكواد ضارة
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 ميغابايت لكل صورة
const MAX_FILES_PER_REQUEST = 12;

// POST /api/upload  (multipart/form-data, حقل "files" يدعم عدة ملفات)
export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!requireRole(user, ["SUPER_ADMIN", "MANAGER", "STAFF"])) {
    return failure("غير مصرح لك بهذا الإجراء", 403);
  }

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  if (!files.length) return failure("لم يتم إرفاق أي ملفات", 400);
  if (files.length > MAX_FILES_PER_REQUEST) {
    return failure(`الحد الأقصى ${MAX_FILES_PER_REQUEST} ملفات في الطلب الواحد`, 400);
  }

  for (const file of files) {
    if (!ALLOWED_TYPES[file.type]) {
      return failure(`نوع الملف "${file.type || "غير معروف"}" غير مسموح — يُسمح فقط بصور JPG وPNG وWEBP وGIF`, 415);
    }
    if (file.size > MAX_FILE_SIZE) {
      return failure(`الملف "${file.name}" أكبر من الحد المسموح (8 ميغابايت)`, 413);
    }
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const urls: string[] = [];
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // اسم عشوائي آمن بالكامل (لا نعتمد على اسم الملف الأصلي إطلاقًا) — يمنع أي احتمال
    // لتضمين مسارات (path traversal) أو أحرف خاصة ضمن اسم الملف المخزَّن على السيرفر
    const ext = ALLOWED_TYPES[file.type];
    const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${ext}`;
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    urls.push(`/uploads/${filename}`);
  }

  return success({ urls }, 201);
}
