"use client";

import { useMemo, useState } from "react";
import { seatLayout } from "@/data/seatLayout";
import { seatNumbers } from "@/data/seatNumbers";

function getSeatRecord(seatMap, seatNumber) {
  return seatMap[seatNumber] || {
    seatNumber,
    state: "available",
    name: "",
    exam: "",
    shift: "",
  };
}

function getSeatClasses(status) {
  const base = "relative flex h-10 w-10 flex-col items-center justify-center rounded-[8px] border transition-transform duration-200 hover:-translate-y-0.5 sm:h-12 sm:w-12";
  return {
    available: `${base} border-[#23e07b]/45 bg-[#0b1220] text-[#d8e8f8] hover:border-[#23e07b] hover:bg-[#10213a]`,
    reserved: `${base} border-[#8f6a20]/40 bg-[linear-gradient(180deg,rgba(35,30,12,0.98),rgba(19,15,8,0.98))] text-[#f8e6b5]`,
    shifting: `${base} border-[#2d5a8c]/50 bg-[linear-gradient(180deg,rgba(9,23,40,0.98),rgba(8,15,26,0.98))] text-[#8dbaf0]`,
  }[status];
}

export default function HomeSeatMap({ seats }) {
  const [selected, setSelected] = useState(null);
  const seatMap = useMemo(
    () => Object.fromEntries((seats || []).map((seat) => [Number(seat.seatNumber), seat])),
    [seats]
  );

  const counts = useMemo(() => {
    return seatNumbers.reduce(
      (acc, seatNumber) => {
        const state = getSeatRecord(seatMap, seatNumber).state;
        acc[state] += 1;
        return acc;
      },
      { available: 0, reserved: 0, shifting: 0 }
    );
  }, [seatMap]);

  const renderSeatButton = (num) => {
    const seat = getSeatRecord(seatMap, num);
    return (
      <button key={num} type="button" className={getSeatClasses(seat.state)} onClick={() => setSelected({ num, ...seat })}>
        {seat.state === "available" ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#23e07b] shadow-[0_0_0_2px_rgba(35,224,123,0.18)]" />
        ) : seat.state === "reserved" ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#f2b93b] shadow-[0_0_0_2px_rgba(242,185,59,0.18)]" />
        ) : seat.state === "shifting" ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#4e9cff] shadow-[0_0_0_2px_rgba(78,156,255,0.18)]" />
        ) : null}
        <div className="text-[0.45rem] font-bold sm:text-[0.58rem]">{num}</div>
      </button>
    );
  };

  return (
    <div className="seats-wrap !bg-[#080d1c]" id="seats">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-12 md:!px-10 md:!py-20">
        <div className="seats-header rv !mb-5 !flex !flex-col !items-start !justify-between !gap-4 lg:!flex-row lg:!items-end">
          <div>
            <div className="sec-eyebrow !mb-2 !text-[0.5rem] !font-bold !uppercase !tracking-[0.14em] md:!text-[0.62rem]">Live Floor Plan</div>
            <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">Reserve <em>your seat.</em></h2>
            <p className="sec-desc !max-w-[420px] !text-[0.65rem] !leading-6 !text-[#a8bdd8] md:!text-[0.92rem] md:!leading-7">Click any seat to see its status. Green seats are open - tap one to claim your spot via WhatsApp instantly.</p>
          </div>
          <div className="seats-legend !grid !grid-cols-2 !gap-1.5 sm:!grid-cols-4">
            {[{ cls: "!bg-[#23e07b]", l: "Available" }, { cls: "!bg-[#f2b93b]", l: "Reserved" }, { cls: "!bg-[#4e9cff]", l: "Shifting" }, { cls: "!bg-white", l: "Instructor" }].map(({ cls, l }) => (
              <div key={l} className="!flex !items-center !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1.5 !text-[0.52rem] !text-[#a8bdd8] md:!text-[0.72rem]">
                <div className={`!h-2 !w-2 !rounded-full ${cls}`} />{l}
              </div>
            ))}
          </div>
        </div>

        <div className="rv !-mx-3 !overflow-x-auto md:!mx-0">
          <div className="!w-max !min-w-full !px-3 md:!px-0">
            <div className="!relative !overflow-hidden !rounded-[16px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(8,13,26,0.98),rgba(6,10,18,0.98))] !p-3 md:!rounded-[28px] md:!p-6">
              <div className="!pointer-events-none !absolute !inset-x-0 !top-0 !h-px !bg-[linear-gradient(90deg,transparent,rgba(35,224,123,0.6),transparent)]" />
              <div className="!mb-2 !inline-flex !items-center !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1 !text-[0.48rem] !font-semibold !uppercase !text-[#a8bdd8] md:!text-[0.62rem]">
                <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#23e07b]" />Live · 43 Seats
              </div>
              <div className="!mb-3 !text-[0.55rem] !font-semibold !uppercase !tracking-[0.1em] !text-[#7890a8] md:!text-[0.78rem]">EduCafe Study Hall</div>

              <div className="room-layout">
                <div className="!flex !flex-nowrap !items-center !justify-center !gap-0.5 md:!gap-1">
                  <button type="button" className="!flex !h-10 !w-12 !flex-col !items-center !justify-center !gap-0.5 !rounded-[8px] !border !border-white/20 !bg-white/10 sm:!h-14 sm:!w-16" onClick={() => setSelected({ type: "teacher" })}>
                    <span className="!text-xs sm:!text-base">Door</span>
                    <span className="!text-[0.38rem] sm:!text-[0.48rem]">Entry</span>
                  </button>
                  {seatLayout.find((row) => row.rowId === "top").seats.map((num) => renderSeatButton(num))}
                </div>

                <div className="!mt-2 !flex !items-start !justify-center !gap-1.5 md:!mt-4 md:!gap-4">
                  <div className="!flex !flex-col !gap-0.5 md:!gap-1">
                    {renderSeatButton(43)}
                    {[42, 41, 40].map((num) => <div key={num} className="!flex !flex-col !gap-0.5 md:!gap-1">{renderSeatButton(num)}</div>)}
                  </div>
                  <div className="!flex !flex-col !gap-0.5 md:!gap-1">
                    <div className="!h-10 sm:!h-14" />
                    {["mid-1", "mid-2"].map((rowId, index) => (
                      <div key={rowId} className={`!flex !flex-nowrap !items-center !justify-center !gap-0.5 md:!gap-1 ${index === 1 ? "!mt-2 md:!mt-4" : ""}`}>
                        {seatLayout.find((row) => row.rowId === rowId).seats.map((num) => renderSeatButton(num))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="!mt-2 !flex !flex-nowrap !items-center !justify-center !gap-0.5 md:!mt-4 md:!gap-1">
                  {seatLayout.find((row) => row.rowId === "bottom").seats.map((num) => renderSeatButton(num))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="seats-stats rv !mt-4 !flex !flex-wrap !items-center !gap-2">
          {[{ n: counts.available, c: "!text-[#23e07b]", l: "Available Now" }, { n: counts.reserved, c: "!text-[#f2b93b]", l: "Reserved" }, { n: counts.shifting, c: "!text-[#4e9cff]", l: "Shifting Slot" }].map(({ n, c, l }) => (
            <div key={l} className="!min-w-[72px] !rounded-[12px] !border !border-white/10 !bg-white/5 !p-2.5 md:!min-w-[120px] md:!rounded-[18px] md:!p-4">
              <div className={`!text-lg !font-black md:!text-2xl ${c}`}>{n}</div>
              <div className="!text-[0.5rem] !text-[#a8bdd8] md:!text-[0.72rem]">{l}</div>
            </div>
          ))}
          <div className="!ml-auto">
            <a href="https://wa.me/919862285344" className="!inline-flex !items-center !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-3 !py-2 !text-[0.58rem] !font-semibold !text-white md:!px-5 md:!py-3 md:!text-[0.8rem]">Reserve on WhatsApp</a>
          </div>
        </div>
      </div>

      {selected ? (
        <div className="!fixed !inset-0 !z-[1000] !grid !place-items-center !bg-black/70 !p-3" onClick={() => setSelected(null)}>
          <div className="!w-full !max-w-[400px] !rounded-[18px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(9,14,26,0.98),rgba(5,8,15,0.98))] !p-4 md:!rounded-[24px] md:!p-6" onClick={(event) => event.stopPropagation()}>
            <button className="!float-right !grid !h-7 !w-7 !place-items-center !rounded-full !border !border-white/10 !bg-white/5 !text-sm !text-white" onClick={() => setSelected(null)} type="button">×</button>
            <div className="!mb-2 !text-[0.82rem] !font-bold !text-white md:!text-[1rem]">
              {selected.type === "teacher" ? "Instructor Position" : `Seat #${String(selected.num).padStart(2, "0")}`}
            </div>

            {selected.type === "teacher" ? (
              <>
                <span className="!inline-flex !rounded-full !border !border-[#4e9cff]/20 !bg-[#0f1b2c] !px-3 !py-1 !text-[0.58rem] !font-semibold !uppercase !text-[#8dbaf0]">Instructor Desk</span>
                <p className="!mt-3 !text-[0.62rem] !leading-6 !text-[#a8bdd8]">The instructor monitors study sessions, answers queries, and maintains the focused environment.</p>
              </>
            ) : selected.state === "reserved" ? (
              <>
                <span className="!inline-flex !rounded-full !border !border-[#f2b93b]/20 !bg-[#241a08] !px-3 !py-1 !text-[0.58rem] !font-semibold !uppercase !text-[#f7e3a0]">Reserved</span>
                <div className="!mt-3 !flex !items-center !gap-3">
                  <div className="!grid !h-10 !w-10 !place-items-center !rounded-full !bg-[#3a2b10] !text-[0.6rem] !font-bold !text-[#f2b93b]">●</div>
                  <div>
                    <div className="!text-[0.72rem] !font-bold !text-white">{selected.name || "Occupied seat"}</div>
                    <div className="!text-[0.58rem] !text-[#a8bdd8]">{selected.exam || "Exam not set"}</div>
                  </div>
                </div>
                <div className="!mt-3 !grid !grid-cols-2 !gap-2">
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Shift</div><div className="!text-[0.65rem] !font-semibold !text-white">{selected.shift || "Full Day"}</div></div>
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Status</div><div className="!text-[0.65rem] !font-semibold !text-[#f2b93b]">Active</div></div>
                </div>
              </>
            ) : selected.state === "shifting" ? (
              <>
                <span className="!inline-flex !rounded-full !border !border-[#4e9cff]/20 !bg-[#0f1b2c] !px-3 !py-1 !text-[0.58rem] !font-semibold !uppercase !text-[#8dbaf0]">Shifting Slot</span>
                <div className="!mt-3 !grid !grid-cols-2 !gap-2">
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Open During</div><div className="!text-[0.65rem] !font-semibold !text-[#5ca8ff]">{selected.shift || "Partial hours"}</div></div>
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Type</div><div className="!text-[0.65rem] !font-semibold !text-white">Shift Seat</div></div>
                </div>
              </>
            ) : (
              <>
                <span className="!inline-flex !rounded-full !border !border-[#23e07b]/20 !bg-[#0f241b] !px-3 !py-1 !text-[0.58rem] !font-semibold !uppercase !text-[#bdf4dc]">Available</span>
                <p className="!mt-3 !text-[0.62rem] !leading-6 !text-[#a8bdd8]">This seat is open and ready for reservation.</p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
