"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <button type="button" onClick={handleLogout} className="rounded-full border border-[#d7cab8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a2b2f] transition hover:bg-[#f7f2ec]">
      Log out
    </button>
  );
}
