type PropertyGalleryProps = {
  gallery: string[];
  videos: string[];
  title: string;
};

export function PropertyGallery({ gallery, videos, title }: PropertyGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr]">
        <div
          className="h-[360px] rounded-[2rem] border border-[#e7e0d7] p-4 shadow-[0_12px_30px_rgba(22,32,33,0.04)]"
          style={gallery[0] ? { backgroundImage: `url("${gallery[0]}")`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
          aria-label={`${title} primary view`}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {gallery.slice(1, 3).map((image, index) => (
            <div
              key={`${title}-${index}`}
              className="h-40 rounded-[1.5rem] border border-[#e7e0d7] p-3 shadow-[0_10px_22px_rgba(22,32,33,0.03)]"
              style={{ backgroundImage: `url("${image}")`, backgroundSize: "cover", backgroundPosition: "center" }}
              aria-label={`${title} gallery image ${index + 1}`}
            />
          ))}
        </div>
      </div>

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
