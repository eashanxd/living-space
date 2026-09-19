import Link from "next/link";
import {
  BedDouble,
  BellRing,
  Building2,
  CalendarDays,
  CarFront,
  CookingPot,
  Droplets,
  Fan,
  Home,
  IndianRupee,
  Lightbulb,
  Refrigerator,
  Ruler,
  ShieldCheck,
  Sofa,
  Tag,
  Tv,
  UserRound,
  WashingMachine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/enquiry-form";
import {
  formatPrice,
  formatStatusLabel,
  getPropertyPriceLabel,
  facilityFieldOptions,
  furnishingFieldOptions,
  type Facilities,
  type FurnishingDetails,
  type Property,
} from "@/data/properties";
import { PropertyGallery } from "@/components/property-gallery";

type PropertyDetailsProps = {
  property: Property;
};

const furnishingIcons: Record<keyof FurnishingDetails, typeof Home> = {
  water_purifier: Droplets,
  fan: Fan,
  fridge: Refrigerator,
  dining_table: Home,
  geyser: Droplets,
  stove: CookingPot,
  light: Lightbulb,
  ac: Fan,
  chimney: CookingPot,
  modular_kitchen: CookingPot,
  wardrobe: Home,
  microwave: CookingPot,
  washing_machine: WashingMachine,
  bed: BedDouble,
  sofa: Sofa,
  tv: Tv,
};

const facilityIcons: Record<keyof Facilities, typeof Home> = {
  lifts: Building2,
  covered_parking: CarFront,
  open_parking: CarFront,
  gated_society: ShieldCheck,
  vaastu_compliant: Home,
  security_guard: ShieldCheck,
  visitor_parking: CarFront,
  cctv_surveillance: BellRing,
  central_air_conditioning: Fan,
  high_ceiling_height: Home,
  servant_room_separate_entry: Home,
  false_ceiling_lighting: Lightbulb,
  power_backup: BellRing,
  piped_gas: CookingPot,
  security_fire_alarm: ShieldCheck,
};

function getFeatureList(property: Property, mode: "furnishing" | "facility") {
  if (mode === "furnishing") {
    return furnishingFieldOptions.map(([key, label]) => ({ label, icon: furnishingIcons[key], enabled: property.furnishing_details[key] }));
  }

  return facilityFieldOptions.map(([key, label]) => ({ label, icon: facilityIcons[key], enabled: property.facilities[key] }));
}

function FeatureRow({ items, color, title }: { items: { label: string; icon: typeof Home; enabled: boolean }[]; color: string; title: string }) {
  return (
    <div className="mt-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a6d62]">{title}</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.label}
              className={`group flex items-center gap-3 rounded-2xl border border-[#eae0d5] bg-[#faf7f3] px-3 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d5c7b5] hover:bg-[#f5f0ea] ${item.enabled ? "" : "opacity-60 grayscale"}`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${item.enabled ? color : "border-[#d7d3cd] bg-[#f0eeeb] text-[#727675]"}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="truncate text-sm font-medium text-[#2d3e42]">{item.enabled ? item.label : `No ${item.label}`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PropertyFeatures({ property }: { property: Property }) {
  const furnishingItems = getFeatureList(property, "furnishing");
  const facilityItems = getFeatureList(property, "facility");

  return (
    <section aria-labelledby="property-features" className="mt-8 rounded-[1.6rem] border border-[#e8e1d8] bg-[#fbf8f4] p-4 sm:p-5">
      <h2 id="property-features" className="sr-only">
        Property features
      </h2>
      <FeatureRow items={furnishingItems} color="border-[#d8efe8] bg-[#edfdf8] text-[#0e8b75]" title="Furnishing Details" />
      <div className="mt-6 border-t border-[#e9dfd5] pt-6">
        <FeatureRow items={facilityItems} color="border-[#dfe8ff] bg-[#edf4ff] text-[#2570d9]" title="Facilities" />
      </div>
    </section>
  );
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const priceLabel = getPropertyPriceLabel(property);
  const statusTone =
    property.status === "available"
      ? "bg-[#e8f3ea] text-[#234d3b]"
      : property.status === "sold"
        ? "bg-[#efe3de] text-[#5e3c36]"
        : property.status === "rented"
          ? "bg-[#ede7d8] text-[#5d4a2d]"
          : "bg-[#f5f0eb] text-[#4d4a48]";

  const overviewItems = [
    {
      label: "Configuration",
      value: property.configuration,
      tone: "bg-[#edf5ff] text-[#1f67c3]",
      icon: Building2,
    },
    {
      label: "Rent",
      value: property.rent === null ? "" : formatPrice(property.rent),
      tone: "bg-[#fff6dd] text-[#c78a00]",
      icon: IndianRupee,
    },
    {
      label: "Plot Area",
      value: property.plotArea,
      tone: "bg-[#eefbf2] text-[#228a62]",
      icon: Ruler,
    },
    {
      label: "Furnishing",
      value: property.furnishing,
      tone: "bg-[#f3ecff] text-[#7344d0]",
      icon: Sofa,
    },
    {
      label: "Available For",
      value: property.availableFor,
      tone: "bg-[#fff2e8] text-[#d97a23]",
      icon: Tag,
    },
    {
      label: "Available From",
      value: new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${property.availableFrom}T00:00:00Z`)),
      tone: "bg-[#eef8ff] text-[#0a6baf]",
      icon: CalendarDays,
    },
    {
      label: "Posted By",
      value: property.postedBy,
      tone: "bg-[#edf9f5] text-[#148066]",
      icon: UserRound,
    },
  ];

  return (
    <div className="space-y-10">
      <PropertyGallery gallery={property.images} videos={property.videos} title={property.title} />

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d9d1c7] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4d5b5e]">
              {property.propertyType}
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
            <span>{property.configuration}</span>
            <span>{property.plotArea}</span>
            <span>{property.propertyType}</span>
          </div>

          <section
            aria-labelledby="property-overview"
            className="mt-8 animate-fade-up rounded-[1.65rem] border border-[#e7dfd5] bg-[#f7f2ec] p-4 shadow-[0_12px_24px_rgba(27,45,50,0.04)] sm:p-5"
          >
            <h2 id="property-overview" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a6d62]">
              Property Overview
            </h2>

            <dl className="mt-4 grid gap-0 overflow-hidden rounded-[1.1rem] border border-[#e5d9ca] bg-[#fffefc] sm:grid-cols-2">
              {overviewItems.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === overviewItems.length - 1;

                return (
                  <div
                    key={item.label}
                    className={[
                      "group flex items-start gap-3 border-b border-[#efe4d7] p-4 transition-all duration-200 ease-out hover:bg-[#f9f4ee] sm:p-5",
                      index % 2 === 0 && !isLast ? "sm:border-r" : "",
                      isLast ? "border-b-0 sm:col-span-2" : "",
                    ].join(" ")}
                  >
                    <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent ${item.tone} transition-transform duration-200 ease-out group-hover:-translate-y-0.5`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7a6d62]">{item.label}</dt>
                      <dd className="mt-1.5 text-base font-semibold leading-snug text-[#1d2d31] sm:text-lg">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </section>

          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7c6b5f]">Description</p>
            <p className="mt-3 max-w-2xl text-base leading-8 text-[#51585a]">{property.about}</p>
          </div>

          <PropertyFeatures property={property} />
        </div>

        <aside className="rounded-[1.75rem] border border-[#e7e0d7] bg-white p-6 shadow-[0_14px_30px_rgba(22,32,33,0.04)]">
          <div className="text-sm uppercase tracking-[0.18em] text-[#7c6b5f]">Starting from</div>
          <div className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#1a2b2f]">
            {priceLabel ?? "Contact for pricing"}
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
