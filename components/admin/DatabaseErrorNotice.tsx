"use client";

import { RefreshCw, DatabaseZap } from "lucide-react";

export default function DatabaseErrorNotice({ detail }: { detail?: string }) {
  return (
    <div
      className="card"
      style={{
        padding: 32,
        textAlign: "center",
        maxWidth: 560,
        margin: "40px auto"
      }}
    >
      <DatabaseZap size={40} color="var(--error)" style={{ margin: "0 auto 16px" }} />
      <h2 style={{ fontSize: 20, marginBottom: 10, color: "var(--primary)" }}>
        تعذّر الاتصال بقاعدة البيانات
      </h2>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: 18 }}>
        لم نتمكن من جلب البيانات حاليًا. هذا غالبًا خلل مؤقت في إعدادات الاتصال بقاعدة البيانات على
        الاستضافة (متغير <code>DATABASE_URL</code>)، وليس خطأً في هذه الصفحة نفسها.
      </p>

      {detail && (
        <details style={{ textAlign: "right", marginBottom: 18 }}>
          <summary style={{ cursor: "pointer", fontSize: 13, color: "var(--accent)" }}>
            عرض تفاصيل الخطأ التقنية
          </summary>
          <pre
            style={{
              marginTop: 10,
              padding: 12,
              background: "var(--section)",
              borderRadius: "var(--radius-sm)",
              fontSize: 12,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: "var(--text-secondary)"
            }}
          >
            {detail}
          </pre>
        </details>
      )}

      <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ margin: "0 auto" }}>
        <RefreshCw size={16} />
        إعادة المحاولة
      </button>
    </div>
  );
}
