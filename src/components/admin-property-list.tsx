"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";
import { getPropertyStoragePath, type PropertyMediaBucket } from "@/lib/property-storage";
import { createClient } from "@/lib/supabase/client";

type AdminPropertyListProps = {
  initialProperties: Property[];
};

function formatRent(value: number | null) {
  return value === null ? "Rent not specified" : `${formatPrice(value)} rent`;
}

function getMediaPaths(urls: string[], bucket: PropertyMediaBucket, propertyId: string) {
  return urls.map((url) => getPropertyStoragePath(url, bucket, propertyId));
}

export function AdminPropertyList({ initialProperties }: AdminPropertyListProps) {
  const [properties, setProperties] = useState(initialProperties);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = async (propertyId: string) => {
    setError("");
    setSuccess("");
    setDeletingId(propertyId);

    try {
      const supabase = createClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("Your admin session has expired. Please sign in again.");

      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .select("id,images,videos")
        .eq("id", propertyId)
        .maybeSingle();
      if (propertyError) throw new Error(propertyError.message);
      if (!property) throw new Error("This property no longer exists.");

      const imagePaths = getMediaPaths(Array.isArray(property.images) ? property.images.filter((image): image is string => typeof image === "string") : [], "property-images", propertyId);
      const videoPaths = getMediaPaths(Array.isArray(property.videos) ? property.videos.filter((video): video is string => typeof video === "string") : [], "property-videos", propertyId);

      if (imagePaths.length) {
        const { error: imageError } = await supabase.storage.from("property-images").remove(imagePaths);
        if (imageError) throw new Error(`Image cleanup failed: ${imageError.message}`);
      }

      if (videoPaths.length) {
        const { error: videoError } = await supabase.storage.from("property-videos").remove(videoPaths);
        if (videoError) throw new Error(`Video cleanup failed: ${videoError.message}`);
      }

      const { data: deletedProperty, error: deleteError } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId)
        .select("id")
        .maybeSingle();
      if (deleteError) throw new Error(`Property deletion failed: ${deleteError.message}`);
      if (!deletedProperty) throw new Error("Property deletion was not authorized or the property no longer exists.");

      setProperties((current) => current.filter((item) => item.id !== propertyId));
      setConfirmingId(null);
      setSuccess("Property and its uploaded media were deleted successfully.");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to delete this property.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mt-10 rounded-[1.5rem] border border-[#e7e0d7] bg-white p-5 shadow-[0_12px_28px_rgba(22,32,33,0.04)] sm:p-6" aria-labelledby="admin-properties-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7c6b5f]">Saved listings</p>
          <h2 id="admin-properties-heading" className="mt-2 text-2xl font-semibold text-[#1a2b2f]">Manage properties</h2>
        </div>
        <p className="text-sm text-[#687779]">{properties.length} {properties.length === 1 ? "property" : "properties"}</p>
      </div>

      {error ? <div role="alert" className="mt-5 rounded-2xl border border-[#ead6d1] bg-[#fbf1ef] px-4 py-3 text-sm text-[#7a3931]">{error}</div> : null}
      {success ? <div role="status" className="mt-5 rounded-2xl border border-[#cfe5d8] bg-[#f0faf3] px-4 py-3 text-sm text-[#285b3e]">{success}</div> : null}

      {properties.length ? (
        <div className="mt-6 grid gap-3">
          {properties.map((property) => {
            const isConfirming = confirmingId === property.id;
            const isDeleting = deletingId === property.id;
            return (
              <article key={property.id} className="rounded-2xl border border-[#eee5dc] bg-[#fcfaf7] p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-[#1a2b2f]">{property.title || "Untitled property"}</h3>
                    <p className="mt-1 text-sm text-[#586d71]">{property.location} · {property.configuration} · {property.propertyType}</p>
                    <p className="mt-2 text-sm text-[#6d6259]">{formatPrice(property.price)} · {formatRent(property.rent)} · {property.status}</p>
                  </div>
                  {isConfirming ? (
                    <div className="rounded-xl border border-[#ead6d1] bg-[#fff8f6] p-3 lg:max-w-md">
                      <p className="text-sm font-semibold text-[#6f312b]">Delete this property?</p>
                      <p className="mt-1 text-xs leading-5 text-[#7a3931]">This will permanently remove the property and its uploaded images/videos.</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" onClick={() => setConfirmingId(null)} disabled={isDeleting} className="rounded-full border border-[#d9d1c7] bg-white px-4 py-2 text-xs font-semibold text-[#1a2b2f] transition hover:bg-[#f7f3ee] disabled:cursor-not-allowed disabled:opacity-60">Cancel</button>
                        <button type="button" onClick={() => handleDelete(property.id)} disabled={isDeleting} className="inline-flex items-center gap-2 rounded-full bg-[#8b3d35] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#713029] disabled:cursor-not-allowed disabled:opacity-60"><Trash2 className="h-3.5 w-3.5" aria-hidden="true" />{isDeleting ? "Deleting..." : "Delete Property"}</button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => { setError(""); setSuccess(""); setConfirmingId(property.id); }} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#e2c5bf] px-4 py-2 text-sm font-semibold text-[#8b3d35] transition hover:bg-[#fff4f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b3d35] focus-visible:ring-offset-2"><Trash2 className="h-4 w-4" aria-hidden="true" />Delete</button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : <p className="mt-6 rounded-2xl border border-dashed border-[#d9d1c7] px-4 py-8 text-center text-sm text-[#687779]">No properties have been added yet.</p>}
    </section>
  );
}
