import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const featuredProperties = [
  {
    title: "3 BHK Premium Apartment",
    location: "Dwarka, Delhi",
    type: "Apartment",
    details: "1450 sq ft • 3 Bed • 2 Bath",
    price: "₹1.25 Cr",
    status: "Available",
  },
  {
    title: "Signature Villa Residence",
    location: "Gurugram, Haryana",
    type: "Villa",
    details: "2400 sq ft • 4 Bed • 3 Bath",
    price: "₹3.40 Cr",
    status: "Available",
  },
  {
    title: "Modern Commercial Suite",
    location: "Noida, Uttar Pradesh",
    type: "Commercial",
    details: "1800 sq ft • 2 Floor • Prime location",
    price: "₹2.90 Cr",
    status: "New Listing",
  },
];

const locations = [
  "Dwarka",
  "South Delhi",
  "Gurugram",
  "Noida",
  "Greater Noida",
  "Faridabad",
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="relative flex-1 overflow-hidden bg-[#f8f5f0] text-[#1a2b2f]">
        <section className="relative overflow-hidden border-b border-[#e7e0d7] bg-[#f4efe9]/55 backdrop-blur-[1px]">
          <div className="homepage-wallpaper animate-soft-pulse" aria-hidden="true" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="animate-fade-up mb-5 inline-flex w-fit items-center rounded-full border border-[#d7d0c6] bg-white/85 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#586d71] shadow-[0_5px_15px_rgba(27,45,50,0.04)]">
                Discover your next address
              </div>

              <h1 className="animate-fade-up-delay max-w-xl text-balance text-4xl font-semibold tracking-[-0.06em] text-[#1a2b2f] sm:text-5xl lg:text-6xl">
                Thoughtful property guidance for modern living.
              </h1>

              <p className="animate-fade-up-delay mt-6 max-w-xl text-lg leading-8 text-[#54504a]">
                LIVING SPACE connects buyers, investors, and families to quality homes and commercial spaces across Delhi NCR with honest advice and a seamless buying experience.
              </p>

              <div className="animate-fade-up-delay mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/properties">Explore listings</Button>
                <Button href="/contact" variant="secondary">
                  Talk to an advisor
                </Button>
              </div>

              <div className="animate-fade-up-delay mt-10 flex flex-wrap items-center gap-6 text-sm text-[#586d71]">
                <div>
                  <span className="block text-2xl font-semibold text-[#1a2b2f]">150+</span>
                  Homes sold
                </div>
                <div>
                  <span className="block text-2xl font-semibold text-[#1a2b2f]">12</span>
                  Prime locations
                </div>
                <div>
                  <span className="block text-2xl font-semibold text-[#1a2b2f]">4.9/5</span>
                  Client satisfaction
                </div>
              </div>
            </div>

            <div className="animate-fade-up rounded-[2rem] border border-[#e3dace] bg-white/90 p-5 shadow-[0_18px_45px_rgba(28,43,48,0.08)] backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-[#e9e1d8] p-5">
                <div className="mb-4 flex items-center justify-between text-sm uppercase tracking-[0.18em] text-[#6b6258]">
                  <span>Property Search</span>
                  <span>Live</span>
                </div>

                <div className="space-y-4 rounded-[1.25rem] bg-white p-4 shadow-sm">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
                      Location
                    </label>
                    <div className="rounded-xl border border-[#e3dace] bg-[#f9f7f3] px-3 py-3 text-sm text-[#364a4f]">
                      Delhi NCR
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
                      Property type
                    </label>
                    <div className="rounded-xl border border-[#e3dace] bg-[#f9f7f3] px-3 py-3 text-sm text-[#364a4f]">
                      Apartment, Villa, Commercial
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
                      Budget
                    </label>
                    <div className="rounded-xl border border-[#e3dace] bg-[#f9f7f3] px-3 py-3 text-sm text-[#364a4f]">
                      ₹50L – ₹5Cr
                    </div>
                  </div>

                  <Button href="/properties" className="w-full">
                    Search properties
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Discover"
            title="Browse standout properties"
            description="A curated selection of homes and investment opportunities designed around location, lifestyle, and long-term value."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <article
                key={property.title}
                className="group overflow-hidden rounded-[1.5rem] border border-[#e7e0d7] bg-white shadow-[0_14px_30px_rgba(22,32,33,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#d4c9bf] hover:shadow-[0_18px_35px_rgba(22,32,33,0.08)]"
              >
                <div className="h-56 bg-[linear-gradient(135deg,#d8d2ca,#f1ebdf)] p-5">
                  <div className="flex h-full items-end justify-between overflow-hidden rounded-[1.2rem] border border-white/50 bg-[radial-gradient(circle_at_top,#f5eee5,#d8d2ca_50%,#bfb5aa)] p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#354c51]">
                      {property.type}
                    </span>
                    <span className="rounded-full bg-[#1a2b2f] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      {property.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.14em] text-[#7a6d62]">{property.location}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1a2b2f]">
                        {property.title}
                      </h3>
                    </div>
                    <span className="text-xl font-semibold text-[#1a2b2f]">{property.price}</span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#5b5d5d]">{property.details}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#eee5dc] pt-4">
                    <span className="text-sm font-medium text-[#586d71]">{property.type}</span>
                    <Link
                      href="/properties"
                      className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1a2b2f] transition-all duration-200 ease-out hover:text-[#56717a] hover:translate-x-0.5"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#e7e0d7] bg-[#f3efe9]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Locations"
              title="Explore the neighborhoods that define daily life"
              description="From premium residential enclaves to high-demand commercial corridors, we focus on areas with strong lifestyle value and long-term potential."
              align="center"
            />

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {locations.map((location) => (
                <span
                  key={location}
                  className="rounded-full border border-[#d7d0c6] bg-white px-4 py-2 text-sm font-medium text-[#3c4d53]"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 rounded-[2rem] border border-[#e7e0d7] bg-white p-6 shadow-[0_14px_30px_rgba(22,32,33,0.04)] lg:grid-cols-[1fr_1.3fr] lg:p-10">
            <div className="flex items-center justify-center rounded-[1.5rem] bg-[linear-gradient(145deg,#d9d0c4,#f2ece4)] p-8">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1b2d32] text-2xl font-semibold text-white">
                  LS
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#61554e]">
                  Trusted advisory
                </p>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Why LIVING SPACE"
                title="Clear guidance grounded in real market understanding"
                description="We simplify the process of finding the right property by focusing on fit, transparency, and long-term value."
              />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">Curated opportunities</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b5d5d]">
                    Quality listings selected for relevance, demand, and fit with buyer goals.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">Honest guidance</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b5d5d]">
                    Practical advice designed around your preferences, budget, and timeline.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">Location-led decisions</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b5d5d]">
                    Insight into neighborhood value, accessibility, and future growth potential.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">End-to-end support</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b5d5d]">
                    From first enquiry to final decision, every step stays clear and focused.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
