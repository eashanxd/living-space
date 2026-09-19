import { createClient } from "@/lib/supabase/server";
import { defaultFacilities, defaultFurnishingDetails, type Facilities, type FurnishingDetails, type Property, type PropertyStatus } from "@/data/properties";

type SupabasePropertyRow = {
  id: string; title: string | null; location: string | null; property_type: string | null;
  configuration: string | null; rent: number | string | null; price: number | string | null;
  plot_area: string | null; furnishing: string | null; available_for: string | null;
  available_from: string | null; posted_by: string | null; images: unknown; videos: unknown;
  status: string | null; about: string | null; furnishing_details: unknown; facilities: unknown;
};

const propertyColumns = "id,title,location,property_type,configuration,rent,price,plot_area,furnishing,available_for,available_from,posted_by,images,videos,status,about,furnishing_details,facilities";
const statuses = new Set<PropertyStatus>(["available", "sold", "rented", "unavailable"]);

function booleanDetails<T extends Record<string, boolean>>(defaults: T, value: unknown): T {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { ...defaults };
  const source = value as Record<string, unknown>;
  return Object.fromEntries(Object.keys(defaults).map((key) => [key, source[key] === true])) as T;
}

function toNullableNumber(value: number | string | null) {
  if (value === null || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeProperty(row: SupabasePropertyRow): Property {
  return {
    id: row.id, title: row.title ?? "", location: row.location ?? "", propertyType: row.property_type ?? "",
    configuration: row.configuration ?? "", rent: toNullableNumber(row.rent), price: toNullableNumber(row.price),
    plotArea: row.plot_area ?? "", furnishing: row.furnishing ?? "", availableFor: row.available_for ?? "",
    availableFrom: row.available_from ?? "", postedBy: row.posted_by ?? "",
    images: Array.isArray(row.images) ? row.images.filter((image): image is string => typeof image === "string") : [],
    videos: Array.isArray(row.videos) ? row.videos.filter((video): video is string => typeof video === "string") : [],
    status: statuses.has(row.status as PropertyStatus) ? row.status as PropertyStatus : "unavailable",
    about: row.about ?? "",
    furnishing_details: booleanDetails<FurnishingDetails>(defaultFurnishingDetails, row.furnishing_details),
    facilities: booleanDetails<Facilities>(defaultFacilities, row.facilities),
  };
}

export async function getProperties() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select(propertyColumns).order("created_at", { ascending: false });
  return error || !data ? [] : (data as SupabasePropertyRow[]).map(normalizeProperty);
}

export async function getPropertyById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("properties").select(propertyColumns).eq("id", id).maybeSingle();
  return error || !data ? null : normalizeProperty(data as SupabasePropertyRow);
}
