"use client";

import { useEffect, useState } from "react";

export default function AdminAchievers() {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    gender: "male",
    exam: "",
    year: "",
    image: "",
  });

  const loadAchievers = async () => {
    const res = await fetch("/api/achievers");
    setAchievers(await res.json());
  };

  useEffect(() => {
    loadAchievers();
  }, []);

  // 🔥 Upload to Cloudinary
  const uploadImage = async (file) => {
    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    setForm((f) => ({ ...f, image: json.secure_url }));
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/achievers", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editingId }),
    });

    setForm({
      name: "",
      gender: "male",
      exam: "",
      year: "",
      image: "",
    });
    setEditingId(null);
    loadAchievers();
  };

  const editAchiever = (a) => {
    setForm(a);
    setEditingId(a._id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin · Achievers</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 shadow rounded"
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
          required
        />

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="border p-2"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          placeholder="Exam"
          value={form.exam}
          onChange={(e) => setForm({ ...form, exam: e.target.value })}
          className="border p-2"
          required
        />

        <input
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="border p-2"
          required
        />

        {/* IMAGE UPLOAD */}
        <div
          className="
    col-span-full
    border-2 border-dashed rounded-md p-4 text-center
    hover:bg-[#16424a] transition
    relative
  "
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith("image/")) {
              uploadImage(file);
            }
          }}
          onPaste={(e) => {
            const item = e.clipboardData.items[0];
            if (item && item.type.startsWith("image/")) {
              uploadImage(item.getAsFile());
            }
          }}
        >
          <p className="text-sm text-gray-600">
            Drag & drop image here, paste (Ctrl+V), or click to upload
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          {loading && (
            <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
          )}

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="mx-auto mt-3 w-24 h-24 rounded-full object-cover border"
            />
          )}
        </div>

        <button
          disabled={!form.image}
          type="submit"
          className="bg-[#16424a] text-white py-2 col-span-full disabled:opacity-50"
        >
          {editingId ? "Update Achiever" : "Add Achiever"}
        </button>
      </form>

      {/* LIST */}
      <div className="mt-8 space-y-3">
        {achievers.map((a) => (
          <div
            key={a._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              <img
                src={a.image}
                className="w-10 h-10 rounded-full object-cover"
                alt={a.name}
              />
              <div>
                <p className="font-semibold">
                  {a.gender === "male"
                    ? "Mr."
                    : a.gender === "femail"
                    ? "Ms."
                    : "Dr."}{" "}
                  {a.name}
                </p>
                <p className="text-sm text-gray-600">
                  {a.exam} · {a.year}
                </p>
              </div>
            </div>

            <button
              onClick={() => editAchiever(a)}
              className="text-blue-600 text-sm"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
