"use client";

import NextImage from "next/image";
import { useEffect, useMemo, useState } from "react";

const initialForm = {
  label: "",
  width: 0,
  height: 0,
  aspectRatio: 0,
  publicId: "",
};

function readImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();

    image.onload = () => {
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      URL.revokeObjectURL(url);
      resolve({
        width,
        height,
        aspectRatio: width / height,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to read image dimensions"));
    };

    image.src = url;
  });
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const loadItems = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.label.trim() &&
          file &&
          form.width &&
          form.height &&
          form.aspectRatio
      ),
    [file, form.aspectRatio, form.height, form.label, form.width]
  );

  const onPickFile = async (picked) => {
    if (!picked) return;
    if (!picked.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const dims = await readImageDimensions(picked);
      const previewUrl = URL.createObjectURL(picked);

      setFile(picked);
      setPreview((current) => {
        if (current) URL.revokeObjectURL(current);
        return previewUrl;
      });
      setForm((current) => ({
        ...current,
        width: dims.width,
        height: dims.height,
        aspectRatio: dims.aspectRatio,
      }));
    } catch (err) {
      setError(err.message || "Failed to read image");
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async () => {
    if (!file) throw new Error("Pick an image first.");
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary upload settings are missing.");
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error?.message || "Cloudinary upload failed");
    }

    return {
      image: json.secure_url,
      publicId: json.public_id || "",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const upload = await uploadToCloudinary();

      const payload = {
        label: form.label.trim(),
        image: upload.image,
        publicId: upload.publicId,
        width: form.width,
        height: form.height,
        aspectRatio: form.aspectRatio,
      };

      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.error || "Failed to save gallery item");
      }

      setForm(initialForm);
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      await loadItems();
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this gallery item?");
    if (!ok) return;

    const res = await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      loadItems();
    }
  };

  return (
    <main className="relative overflow-hidden bg-[#05080f] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,181,106,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(92,168,255,0.16),transparent_30%),radial-gradient(circle_at_bottom,rgba(242,185,59,0.08),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="sec-eyebrow text-emerald-400">Admin / Gallery</p>
            <h1 className="sec-title text-3xl md:text-5xl">
              Upload images with <em>saved dimensions</em>
            </h1>
            <p className="sec-desc max-w-xl text-slate-300">
              Each upload is measured first, then stored with width, height,
              and aspect ratio so the public gallery can place mixed-size
              photos cleanly.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Total
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {items.length}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Ready
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-400">
                {canSubmit ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Ratio
              </p>
              <p className="mt-1 text-2xl font-semibold text-sky-300">
                {form.aspectRatio ? form.aspectRatio.toFixed(2) : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Upload Panel
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Add new gallery image
                </h2>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Auto dimension detect
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Label
                </label>
                <input
                  value={form.label}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, label: e.target.value }))
                  }
                  placeholder="Main hall, reading corner, study pods"
                  className="w-full rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Image file
                </label>
                <label className="group block cursor-pointer rounded-3xl border border-dashed border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 via-white/5 to-sky-400/10 p-6 transition hover:border-emerald-400/50 hover:bg-emerald-400/15">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onPickFile(e.target.files?.[0])}
                  />
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-2xl text-emerald-300 shadow-lg shadow-black/20 transition group-hover:scale-105">
                      +
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Drag, drop, or click to choose an image
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Width, height, and aspect ratio are detected before
                        saving.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                    Detected metadata
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
                      <p className="text-xs text-slate-500">Width</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {form.width || "—"}
                        <span className="ml-1 text-xs text-slate-500">px</span>
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
                      <p className="text-xs text-slate-500">Height</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {form.height || "—"}
                        <span className="ml-1 text-xs text-slate-500">px</span>
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
                      <p className="text-xs text-slate-500">Aspect ratio</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {form.aspectRatio ? form.aspectRatio.toFixed(2) : "—"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
                      <p className="text-xs text-slate-500">Status</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {loading ? "Reading..." : "Ready"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[220px] flex-1 items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-4">
                  {preview ? (
                    <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <NextImage
                        src={preview}
                        alt="Preview"
                        fill
                        unoptimized
                        sizes="100vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-slate-400">
                        No preview selected
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        The preview will appear here after you choose a file.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit || loading || saving}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3.5 font-semibold text-black shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Gallery Item"}
              </button>
            </div>
          </form>

          <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                What gets saved
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Stored metadata
              </h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-500">Label</p>
                <p className="mt-1 text-sm font-medium text-white">
                  Visible caption for the gallery grid
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-500">Image URL</p>
                <p className="mt-1 break-all text-sm font-medium text-white">
                  Cloudinary secure URL
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-500">Dimensions</p>
                <p className="mt-1 text-sm font-medium text-white">
                  width, height, aspectRatio
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-500">Public layout</p>
                <p className="mt-1 text-sm font-medium text-white">
                  Masonry cards sized from the stored ratio
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Saved items
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Current gallery entries
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              {items.length} item{items.length === 1 ? "" : "s"} total
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-10 text-center text-slate-400">
              No gallery images uploaded yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {items.map((item) => {
                const ratio = Number(item.aspectRatio) || 1;
                const orientationClass =
                  ratio >= 1
                    ? "sm:col-span-1"
                    : ratio < 0.75
                    ? "sm:col-span-1 xl:row-span-2"
                    : "sm:col-span-1";

                return (
                  <article
                    key={item._id}
                    className={`overflow-hidden rounded-3xl border border-white/10 bg-black/20 ${orientationClass}`}
                  >
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: `${item.width} / ${item.height}` }}
                    >
                      <NextImage
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition duration-500 hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
                        {item.width} x {item.height}
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-3 p-4">
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {item.label}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          Ratio {Number(item.aspectRatio).toFixed(2)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-100 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
