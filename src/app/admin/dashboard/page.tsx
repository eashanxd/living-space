import Image from "next/image";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { AdminPropertyForm } from "@/components/admin-property-form";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();

  if (!claims) redirect("/admin/login");

  return (
    <main className="min-h-screen bg-[#f8f5f0] px-4 py-8 text-[#1a2b2f] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Image src="/images/loving-space-logo.jpg" alt="LIVING SPACE" width={180} height={45} priority className="h-auto w-40" />
          <AdminLogoutButton />
        </header>
        <section className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c6b5f]">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Add a new property</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#586d71]">Create a listing with its details, furnishing profile, facilities, and property media. It will appear on the public site after it is saved.</p>
        </section>
        <AdminPropertyForm />
      </div>
    </main>
  );
}
