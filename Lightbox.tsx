import { useCallback, useEffect, useRef } from "react";
import type { EvidenceImage } from "../content/types";
import { ChevronLeft, ChevronRight, Close } from "./Icons";
import { asset } from "./assets";

/** Accessible full-screen viewer: Esc closes, arrow keys navigate, focus is trapped and restored. */
export function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: EvidenceImage[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const img = images[index];

  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Evidence screenshot viewer"
      className="fixed inset-0 z-[100] flex flex-col bg-midnight/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-ivory sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="eyebrow text-mist">
          {index + 1} / {images.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:border-lime hover:text-lime"
          aria-label="Close viewer"
        >
          <Close />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-ivory hover:text-lime sm:left-6"
            aria-label="Previous screenshot"
          >
            <ChevronLeft />
          </button>
        )}
        <img
          src={asset(img.src)}
          alt={img.alt}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-ivory hover:text-lime sm:right-6"
            aria-label="Next screenshot"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      <p className="px-6 py-4 text-center text-sm text-mist" onClick={(e) => e.stopPropagation()}>
        {img.caption}
      </p>
    </div>
  );
}
