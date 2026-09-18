import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/enquiry-form";
import { formatPrice, formatStatusLabel, type Property } from "@/data/properties";
import { PropertyGallery } from "@/components/property-gallery";

type PropertyDetailsProps = {
  property: Property;
};

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const statusTone =
    property.status === "available"
      ? "bg-[#e8f3ea] text-[#234d3b]"
      : property.status === "sold"
        ? "bg-[#efe3de] text-[#5e3c36]"
        : property.status === "rented"
          ? "bg-[#ede7d8] text-[#5d4a2d]"
          : "bg-[#f5f0eb] text-[#4d4a48]";

  return (
    <div className="space-y-10">
      <PropertyGallery gallery={property.gallery} title={property.title} />

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d9d1c7] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4d5b5e]">
              {property.type}
            </span>
            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusTone}`}>
              {formatStatusLabel(property.status)}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#1a2b2f] sm:text-5xl">
            {property.title}
          </h1>

          <p className="mt-3 text-lg text-[#54666b]">{property.location}</p>

          <div className="mt-6 flex flex-wrap gap-8 border-y border-[#e7e0d7] py-5 text-sm text-[#4e5a5d]">
            {property.bhk ? <span>{property.bhk} BHK</span> : null}
            <span>{property.area.toLocaleString("en-IN")} sq ft</span>
            <span>{property.bathrooms} Bathrooms</span>
            <span>{property.type}</span>
          </div>

          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7c6b5f]">Overview</p>
            <p className="mt-3 max-w-2xl text-base leading-8 text-[#51585a]">{property.description}</p>
          </div>

          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7c6b5f]">Amenities</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {property.amenities.map((amenity) => (
                <li key={amenity} className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] px-4 py-3 text-sm text-[#3d4d52]">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-[#e7e0d7] bg-white p-6 shadow-[0_14px_30px_rgba(22,32,33,0.04)]">
          <div className="text-sm uppercase tracking-[0.18em] text-[#7c6b5f]">Starting from</div>
          <div className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#1a2b2f]">
            {formatPrice(property.price)}
          </div>

          <div className="mt-6 space-y-3">
            <Button href="#enquire" className="w-full">
              Enquire now
            </Button>
            <Button href="/properties" variant="secondary" className="w-full">
              Browse more homes
            </Button>
          </div>

          <div className="mt-8 border-t border-[#eee5dc] pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7c6b5f]">Need help?</p>
            <p className="mt-2 text-sm leading-6 text-[#586d71]">
              Talk to a LIVING SPACE advisor for more detail on this property and nearby options.
            </p>
            <Link href="/contact" className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-[#1a2b2f] hover:text-[#56717a]">
              Contact us
            </Link>
          </div>
        </aside>
      </div>

      <section id="enquire" className="scroll-mt-24">
        <EnquiryForm property={property} />
      </section>
    </div>
  );
}
