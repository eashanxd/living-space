import Link from "next/link";
import { formatPrice, formatStatusLabel, type Property } from "@/data/properties";

type PropertyCardProps = {
  property: Property;
};

function formatAvailableDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

const statusStyles: Record<Property["status"], string> = {
  available: "bg-[#eaf3ee] text-[#275a45]",
  sold: "bg-[#f5e8e5] text-[#7b3f3f]",
  rented: "bg-[#f3efe4] text-[#7a5628]",
  unavailable: "bg-[#eceae7] text-[#4e5258]",
};

export function PropertyCard({ property }: PropertyCardProps) {
  const metadata = [
    { label: "Configuration", value: property.configuration },
    { label: "Rent", value: formatPrice(property.rent) },
    { label: "Plot Area", value: property.plotArea },
    { label: "Furnishing", value: property.furnishing },
    { label: "Available For", value: property.availableFor },
    { label: "Available From", value: formatAvailableDate(property.availableFrom) },
    { label: "Posted By", value: property.postedBy },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#e8e0d7] bg-[#fffdfb] shadow-[0_12px_30px_rgba(25,36,43,0.04)] transition-all duration-[220ms] ease-out hover:-translate-y-1 hover:border-[#d9cbb8] hover:shadow-[0_18px_32px_rgba(25,36,43,0.08)] active:translate-y-0">
      <div className="relative overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[260ms] ease-out group-hover:scale-[1.03]"
            style={property.images[0] ? { backgroundImage: `url("${property.images[0]}")` } : undefined}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10262b]/30 via-transparent to-white/10" />
          <span
            className={`absolute left-4 top-4 rounded-full border border-white/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-[0_8px_20px_rgba(18,30,33,0.12)] backdrop-blur-sm transition-all duration-[220ms] ease-out group-hover:translate-y-[-1px] ${statusStyles[property.status]}`}
          >
            {formatStatusLabel(property.status)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7a6d62]">{property.propertyType}</p>
            <h3 className="mt-2 text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.05em] text-[#1a2b2f]">
              {property.title}
            </h3>
            <p className="mt-2 text-sm text-[#5e6b6e]">{property.location}</p>
          </div>
          <div className="shrink-0 rounded-full border border-[#eadfce] bg-[#f7f2ec] px-2.5 py-1.5 text-sm font-semibold text-[#1a2b2f]">
            {formatPrice(property.price)}
          </div>
        </div>

        <div className="mt-5 border-t border-[#efe7df] pt-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 text-sm md:grid-cols-2">
            {metadata.map((item) => (
              <div
                key={item.label}
                className={`border-b border-[#f4efe9] pb-3 ${item.label === "Posted By" ? "md:col-span-2" : ""}`}
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a6d62]">{item.label}</dt>
                <dd className="mt-1.5 font-medium text-[#1a2b2f]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#efe7df] pt-4">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#5f6d70]">
            {property.status === "available" ? "Ready to view" : formatStatusLabel(property.status)}
          </span>

          <Link
            href={`/properties/${property.id}`}
            className="inline-flex items-center justify-center rounded-full border border-[#d7cab8] bg-[#1a2b2f] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-[220ms] ease-out hover:-translate-y-0.5 hover:bg-[#233a40] hover:shadow-[0_10px_18px_rgba(26,43,47,0.16)] active:translate-y-0 active:scale-[0.99]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
