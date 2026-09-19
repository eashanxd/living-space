import { EnquiryForm } from "@/components/enquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPropertyById } from "@/lib/properties";

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ propertyId?: string }> | { propertyId?: string };
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const propertyId = resolvedSearchParams?.propertyId;
  const property = propertyId ? await getPropertyById(propertyId) : null;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[1.75rem] border border-[#e7e0d7] bg-white p-6 shadow-[0_14px_30px_rgba(22,32,33,0.04)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6b5f]">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#1a2b2f] sm:text-5xl">
              Talk to a LIVING SPACE advisor.
            </h1>
            <p className="mt-5 text-base leading-8 text-[#54504a]">
              Share your requirements and we will help you understand the best-fit options for your next property decision.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c6b5f]">Email</p>
                <p className="mt-2 text-sm font-medium text-[#1a2b2f]">livingspace.del@gmail.com</p>
              </div>
              <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c6b5f]">Phone</p>
                <p className="mt-2 text-sm font-medium text-[#1a2b2f]">+91 92662 39923</p>
              </div>
              <div className="rounded-2xl border border-[#e7e0d7] bg-[#faf7f3] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c6b5f]">Hours</p>
                <p className="mt-2 text-sm font-medium text-[#1a2b2f]">Wednesday to Monday</p>
                <p className="text-sm text-[#54666b]">10:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>

          <EnquiryForm property={property} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
