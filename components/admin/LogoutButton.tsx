"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 14px",
        borderRadius: "var(--radius-sm)",
        fontSize: 14,
        color: "#e8b4ab",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        marginTop: 8,
        paddingTop: 18,
        width: "100%"
      }}
    >
      <LogOut size={17} />
      تسجيل الخروج
    </button>
  );
}
