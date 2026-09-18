"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  bhkOptions,
  locationOptions,
  priceBracketOptions,
  typeOptions,
  defaultFilters,
  type Filters,
} from "@/data/properties";

const selectClassName =
  "w-full rounded-xl border border-[#e3dace] bg-[#f9f7f3] px-3 py-3 text-sm text-[#364a4f] outline-none transition focus:border-[#1a2b2f] focus:ring-2 focus:ring-[#dfe9e8]";

export function HomePropertySearch() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isPending, startTransition] = useTransition();

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all") query.set(key, value);
    });

    startTransition(() => {
      router.push(`/properties${query.toString() ? `?${query.toString()}` : ""}`);
    });
  };

  return (
    <div className="animate-fade-up rounded-[2rem] border border-[#e3dace] bg-white/90 p-5 shadow-[0_18px_45px_rgba(28,43,48,0.08)] backdrop-blur-sm">
      <div className="rounded-[1.5rem] bg-[#e9e1d8] p-5">
        <div className="mb-4 flex items-center justify-between text-sm uppercase tracking-[0.18em] text-[#6b6258]">
          <span>Property Search</span>
          <span>Live</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.25rem] bg-white p-4 shadow-sm">
          <div>
            <label htmlFor="home-location" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
              Location
            </label>
            <select
              id="home-location"
              value={filters.location}
              onChange={(event) => updateFilter("location", event.target.value)}
              className={selectClassName}
            >
              {locationOptions.map((location) => (
                <option key={location} value={location === "All locations" ? "all" : location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="home-type" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
              Property type
            </label>
            <select
              id="home-type"
              value={filters.type}
              onChange={(event) => updateFilter("type", event.target.value)}
              className={selectClassName}
            >
              {typeOptions.map((type) => (
                <option key={type} value={type === "All types" ? "all" : type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="home-bhk" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
              BHK
            </label>
            <select
              id="home-bhk"
              value={filters.bhk}
              onChange={(event) => updateFilter("bhk", event.target.value)}
              className={selectClassName}
            >
              {bhkOptions.map((option) => (
                <option key={option} value={option === "Any" ? "all" : option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="home-budget" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
              Budget
            </label>
            <select
              id="home-budget"
              value={filters.budget}
              onChange={(event) => updateFilter("budget", event.target.value)}
              className={selectClassName}
            >
              {priceBracketOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Searching..." : "Search properties"}
          </Button>
        </form>
      </div>
    </div>
  );
}
