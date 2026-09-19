import { PropertyCard } from "@/components/property-card";
import type { Property } from "@/data/properties";

type PropertyGridProps = {
  properties: Property[];
};

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-[#d5cfc4] bg-[#f7f4f0] p-10 text-center">
        <h3 className="text-xl font-semibold text-[#1a2b2f]">No properties found matching your search.</h3>
        <p className="mt-2 text-sm text-[#5d6059]">
          Try adjusting the filters to explore more homes and commercial spaces.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
