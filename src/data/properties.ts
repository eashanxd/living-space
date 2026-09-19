import { allLocations } from "@/data/location-data";

export type PropertyStatus = "available" | "sold" | "rented" | "unavailable";

export type FurnishingDetails = {
  water_purifier: boolean; fan: boolean; fridge: boolean; dining_table: boolean;
  geyser: boolean; stove: boolean; light: boolean; ac: boolean; chimney: boolean;
  modular_kitchen: boolean; wardrobe: boolean; microwave: boolean;
  washing_machine: boolean; bed: boolean; sofa: boolean; tv: boolean;
};

export type Facilities = {
  lifts: boolean; covered_parking: boolean; open_parking: boolean; gated_society: boolean;
  vaastu_compliant: boolean; security_guard: boolean; visitor_parking: boolean;
  cctv_surveillance: boolean; central_air_conditioning: boolean;
  high_ceiling_height: boolean; servant_room_separate_entry: boolean;
  false_ceiling_lighting: boolean; power_backup: boolean; piped_gas: boolean;
  security_fire_alarm: boolean;
};

export const furnishingFieldOptions = [
  ["water_purifier", "Water Purifier"],
  ["fan", "Fan"],
  ["fridge", "Fridge"],
  ["dining_table", "Dining Table"],
  ["geyser", "Geyser"],
  ["stove", "Stove"],
  ["light", "Light"],
  ["ac", "AC"],
  ["chimney", "Chimney"],
  ["modular_kitchen", "Modular Kitchen"],
  ["wardrobe", "Wardrobe"],
  ["microwave", "Microwave"],
  ["washing_machine", "Washing Machine"],
  ["bed", "Bed"],
  ["sofa", "Sofa"],
  ["tv", "TV"],
] as const satisfies readonly (readonly [keyof FurnishingDetails, string])[];

export const facilityFieldOptions = [
  ["lifts", "Lift(s)"],
  ["covered_parking", "Covered Parking"],
  ["open_parking", "Open Parking"],
  ["gated_society", "Gated Society"],
  ["vaastu_compliant", "Vaastu Compliant"],
  ["security_guard", "Security Guard"],
  ["visitor_parking", "Visitor Parking"],
  ["cctv_surveillance", "CCTV Surveillance"],
  ["central_air_conditioning", "Central Air Conditioning"],
  ["high_ceiling_height", "High Ceiling Height"],
  ["servant_room_separate_entry", "Separate Entry for Servant Room"],
  ["false_ceiling_lighting", "False Ceiling Lighting"],
  ["power_backup", "Power Back-up"],
  ["piped_gas", "Piped-gas"],
  ["security_fire_alarm", "Security / Fire Alarm"],
] as const satisfies readonly (readonly [keyof Facilities, string])[];

export const defaultFurnishingDetails: FurnishingDetails = {
  water_purifier: false, fan: false, fridge: false, dining_table: false, geyser: false,
  stove: false, light: false, ac: false, chimney: false, modular_kitchen: false,
  wardrobe: false, microwave: false, washing_machine: false, bed: false, sofa: false, tv: false,
};

export const defaultFacilities: Facilities = {
  lifts: false, covered_parking: false, open_parking: false, gated_society: false,
  vaastu_compliant: false, security_guard: false, visitor_parking: false,
  cctv_surveillance: false, central_air_conditioning: false, high_ceiling_height: false,
  servant_room_separate_entry: false, false_ceiling_lighting: false, power_backup: false,
  piped_gas: false, security_fire_alarm: false,
};

export type Property = {
  id: string;
  title: string;
  location: string;
  propertyType: string;
  configuration: string;
  rent: number | null;
  price: number | null;
  plotArea: string;
  furnishing: string;
  availableFor: string;
  availableFrom: string;
  postedBy: string;
  images: string[];
  videos: string[];
  status: PropertyStatus;
  about: string;
  furnishing_details: FurnishingDetails;
  facilities: Facilities;
};

export const locationOptions = ["All locations", ...allLocations];
export const typeOptions = ["All types", "Apartment", "Villa", "Builder Floor"];
export const bhkOptions = ["Any", "1", "2", "3", "4+"];
export const priceBracketOptions = [
  { label: "Any budget", value: "all" },
  { label: "Up to ₹1.5 Cr", value: "15000000" },
  { label: "Up to ₹3 Cr", value: "30000000" },
  { label: "Up to ₹5 Cr", value: "50000000" },
];

export type Filters = { location: string; type: string; bhk: string; budget: string };
export const defaultFilters: Filters = { location: "all", type: "all", bhk: "all", budget: "all" };

export function getFiltersFromSearchParams(searchParams: URLSearchParams | Record<string, string | undefined>): Filters {
  const getValue = (key: keyof Filters) => searchParams instanceof URLSearchParams ? searchParams.get(key) ?? "all" : searchParams[key] ?? "all";
  return { location: getValue("location"), type: getValue("type"), bhk: getValue("bhk"), budget: getValue("budget") };
}

export function filterProperties(properties: Property[], filters: Filters) {
  const selectedTypes = filters.type === "all" ? [] : filters.type.split(",").filter(Boolean);
  const budgetLimit = filters.budget === "all" ? undefined : Number(filters.budget);
  return properties.filter((property) => {
    const configurationBhk = property.configuration.match(/(\d+)\s*BHK/i)?.[1];
    const locationMatch = filters.location === "all" || property.location.startsWith(filters.location);
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(property.propertyType);
    const bhkMatch = filters.bhk === "all" || (configurationBhk !== undefined && (filters.bhk === "4+" ? Number(configurationBhk) >= 4 : configurationBhk === filters.bhk));
    const budgetMatch = budgetLimit === undefined || (property.price !== null && property.price <= budgetLimit);
    return locationMatch && typeMatch && bhkMatch && budgetMatch;
  });
}

export function formatPrice(value: number | null) {
  if (value === null) return "Not specified";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function formatStatusLabel(status: PropertyStatus) {
  return { available: "Available", sold: "Sold", rented: "Rented", unavailable: "Unavailable" }[status];
}
