export type PropertyMediaBucket = "property-images" | "property-videos";

export function getPropertyStoragePath(publicUrl: string, bucket: PropertyMediaBucket, propertyId: string) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const pathname = decodeURIComponent(new URL(publicUrl).pathname);
  const markerIndex = pathname.indexOf(marker);
  const path = markerIndex === -1 ? "" : pathname.slice(markerIndex + marker.length);

  if (!path || !path.startsWith(`${propertyId}/`) || path.includes("..")) {
    throw new Error(`The stored ${bucket} path is invalid for this property.`);
  }

  return path;
}
