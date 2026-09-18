"use client";

import { type ChangeEvent } from "react";
import { bhkOptions, typeOptions, locationOptions, priceBracketOptions } from "@/data/properties";

export type Filters = {
  location: string;
  type: string;
  bhk: string;
  budget: string;
};

const selectClassName =
  "w-full rounded-xl border border-[#dfe3df] bg-white px-3 py-3 text-sm text-[#25373d] outline-none transition focus:border-[#1a2b2f] focus:ring-2 focus:ring-[#dfe9e8]";

type PropertyFiltersProps = {
  filters: Filters;
  onChange: (nextFilters: Filters) => void;
  onReset: () => void;
};

export function PropertyFilters({ filters, onChange, onReset }: PropertyFiltersProps) {
  const updateFilter = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    updateFilter(name as keyof Filters, value);
  };

  return (
    <div className="rounded-[1.5rem] border border-[#e7e0d7] bg-white p-4 shadow-[0_10px_25px_rgba(22,32,33,0.04)] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#1a2b2f]">Filter properties</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-[#3b4e52] underline-offset-4 transition hover:text-[#1a2b2f] hover:underline"
        >
          Clear filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label htmlFor="location" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleSelect}
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
          <label htmlFor="type" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Property type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleSelect}
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
          <label htmlFor="bhk" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            BHK
          </label>
          <select
            id="bhk"
            name="bhk"
            value={filters.bhk}
            onChange={handleSelect}
            className={selectClassName}
          >
            {bhkOptions.map((option) => (
              <option key={option} value={option === "Any" ? "all" : option}>
                {option === "4+" ? "4+" : option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={filters.budget}
            onChange={handleSelect}
            className={selectClassName}
          >
            {priceBracketOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
