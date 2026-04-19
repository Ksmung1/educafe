"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  body: "",
  source: "",
  tag: "",
  tone: "gen",
  dateLabel: "",
  image: "",
  publicId: "",
  featured: false,
};

const toneOptions = [
  { value: "alert", label: "Alert" },
  { value: "result", label: "Result" },
  { value: "exam", label: "Notification" },
  { value: "admit", label: "Admit Card" },
  { value: "gen", label: "General" },
];

export default function AdminNewsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null); // null = create mode, string = edit mode
  const [imageMode, setImageMode] = useState("url"); // "url" | "upload"
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const loadItems = async () => {
    const res = await fetch("/api/news", { cache: "no-store" });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // ── Image helpers ──────────────────────────────────────────────────────────

  const uploadImage = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (!cloudName || !uploadPreset) {
      setError("Cloudinary upload settings are missing.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || "Cloudinary upload failed");

      setForm((f) => ({
        ...f,
        image: json.secure_url || "",
        publicId: json.public_id || "",
      }));
    } catch (err) {
      setError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ── Edit helpers ───────────────────────────────────────────────────────────

  const startEdit = (item) => {
    setEditingId(item._id);
    setImageMode(item.image ? "url" : "url"); // default to url tab so existing URL shows
    setForm({
      title: item.title || "",
      body: item.body || "",
      source: item.source || "",
      tag: item.tag || "",
      tone: item.tone || "gen",
      dateLabel: item.dateLabel || "",
      image: item.image || "",
      publicId: item.publicId || "",
      featured: item.featured || false,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setError("");
  };

  // ── Submit (create or update) ──────────────────────────────────────────────

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      title: form.title.trim(),
      body: form.body.trim(),
      source: form.source.trim(),
      tag: form.tag.trim(),
      dateLabel: form.dateLabel.trim(),
      image: form.image.trim(),
    };

    try {
      const isEdit = Boolean(editingId);
      const res = await fetch("/api/news", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { id: editingId, ...payload } : payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to save news item");

      setForm(initialForm);
      setEditingId(null);
      await loadItems();
    } catch (err) {
      setError(err.message || "Failed to save news item");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news item?")) return;

    const res = await fetch("/api/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      if (editingId === id) cancelEdit();
      loadItems();
    }
  };

  // ── UI ─────────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#05080f] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-400">
            Admin / News
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-5xl">
            News feed manager
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Create or edit news items. Paste an image URL directly, or upload a file
            to Cloudinary — whichever you use last wins.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">

          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  {editingId ? "Editing item" : "Create item"}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  {editingId ? "Update news item" : "Add a news update"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300 hover:bg-white/10"
                  >
                    Cancel edit
                  </button>
                )}
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                  {items.length} saved
                </div>
              </div>
            </div>

            <div className="grid gap-4">

              {/* Title */}
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="News title"
                className="rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                required
              />

              {/* Body */}
              <textarea
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                placeholder="News summary"
                rows={5}
                className="rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                required
              />

              {/* Source + Date */}
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={form.source}
                  onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                  placeholder="Source"
                  className="rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                  required
                />
                <input
                  value={form.dateLabel}
                  onChange={(e) => setForm((f) => ({ ...f, dateLabel: e.target.value }))}
                  placeholder="Date label"
                  className="rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                  required
                />
              </div>

              {/* Tag + Tone */}
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={form.tag}
                  onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                  placeholder="Tag label"
                  className="rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                  required
                />
                <select
                  value={form.tone}
                  onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value }))}
                  className="rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40"
                >
                  {toneOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* ── Dual image input ── */}
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Image (optional)
                </p>

                {/* Tab switcher */}
                <div className="mb-4 flex gap-2">
                  {["url", "upload"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setImageMode(mode)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                        imageMode === mode
                          ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                          : "border border-white/10 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {mode === "url" ? "Paste URL" : "Upload file"}
                    </button>
                  ))}
                </div>

                {/* URL input */}
                {imageMode === "url" && (
                  <input
                    value={form.image}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, image: e.target.value, publicId: "" }))
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-2xl border border-white/10 bg-[#0a1222] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                  />
                )}

                {/* File upload */}
                {imageMode === "upload" && (
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-emerald-400/30 bg-black/20 px-5 py-7 text-center hover:border-emerald-400/50">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => uploadImage(e.target.files?.[0])}
                    />
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl text-emerald-300">
                      +
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {uploading ? "Uploading to Cloudinary…" : "Click to select image"}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Saved to Cloudinary · public_id stored in DB
                      </p>
                    </div>
                  </label>
                )}

                {/* Preview */}
                {form.image && (
                  <div className="mt-4 overflow-hidden rounded-[18px] border border-white/10">
                    <div className="relative h-[180px] w-full">
                      <Image
                        src={form.image}
                        alt="Preview"
                        fill
                        unoptimized
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-4 py-2">
                      <p className="truncate text-[11px] text-slate-400">{form.image}</p>
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, image: "", publicId: "" }))}
                        className="shrink-0 rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-1 text-[11px] text-red-300 hover:bg-red-500/20"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="h-4 w-4 accent-emerald-400"
                />
                Make this the featured top news card
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={saving || uploading}
                className="rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading
                  ? "Uploading image…"
                  : saving
                  ? "Saving…"
                  : editingId
                  ? "Update News Item"
                  : "Save News Item"}
              </button>
            </div>
          </form>

          {/* ── Feed ── */}
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Current feed
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Saved news items
              </h2>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item._id}
                  className={`overflow-hidden rounded-[24px] border bg-black/20 transition ${
                    editingId === item._id
                      ? "border-emerald-400/40"
                      : "border-white/10"
                  }`}
                >
                  {item.image && (
                    <div className="relative h-44 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        sizes="(max-width: 1280px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                            {item.tag}
                          </span>
                          {item.featured && (
                            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-yellow-200">
                              Featured
                            </span>
                          )}
                          {editingId === item._id && (
                            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                              Editing
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold leading-6 text-white">
                          {item.title}
                        </h3>
                      </div>

                      {/* Action buttons */}
                      <div className="flex shrink-0 flex-col gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            editingId === item._id ? cancelEdit() : startEdit(item)
                          }
                          className={`rounded-xl px-3 py-1.5 text-xs transition ${
                            editingId === item._id
                              ? "border border-slate-500/30 bg-slate-500/10 text-slate-300 hover:bg-slate-500/20"
                              : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                          }`}
                        >
                          {editingId === item._id ? "Cancel" : "Edit"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-100 hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                      {item.body}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>{item.dateLabel}</span>
                      <span>{item.source}</span>
                      <span>{item.tone}</span>
                      {item.image && (
                        <span className="text-emerald-600">has image</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              {items.length === 0 && (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-black/20 p-8 text-center text-slate-500">
                  No news items yet.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}