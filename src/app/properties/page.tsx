import { PropertiesBrowser } from "@/app/properties/properties-browser";
import { getFiltersFromSearchParams } from "@/data/properties";
import { getProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

type PropertiesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const normalizedParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );

  const properties = await getProperties();
  return <PropertiesBrowser initialFilters={getFiltersFromSearchParams(normalizedParams)} properties={properties} />;
}
