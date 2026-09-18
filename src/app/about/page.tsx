import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const aboutImages = [
  { alt: "Furnished living room arranged for everyday living", position: "object-[28%_center]" },
  { alt: "Warm interior detail from a LIVING SPACE property", position: "object-center" },
  { alt: "Elegant property interior with considered finishes", position: "object-[72%_center]" },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#f8f5f0] text-[#1a2b2f]">
        <section className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] lg:gap-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl self-start lg:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6b5f]">About</p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.04] tracking-[-0.045em] text-[#1a2b2f] sm:text-6xl">
              Who We Are
            </h1>

            <div className="mt-8 space-y-5 text-justify text-base leading-8 text-[#54504a] sm:text-lg">
              <p>
                LIVING SPACE is a boutique real-estate consultancy focused on premium residential properties in South Delhi. We help clients discover considered homes across the city&apos;s established neighborhoods, from furnished apartments and builder floors to villas and studio spaces.
              </p>
              <p>
                Finding the right home begins with understanding the local market. We take time to listen to each client&apos;s requirements, preferences, and budget, then bring that context to the search so every option feels relevant and workable.
              </p>
              <p>
                Our approach is grounded in thoughtful property advisory, clear communication, and professional service. We aim to make renting or leasing a residence feel focused, transparent, and personal from the first conversation.
              </p>
            </div>

            <div className="mt-14 border-t border-[#ded5ca] pt-10 sm:mt-16">
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.04em] text-[#1a2b2f] sm:text-5xl">
                Our Vision
              </h2>
              <div className="mt-6 space-y-5 text-justify text-base leading-8 text-[#54504a] sm:text-lg">
                <p>
                  We believe a property search should feel as considered as the home itself: calm, informed, and shaped around the person who will live there.
                </p>
                <p>
                  LIVING SPACE works toward a refined residential experience where local understanding and attentive guidance help clients move forward with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:pt-2">
            {aboutImages.map((image, index) => (
              <div
                key={image.alt}
                className={`group relative overflow-hidden rounded-[1.5rem] border border-[#e7e0d7] bg-[#e9e1d8] shadow-[0_14px_30px_rgba(22,32,33,0.05)] ${index === 1 ? "aspect-[1.18/1]" : "aspect-[1.35/1]"}`}
              >
                <Image
                  src="/images/living-room.png"
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] ${image.position}`}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
