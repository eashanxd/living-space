"use client";

import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  bhkOptions,
  typeOptions,
  locationOptions,
  priceBracketOptions,
  type Filters,
} from "@/data/properties";

export type { Filters } from "@/data/properties";

const selectClassName =
  "w-full rounded-xl border border-[#dfe3df] bg-white px-3 py-3 text-sm text-[#25373d] outline-none transition-all duration-200 ease-out focus:border-[#1a2b2f] focus:ring-2 focus:ring-[#dfe9e8]";

type PropertyFiltersProps = {
  filters: Filters;
  onChange: (nextFilters: Filters) => void;
  onReset?: () => void;
  locations?: readonly string[];
};

export function PropertyFilters({ filters, onChange, onReset, locations }: PropertyFiltersProps) {
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const updateFilter = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setTypeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    updateFilter(name as keyof Filters, value);
  };

  const availableLocations = locations ?? locationOptions;
  const selectedTypes = useMemo(
    () => (filters.type === "all" ? [] : filters.type.split(",").filter(Boolean)),
    [filters.type],
  );

  return (
    <div className="rounded-[1.5rem] border border-[#e7e0d7] bg-white p-4 shadow-[0_10px_25px_rgba(22,32,33,0.04)] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#1a2b2f]">Filter properties</h2>
        <button
          type="button"
          onClick={onReset ?? (() => undefined)}
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
            {availableLocations.map((location) => (
              <option key={location} value={location === "All locations" ? "all" : location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div ref={filterRef} className="relative">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-[#6b6258]">
            Property type
          </span>
          <button
            type="button"
            aria-expanded={typeMenuOpen}
            aria-haspopup="listbox"
            onClick={() => setTypeMenuOpen((open) => !open)}
            className={`${selectClassName} flex items-center justify-between gap-2 text-left`}
          >
            <span className="min-w-0 truncate">
              {selectedTypes.length === 0
                ? "All property types"
                : `Property Type (${selectedTypes.length})`}
            </span>
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${typeMenuOpen ? "rotate-180" : ""}`}
              fill="none"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {typeMenuOpen ? (
            <div
              role="listbox"
              aria-label="Property types"
              className="absolute z-30 mt-2 w-full rounded-2xl border border-[#dfe3df] bg-white p-2 shadow-[0_16px_32px_rgba(22,32,33,0.14)]"
            >
              <div className="mb-1 flex items-center justify-between px-2 py-1">
                <span className="text-xs font-medium text-[#6b6258]">Select one or more</span>
                <button
                  type="button"
                  onClick={() => updateFilter("type", "all")}
                  className="text-xs font-semibold text-[#1a2b2f] underline-offset-2 transition hover:underline"
                >
                  Clear
                </button>
              </div>

              {typeOptions.slice(1).map((type) => {
                const checked = selectedTypes.includes(type);
                return (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-2.5 py-2.5 text-sm text-[#25373d] transition hover:bg-[#f7f3ee]"
                  >
                    <span>{type}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const next = checked
                          ? selectedTypes.filter((value) => value !== type)
                          : [...selectedTypes, type];
                        updateFilter("type", next.length ? next.join(",") : "all");
                        setTypeMenuOpen(true);
                      }}
                      className="h-4 w-4 rounded border-[#b8b0a4] accent-[#1b2d32]"
                    />
                  </label>
                );
              })}
            </div>
          ) : null}
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
