"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email address and password to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError("We could not sign you in with those details. Please try again.");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("We could not sign you in right now. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-[#364a4f]">Email address</label>
        <input id="admin-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isSubmitting} className="w-full rounded-xl border border-[#dfe3df] bg-white px-4 py-3 text-[#1a2b2f] outline-none transition focus:border-[#1a2b2f] focus:ring-2 focus:ring-[#dfe9e8] disabled:cursor-not-allowed disabled:bg-[#f4f1ed]" />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-[#364a4f]">Password</label>
        <input id="admin-password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={isSubmitting} className="w-full rounded-xl border border-[#dfe3df] bg-white px-4 py-3 text-[#1a2b2f] outline-none transition focus:border-[#1a2b2f] focus:ring-2 focus:ring-[#dfe9e8] disabled:cursor-not-allowed disabled:bg-[#f4f1ed]" />
      </div>
      {error ? <p role="alert" className="rounded-xl border border-[#ead6d1] bg-[#fbf1ef] px-4 py-3 text-sm text-[#7a3931]">{error}</p> : null}
      <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center rounded-full bg-[#1b2d32] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#14262b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b2d32] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#7d8e90]">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
