import Link from "next/link";
import { formatPrice, formatStatusLabel, type Property } from "@/data/properties";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-[#e7e0d7] bg-white shadow-[0_14px_30px_rgba(22,32,33,0.04)] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#d4c9bf] hover:shadow-[0_18px_35px_rgba(22,32,33,0.08)] active:translate-y-0">
      <div className="p-4">
        <div
          className="flex h-56 items-end justify-between overflow-hidden rounded-[1.2rem] border border-white/50 p-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
          style={{ background: property.image }}
        >
          <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#354c51]">
            {property.type}
          </span>
          <span className="rounded-full bg-[#1a2b2f] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {formatStatusLabel(property.status)}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-[#7a6d62]">{property.location}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1a2b2f]">
              {property.title}
            </h3>
          </div>
          <span className="text-lg font-semibold text-[#1a2b2f]">{formatPrice(property.price)}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#52666a]">
          {property.bhk ? <span>{property.bhk} BHK</span> : <span>{property.type}</span>}
          <span>•</span>
          <span>{property.area.toLocaleString("en-IN")} sq ft</span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#eee5dc] pt-4">
          <span className="text-sm font-medium text-[#586d71]">{property.status === "available" ? "Ready to view" : formatStatusLabel(property.status)}</span>
          <Link
            href={`/properties/${property.propertyId}`}
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1a2b2f] transition-colors hover:text-[#56717a]"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
