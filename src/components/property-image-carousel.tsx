"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PropertyImageCarouselProps = {
  images: string[];
  title: string;
  variant: "featured" | "card" | "gallery";
  overlay?: ReactNode;
};

const variantStyles = {
  featured: "h-full w-full rounded-[1.2rem]",
  card: "h-full w-full",
  gallery: "min-h-[360px] w-full rounded-[2rem]",
};

export function PropertyImageCarousel({ images, title, variant, overlay }: PropertyImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const safeIndex = images.length ? Math.min(activeIndex, images.length - 1) : 0;
  const hasMultipleImages = images.length > 1;

  const showPrevious = () => setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % images.length);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null || !hasMultipleImages) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 40) return;
    if (distance < 0) showNext();
    else showPrevious();
  };

  return (
    <div
      className={`group/image relative overflow-hidden bg-[#e9e1d8] ${variantStyles[variant]}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStart.current = null; }}
      style={{ touchAction: "pan-y" }}
      aria-label={`${title} image gallery`}
    >
      {images.length ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-300"
          style={{ backgroundImage: `url("${images[safeIndex]}")` }}
          role="img"
          aria-label={`${title} image ${safeIndex + 1} of ${images.length}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center border border-[#e7e0d7] bg-[linear-gradient(135deg,#e9e1d8,#f5f0e8)] px-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#7a6d62]">
          No property images
        </div>
      )}

      {overlay}

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            aria-label={`Previous image for ${title}`}
            onClick={showPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-[#1a2b2f]/75 text-white opacity-0 shadow-[0_8px_18px_rgba(18,30,33,0.18)] transition-opacity group-hover/image:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Next image for ${title}`}
            onClick={showNext}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-[#1a2b2f]/75 text-white opacity-0 shadow-[0_8px_18px_rgba(18,30,33,0.18)] transition-opacity group-hover/image:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="absolute bottom-3 right-3 z-10 rounded-full bg-[#1a2b2f]/75 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white">
            {safeIndex + 1} / {images.length}
          </span>
        </>
      ) : null}

      {variant === "gallery" && images.length > 1 ? (
        <div className="absolute inset-x-4 bottom-4 z-10 flex gap-2 overflow-x-auto pb-1" onPointerDown={(event) => event.stopPropagation()}>
          {images.map((image, index) => (
            <button
              key={`${title}-thumbnail-${index}`}
              type="button"
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === safeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-[#e9e1d8] transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === safeIndex ? "border-white" : "border-white/40 opacity-75 hover:opacity-100"}`}
              style={{ backgroundImage: `url("${image}")`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
