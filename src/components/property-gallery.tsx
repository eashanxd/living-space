type PropertyGalleryProps = {
  gallery: string[];
  title: string;
};

export function PropertyGallery({ gallery, title }: PropertyGalleryProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr]">
      <div
        className="h-[360px] rounded-[2rem] border border-[#e7e0d7] p-4 shadow-[0_12px_30px_rgba(22,32,33,0.04)]"
        style={{ background: gallery[0] }}
        aria-label={`${title} primary view`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {gallery.slice(1, 3).map((image, index) => (
          <div
            key={`${title}-${index}`}
            className="h-40 rounded-[1.5rem] border border-[#e7e0d7] p-3 shadow-[0_10px_22px_rgba(22,32,33,0.03)]"
            style={{ background: image }}
            aria-label={`${title} gallery image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
