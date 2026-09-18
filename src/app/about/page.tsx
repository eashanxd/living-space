import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-1 flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6b5f]">
          About
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#1a2b2f] sm:text-5xl">
          A modern advisory approach built around clarity, trust, and fit.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#54504a]">
          LIVING SPACE is establishing a focused property experience for buyers, investors, and families seeking practical guidance.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
