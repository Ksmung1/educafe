"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/app/components/Navbar";

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const total = items.length;
    const landscape = items.filter((item) => item.aspectRatio >= 1).length;
    const portrait = total - landscape;
    return { total, landscape, portrait };
  }, [items]);

  return (
    <div className="page-panel">
      <Navbar />
      <div className="page-section">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="sec-eyebrow">Gallery</p>
            <h1 className="sec-title">
              A place built for <em>deep work</em>
            </h1>
    
          </div>

        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading gallery...
          </div>
        ) : null}

        {!loading && items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
            No gallery images uploaded yet.
          </div>
        ) : null}

        <div className="gallery-square-grid">
          {items.map((item) => (
            <article
              key={item._id}
              className="gallery-square-card"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedImage(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedImage(item);
                }
              }}
            >
              <div className="gallery-square-media">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-500 hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="gallery-square-caption">
                  <h3>{item.label}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedImage ? (
        <div
          className="image-viewer-overlay"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedImage(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setSelectedImage(null);
            }
          }}
        >
          <div
            className="image-viewer-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="image-viewer-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="image-viewer-image">
              <Image
                src={selectedImage.image}
                alt={selectedImage.label}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="image-viewer-label">{selectedImage.label}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
