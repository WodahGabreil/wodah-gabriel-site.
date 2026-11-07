import { useState } from "react";
import type { EvidenceImage } from "../content/types";
import { Expand, ImageIcon } from "./Icons";
import { Lightbox } from "./Lightbox";
import { asset } from "./assets";

function Slot({ img }: { img: EvidenceImage }) {
  // Shown until the real screenshot file is added to /public/evidence
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-ground/60 p-4 text-center">
      <ImageIcon className="text-muted" size={26} />
      <p className="text-sm font-medium text-ink">Screenshot coming soon</p>
      {import.meta.env.DEV && (
        <p className="break-all text-xs text-muted">
          Add file: <code className="text-accent-text">public/{img.src}</code>
        </p>
      )}
    </div>
  );
}

export function EvidenceGallery({ images }: { images: EvidenceImage[] }) {
  const [missing, setMissing] = useState<Set<string>>(new Set());
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  if (!images.length) return null;

  const loaded = images.filter((i) => !missing.has(i.src));
  const openIndex = loaded.findIndex((i) => i.src === openSrc);

  return (
    <div>
      <p className="eyebrow mb-4 text-muted">Supporting evidence</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <figure key={img.src} className="m-0">
            {missing.has(img.src) ? (
              <Slot img={img} />
            ) : (
              <button
                type="button"
                onClick={() => setOpenSrc(img.src)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-ground"
                aria-label={`Enlarge: ${img.caption}`}
              >
                <img
                  src={asset(img.src)}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  onError={() => setMissing((m) => new Set(m).add(img.src))}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-ground/0 transition-colors group-hover:bg-ground/35" aria-hidden="true" />
                <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-strong text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand size={16} />
                </span>
              </button>
            )}
            <figcaption className="mt-2 text-xs text-muted">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
      {openIndex >= 0 && (
        <Lightbox
          images={loaded}
          index={openIndex}
          onChange={(i) => setOpenSrc(loaded[i].src)}
          onClose={() => setOpenSrc(null)}
        />
      )}
    </div>
  );
}
