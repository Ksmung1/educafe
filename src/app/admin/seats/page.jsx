"use client";

import { useEffect, useMemo, useState } from "react";
import { seatLayout } from "@/data/seatLayout";

function getSeatClasses(status, selected) {
  const base = "relative flex h-12 w-12 flex-col items-center justify-center rounded-[10px] border text-[0.68rem] font-semibold transition";
  const stateClass = {
    available: "border-[#23e07b]/45 bg-[#0b1220] text-[#d8e8f8]",
    reserved: "border-[#8f6a20]/40 bg-[linear-gradient(180deg,rgba(35,30,12,0.98),rgba(19,15,8,0.98))] text-[#f8e6b5]",
    shifting: "border-[#2d5a8c]/50 bg-[linear-gradient(180deg,rgba(9,23,40,0.98),rgba(8,15,26,0.98))] text-[#8dbaf0]",
  }[status];

  return `${base} ${stateClass} ${selected ? "ring-2 ring-[#23e07b]" : ""}`;
}

export default function AdminSeatsPage() {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState(1);
  const [form, setForm] = useState({ state: "available", name: "", exam: "", shift: "" });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/seats", { cache: "no-store" });
        const data = await res.json();
        setSeats(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const seatMap = useMemo(
    () => new Map(seats.map((seat) => [Number(seat.seatNumber), seat])),
    [seats]
  );

  const selectedSeat = seatMap.get(selectedSeatNumber) || {
    seatNumber: selectedSeatNumber,
    state: "available",
    name: "",
    exam: "",
    shift: "",
  };

  useEffect(() => {
    setForm({
      state: selectedSeat.state || "available",
      name: selectedSeat.name || "",
      exam: selectedSeat.exam || "",
      shift: selectedSeat.shift || "",
    });
  }, [selectedSeatNumber, selectedSeat.state, selectedSeat.name, selectedSeat.exam, selectedSeat.shift]);

  const SeatBtn = ({ num }) => {
    const seat = seatMap.get(num) || { state: "available" };
    return (
      <button
        type="button"
        className={getSeatClasses(seat.state, selectedSeatNumber === num)}
        onClick={() => setSelectedSeatNumber(num)}
      >
        {seat.state === "available" ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#23e07b]" />
        ) : seat.state === "reserved" ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#f2b93b]" />
        ) : seat.state === "shifting" ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#4e9cff]" />
        ) : null}
        <span>{num}</span>
      </button>
    );
  };

  const saveSeat = async () => {
    setSaving(true);
    try {
      const payload = {
        seatNumber: selectedSeatNumber,
        state: form.state,
        name: form.name,
        exam: form.exam,
        shift: form.shift,
      };

      const res = await fetch("/api/seats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const saved = await res.json();
      if (!res.ok) {
        throw new Error(saved.error || "Failed to save seat");
      }

      setSeats((current) => {
        const rest = current.filter((seat) => Number(seat.seatNumber) !== selectedSeatNumber);
        return [...rest, saved].sort((a, b) => a.seatNumber - b.seatNumber);
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05080f] px-4 py-6 text-[#d8e8f8] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#23e07b]">Admin Seats</div>
          <h1 className="font-['Playfair_Display'] text-[clamp(2rem,4vw,3rem)] font-black">Manage live seat states</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#a8bdd8]">
            Click a seat, update its real state and occupant details, then save. The home page will use this data directly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,13,26,0.98),rgba(6,10,18,0.98))] p-4 md:p-6">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-[#a8bdd8]">Loading seats...</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="w-max min-w-full">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-[#a8bdd8]">
                    <span className="h-2 w-2 rounded-full bg-[#23e07b]" />
                    Live arrangement
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-1">
                      <button type="button" className="flex h-12 w-14 flex-col items-center justify-center rounded-[10px] border border-white/10 bg-white/5 text-[0.55rem] uppercase tracking-[0.08em] text-[#d8e8f8]">
                        <span className="text-xs">Door</span>
                      </button>
                      {seatLayout.find((row) => row.rowId === "top").seats.map((num) => <SeatBtn key={num} num={num} />)}
                    </div>

                    <div className="flex items-start justify-center gap-2">
                      <div className="flex flex-col gap-1">
                        {[43, 42, 41, 40].map((num) => <SeatBtn key={num} num={num} />)}
                      </div>
                      <div className="flex flex-col gap-3">
                        {["mid-1", "mid-2"].map((rowId, index) => (
                          <div key={rowId} className={`flex items-center justify-center gap-1 ${index === 1 ? "mt-3" : ""}`}>
                            {seatLayout.find((row) => row.rowId === rowId).seats.map((num) => <SeatBtn key={num} num={num} />)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                      {seatLayout.find((row) => row.rowId === "bottom").seats.map((num) => <SeatBtn key={num} num={num} />)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          <aside className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 md:p-6">
            <div className="mb-4 text-sm uppercase tracking-[0.12em] text-[#7890a8]">Seat #{String(selectedSeatNumber).padStart(2, "0")}</div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-[#a8bdd8]">State</span>
                <select
                  value={form.state}
                  onChange={(event) => setForm((current) => ({ ...current, state: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3 text-sm text-white outline-none"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="shifting">Shifting</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#a8bdd8]">Person name</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Student name"
                  className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3 text-sm text-white outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#a8bdd8]">Exam</span>
                <input
                  value={form.exam}
                  onChange={(event) => setForm((current) => ({ ...current, exam: event.target.value }))}
                  placeholder="Can be empty"
                  className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3 text-sm text-white outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-[#a8bdd8]">Shift note</span>
                <input
                  value={form.shift}
                  onChange={(event) => setForm((current) => ({ ...current, shift: event.target.value }))}
                  placeholder="Optional, used for shifting seats"
                  className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3 text-sm text-white outline-none"
                />
              </label>

              <button
                type="button"
                onClick={saveSeat}
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#1db56a,#14a05e)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save seat"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
