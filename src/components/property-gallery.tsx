import { PropertyImageCarousel } from "@/components/property-image-carousel";

type PropertyGalleryProps = {
  gallery: string[];
  videos: string[];
  title: string;
};

export function PropertyGallery({ gallery, videos, title }: PropertyGalleryProps) {
  return (
    <div className="space-y-4">
      <PropertyImageCarousel images={gallery} title={title} variant="gallery" />

      {videos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {videos.map((video, index) => (
            <video key={`${title}-video-${index}`} controls preload="metadata" className="h-56 w-full rounded-[1.5rem] border border-[#e7e0d7] bg-[#1a2b2f] object-cover" aria-label={`${title} video ${index + 1}`}>
              <source src={video} />
              Your browser does not support video playback.
            </video>
          ))}
        </div>
      ) : null}
    </div>
  );
}
