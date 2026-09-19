import Image from "next/image";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (claims) redirect("/admin/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-4 py-12">
      <section className="w-full max-w-md rounded-[1.75rem] border border-[#e7e0d7] bg-white p-6 shadow-[0_14px_30px_rgba(22,32,33,0.06)] sm:p-8">
        <Image src="/images/loving-space-logo.jpg" alt="LIVING SPACE" width={180} height={45} priority className="h-auto w-40" />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c6b5f]">Admin access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1a2b2f]">Welcome back</h1>
        <p className="mt-3 text-sm leading-6 text-[#586d71]">Sign in to access the LIVING SPACE administration area.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
