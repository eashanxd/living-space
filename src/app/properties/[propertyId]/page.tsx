import { notFound } from "next/navigation";
import { PropertyDetails } from "@/components/property-details";
import { demoProperties, getPropertyById } from "@/data/properties";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export async function generateStaticParams() {
  return demoProperties.map((property) => ({
    propertyId: property.propertyId,
  }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = getPropertyById(propertyId);

  if (!property) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <PropertyDetails property={property} />
      </main>
      <SiteFooter />
    </>
  );
}
