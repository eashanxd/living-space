"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PropertyFilters, type Filters } from "@/components/property-filters";
import { PropertyGrid } from "@/components/property-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { demoProperties } from "@/data/properties";

const defaultFilters: Filters = {
  location: "all",
  type: "all",
  bhk: "all",
  budget: "all",
};

export default function PropertiesPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredProperties = useMemo(() => {
    return demoProperties.filter((property) => {
      const locationMatch =
        filters.location === "all" || property.location.startsWith(filters.location);

      const typeMatch = filters.type === "all" || property.type === filters.type;

      const bhkMatch =
        filters.bhk === "all" ||
        (property.bhk !== undefined &&
          (filters.bhk === "4+" ? property.bhk >= 4 : String(property.bhk) === filters.bhk));

      const budgetMatch =
        filters.budget === "all" ||
        (() => {
          const [min, max] = filters.budget.split("-").map(Number);
          if (Number.isNaN(min) && Number.isNaN(max)) return true;
          return property.price >= min && property.price <= max;
        })();

      return locationMatch && typeMatch && bhkMatch && budgetMatch;
    });
  }, [filters]);

  const handleReset = () => setFilters(defaultFilters);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#f8f5f0] text-[#1a2b2f]">
        <section className="border-b border-[#e7e0d7] bg-[#f4efe9]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6b5f]">
              Properties
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#1a2b2f] sm:text-5xl">
              Discover homes and investment opportunities across Delhi NCR.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#54504a]">
              Browse a curated selection of property options, compare locations, and narrow the search around the right price, type, and layout for your next move.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Request a shortlist</Button>
              <Button href="/" variant="secondary">
                Back to homepage
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <PropertyFilters filters={filters} onChange={setFilters} onReset={handleReset} />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#6d6259]">
              {filteredProperties.length} properties found
            </p>
          </div>
          <PropertyGrid properties={filteredProperties} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
