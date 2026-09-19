import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomePropertySearch } from "@/components/home-property-search";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { primeLocations } from "@/data/location-data";
import { formatPrice } from "@/data/properties";
import { getProperties } from "@/lib/properties";
import { PropertyImageCarousel } from "@/components/property-image-carousel";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProperties = (await getProperties()).slice(0, 3);
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

            </div>

            <HomePropertySearch />
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
                  <PropertyImageCarousel
                    images={property.images}
                    title={property.title}
                    variant="featured"
                    overlay={<div className="absolute inset-0 flex items-end justify-between p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#354c51]">
                      {property.propertyType}
                    </span>
                    <span className="rounded-full bg-[#1a2b2f] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      {property.status}
                    </span>
                  </div>}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.14em] text-[#7a6d62]">{property.location}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1a2b2f]">
                        {property.title}
                      </h3>
                    </div>
                    <span className="text-xl font-semibold text-[#1a2b2f]">{formatPrice(property.price)}</span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#5b5d5d]">{property.configuration} {property.plotArea ? `• ${property.plotArea}` : ""}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#eee5dc] pt-4">
                    <span className="text-sm font-medium text-[#586d71]">{property.propertyType}</span>
                    <Link
                      href={`/properties/${property.id}`}
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
              title="Explore the premium locations of South Delhi"
              description="From premium residential enclaves to high-demand commercial corridors, we focus on areas with strong lifestyle value and long-term potential."
              align="center"
            />

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {primeLocations.map((location) => (
                <Link
                  key={location}
                  href={`/properties?location=${encodeURIComponent(location)}`}
                  className="group rounded-2xl border border-[#d7d0c6] bg-white px-4 py-4 text-center text-sm font-medium text-[#3c4d53] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#b8b0a4] hover:bg-[#fffdfa] hover:shadow-[0_10px_22px_rgba(22,32,33,0.07)] active:translate-y-px"
                >
                  <span className="transition-colors duration-300 group-hover:text-[#1a2b2f]">{location}</span>
                </Link>
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
                descriptionClassName="text-justify"
              />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">Curated opportunities</h3>
                  <p className="mt-2 text-justify text-sm leading-6 text-[#5b5d5d]">
                    Quality listings selected for relevance, demand, and fit with buyer goals.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">Honest guidance</h3>
                  <p className="mt-2 text-justify text-sm leading-6 text-[#5b5d5d]">
                    Practical advice designed around your preferences, budget, and timeline.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">Location-led decisions</h3>
                  <p className="mt-2 text-justify text-sm leading-6 text-[#5b5d5d]">
                    Insight into neighborhood value, accessibility, and future growth potential.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-5">
                  <h3 className="text-lg font-semibold text-[#1a2b2f]">End-to-end support</h3>
                  <p className="mt-2 text-justify text-sm leading-6 text-[#5b5d5d]">
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
