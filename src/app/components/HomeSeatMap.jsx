"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { seatLayout } from "@/data/seatLayout";
import { seatNumbers } from "@/data/seatNumbers";
import {
  buildStudySquadSvg,
  getStudySquadCharacter,
  studySquadByGender,
  studySquadCharacters,
} from "@/data/studySquad";

function getSeatRecord(seatMap, seatNumber) {
  return seatMap[seatNumber] || {
    seatNumber,
    state: "available",
    name: "",
    gender: "",
    avatarId: null,
    exam: "",
    shift: "",
  };
}

function getSeatClasses(status) {
  const base = "relative flex h-10 w-10 items-center justify-center overflow-visible rounded-[8px] border px-0.5 pb-0.5 pt-0 transition-transform duration-200 hover:-translate-y-0.5 sm:h-12 sm:w-12";
  return {
    available: `${base} border-white bg-gray-400 text-[#04110a] hover:border-[#13ad51] hover:bg-white`,
    reserved: `${base} border-[#2f7dff] bg-[#2f7dff] text-white`,
    shifting: `${base} border-[#f2b93b] bg-[#f2b93b] text-[#241500]`,
  }[status];
}

function getStableSeatHash(seat) {
  const source = `${seat.name || ""}|${seat.gender || ""}|${seat.exam || ""}|${seat.shift || ""}`;
  let hash = 0;

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }

  return (Number(seat.seatNumber) * 131 + hash) >>> 0;
}

function StudySquadAvatar({ character, large = false, active = false }) {
  const wrapperClass = large ? "h-14 w-14 sm:h-16 sm:w-16" : "h-6 w-6 sm:h-7 sm:w-7";

  return (
    <div
      className={`relative ${wrapperClass} shrink-0 ${active ? "animate-[squadBounce_0.9s_ease-out_1]" : ""}`}
      style={{ animationDelay: `${(character.id % 8) * 0.08}s` }}
      dangerouslySetInnerHTML={{ __html: buildStudySquadSvg(character) }}
    />
  );
}

export default function HomeSeatMap({ seats }) {
  const [selected, setSelected] = useState(null);
  const [viewTick, setViewTick] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [activeDialogue, setActiveDialogue] = useState(null);
  const sectionRef = useRef(null);

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

  const occupiedCharacterMap = useMemo(() => {
    const occupiedSeats = seatNumbers
      .filter((seatNumber) => getSeatRecord(seatMap, seatNumber).state !== "available")
      .sort((a, b) => a - b);

    const charactersById = new Map(studySquadCharacters.map((character) => [Number(character.id), character]));
    const explicitCharacterIds = new Set();
    const explicitPairs = [];
    const maleSeats = [];
    const femaleSeats = [];
    const untypedSeats = [];

    occupiedSeats.forEach((seatNumber) => {
      const seat = getSeatRecord(seatMap, seatNumber);
        const hasExplicitAvatarId =
          seat.avatarId !== null &&
          seat.avatarId !== undefined &&
          seat.avatarId !== "" &&
          Number.isFinite(Number(seat.avatarId)) &&
          Number(seat.avatarId) > 0;
      const explicitAvatarId = hasExplicitAvatarId ? Number(seat.avatarId) : null;

      if (explicitAvatarId !== null && charactersById.has(explicitAvatarId)) {
        explicitCharacterIds.add(explicitAvatarId);
        explicitPairs.push([seatNumber, charactersById.get(explicitAvatarId)]);
        return;
      }

      const item = { seatNumber, seat, hash: getStableSeatHash(seat) };

      if (seat.gender === "male") {
        maleSeats.push(item);
        return;
      }

      if (seat.gender === "female") {
        femaleSeats.push(item);
        return;
      }

      untypedSeats.push(item);
    });

    const allocatePool = (items, pool) => {
      if (!items.length || !pool.length) return [];

      const filteredPool = pool.filter((character) => !explicitCharacterIds.has(Number(character.id)));
      const usablePool = filteredPool.length ? filteredPool : pool;
      const orderedItems = [...items].sort((a, b) => a.hash - b.hash || a.seatNumber - b.seatNumber);
      const rotation = orderedItems[0].hash % usablePool.length;
      const rotatedPool = usablePool.map((_, index) => usablePool[(rotation + index) % usablePool.length]);

      return orderedItems.map((item, index) => [
        item.seatNumber,
        rotatedPool[index % rotatedPool.length],
      ]);
    };

    return new Map([
      ...explicitPairs,
      ...allocatePool(maleSeats, studySquadByGender.male),
      ...allocatePool(femaleSeats, studySquadByGender.female),
      ...allocatePool(untypedSeats, studySquadCharacters),
    ]);
  }, [seatMap]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible) {
          wasVisible = true;
          setSectionVisible(true);
          setViewTick((current) => current + 1);
        } else if (!entry.isIntersecting) {
          wasVisible = false;
          setSectionVisible(false);
          setActiveDialogue(null);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionVisible || occupiedCharacterMap.size === 0) {
      return undefined;
    }

    let speakTimeout;
    let clearTimeoutId;
    let cancelled = false;

    const occupiedSeatNumbers = Array.from(occupiedCharacterMap.keys());

    const queueNextDialogue = () => {
      if (cancelled || occupiedSeatNumbers.length === 0) return;

      const delay = 2600 + Math.floor(Math.random() * 2600);
      speakTimeout = window.setTimeout(() => {
        if (cancelled) return;

        const seatNumber =
          occupiedSeatNumbers[Math.floor(Math.random() * occupiedSeatNumbers.length)];
        const character = occupiedCharacterMap.get(seatNumber);
        const quote = character?.says?.length
          ? character.says[Math.floor(Math.random() * character.says.length)]
          : "";

        if (!quote) {
          queueNextDialogue();
          return;
        }

        setActiveDialogue({ seatNumber, text: quote });

        clearTimeoutId = window.setTimeout(() => {
          setActiveDialogue(null);
          queueNextDialogue();
        }, 3200);
      }, delay);
    };

    queueNextDialogue();

    return () => {
      cancelled = true;
      if (speakTimeout) window.clearTimeout(speakTimeout);
      if (clearTimeoutId) window.clearTimeout(clearTimeoutId);
    };
  }, [occupiedCharacterMap, sectionVisible]);

  const renderSeatButton = (num) => {
    const seat = getSeatRecord(seatMap, num);
    const character = occupiedCharacterMap.get(num);
    const isSpeaking = activeDialogue?.seatNumber === num;

    return (
      <button
        key={num}
        type="button"
        className={`${getSeatClasses(seat.state)} group ${isSpeaking ? "!z-20" : ""}`}
        onClick={() => setSelected({ num, ...seat })}
      >
        {isSpeaking ? (
          <div className="pointer-events-none absolute bottom-[calc(100%+0.45rem)] left-1/2 z-30 w-[130px] -translate-x-1/2 rounded-[12px] bg-white px-2.5 py-2 text-left text-[0.48rem] font-semibold leading-4 text-[#1a1a2e] shadow-[0_10px_28px_rgba(0,0,0,0.35)] sm:w-[160px] sm:text-[0.54rem] sm:leading-4">
            {activeDialogue.text}
            <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-white" />
          </div>
        ) : null}
        {character ? (
          <div
            key={`${character.id}-${viewTick}`}
            className={`pointer-events-none absolute inset-0 flex items-center justify-center animate-[squadFloat_3.2s_ease-in-out_infinite] transition-transform duration-200 group-hover:scale-105 ${isSpeaking ? "scale-110" : ""}`}
            style={{ animationDelay: `${(character.id % 10) * 0.18}s` }}
          >
            <StudySquadAvatar character={character} active={viewTick > 0} />
          </div>
        ) : null}
        <div className={`absolute bottom-0.5 right-0.5 flex items-center justify-center rounded-full bg-black/45 font-bold leading-none text-white sm:bottom-1 sm:right-1 ${character ? "h-3.5 w-3.5 text-[0.35rem] sm:h-4.5 sm:w-4.5 sm:text-[0.45rem]" : "h-4 w-4 text-[0.42rem] sm:h-5 sm:w-5 sm:text-[0.52rem]"}`}>
          {num}
        </div>
      </button>
    );
  };

  const selectedCharacter =
    selected && selected.type !== "teacher"
      ? occupiedCharacterMap.get(selected.num) || getStudySquadCharacter(selected.num)
      : null;

  const selectedQuote = selectedCharacter
    ? selectedCharacter.says[(selected.num + viewTick) % selectedCharacter.says.length]
    : "";

  return (
    <div ref={sectionRef} className="seats-wrap !bg-black" id="seats">
      <style jsx>{`
        @keyframes squadFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes squadBounce {
          0% { transform: translateY(6px) scale(0.92); opacity: 0.7; }
          55% { transform: translateY(-3px) scale(1.04); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-6 md:!px-10 md:!py-20">
        <div className="seats-header rv !mb-0 !flex !flex-col !items-start !justify-between !gap-4 lg:!flex-row lg:!items-end">
          <div>
            <div className="sec-eyebrow !mb-0 !text-[0.5rem] !font-bold !uppercase !tracking-[0.14em] md:!text-[0.62rem]">Live Floor Plan</div>
            <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">Reserve <em>your seat.</em></h2>
            <p className="sec-desc !max-w-[420px] !text-[0.45rem] !leading-6 !text-[#a8bdd8] md:!text-[0.92rem] md:!leading-7">Click any seat to see its status. Green seats are open - tap one to claim your spot via WhatsApp instantly.</p>
          </div>
          <div className="seats-legend !grid !grid-cols-3 !gap-1.5 sm:!grid-cols-3">
            {[{ cls: "!bg-[#4e9cff]", l: "Reserved" }, { cls: "!bg-[#f2b93b]", l: "Non-Reserved" },{ cls: "!bg-gray-400", l: "Available" }].map(({ cls, l }) => (
              <div key={l} className="!flex !items-center !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1.5 !text-[0.52rem] !text-[#a8bdd8] md:!text-[0.72rem]">
                <div className={`!h-5 !w-5 !rounded-full ${cls}`} />{l}
              </div>
            ))}
          </div>
        </div>

        <div className="rv !-mx-3 !overflow-x-auto md:!mx-0">
          <div className="!w-max !min-w-full !px-3 md:!px-0">
            <div className="!relative !overflow-hidden !rounded-[16px] !border !border-white/10 !bg-black !p-3 md:!rounded-[28px] md:!p-6">
              <div className="!pointer-events-none !absolute !inset-x-0 !top-0 !h-px !bg-[linear-gradient(90deg,transparent,rgba(35,224,123,0.6),transparent)]" />
              <div className="!mb-2 !inline-flex !items-center !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1 !text-[0.48rem] !font-semibold !uppercase !text-[#a8bdd8] md:!text-[0.62rem]">
                <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#23e07b]" />Live • 43 Seats
              </div>
              <div className="!mb-3 !text-[0.55rem] !font-semibold !uppercase !tracking-[0.1em] !text-[#7890a8] md:!text-[0.78rem]">EduCafe Study Hall</div>

              <div className="room-layout">
                <div className="!flex !flex-nowrap !items-center !justify-center !gap-0.5 md:!gap-1">
                  <button type="button" className="!flex !h-10 !w-12 !flex-col !items-center !justify-center !gap-0.5 !rounded-[8px] !border !border-white/20 !bg-white/10 sm:!h-14 sm:!w-16" onClick={() => setSelected({ type: "teacher" })}>
                    <span className="!text-xs sm:!text-base">Door</span>
                    <span className="!text-[0.38rem] sm:!text-[0.48rem]">Entry</span>
                  </button>
                  <div
                    aria-hidden="true"
                    className="!h-10 !w-10 !shrink-0 sm:!h-14 sm:!w-12"
                  />
                  {seatLayout.find((row) => row.rowId === "top").seats.map((num) => renderSeatButton(num))}
                </div>

                <div className="!mt-2 !flex !items-start !justify-center !gap-1.5 md:!mt-4 md:!gap-4">
                  <div className="!flex !flex-col !gap-0.5 md:!gap-1">
                    {renderSeatButton(43)}
                    {[42, 41, 40].map((num) => <div key={num} className="!flex !flex-col !gap-0.5 md:!gap-1">{renderSeatButton(num)}</div>)}
                  </div>
                  <div
                    aria-hidden="true"
                    className="!h-[10.5rem] !w-10 !shrink-0 sm:!w-12 md:!h-[12.75rem]"
                  />
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


      </div>

      {selected ? (
        <div className="!fixed !inset-0 !z-[1000] !grid !place-items-center !bg-black/70 !p-3" onClick={() => setSelected(null)}>
          <div className="!w-full !max-w-[420px] !rounded-[18px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(9,14,26,0.98),rgba(5,8,15,0.98))] !p-4 md:!rounded-[24px] md:!p-6" onClick={(event) => event.stopPropagation()}>
            <button className="!float-right !grid !h-7 !w-7 !place-items-center !rounded-full !border !border-white/10 !bg-white/5 !text-sm !text-white" onClick={() => setSelected(null)} type="button">×</button>
            <div className="!mb-2 !text-[0.82rem] !font-bold !text-white md:!text-[1rem]">
              {selected.type === "teacher" ? "Instructor Position" : `Seat #${String(selected.num).padStart(2, "0")}`}
            </div>

            {selected.type === "teacher" ? (
              <>
                <span className="!inline-flex !rounded-full !border !border-[#4e9cff]/20 !bg-[#0f1b2c] !px-3 !py-1 !text-[0.58rem] !font-semibold !uppercase !text-[#8dbaf0]">Instructor Desk</span>
                <p className="!mt-3 !text-[0.62rem] !leading-6 !text-[#a8bdd8]">The instructor monitors study sessions, answers queries, and maintains the focused environment.</p>
              </>
            ) : selected.state === "reserved" || selected.state === "shifting" ? (
              <>
                <span className={`!inline-flex !rounded-full !border !px-3 !py-1 !text-[0.58rem] !font-semibold !uppercase ${
                  selected.state === "reserved"
                    ? "!border-[#2f7dff]/20 !bg-[#112a46] !text-[#d6e6ff]"
                    : "!border-[#f2b93b]/20 !bg-[#5a4314] !text-[#fff0c7]"
                }`}>
                  {selected.state === "reserved" ? "Reserved" : "Non-Reserved"}
                </span>
                <div className="!mt-3 !flex !items-center !gap-3">
                  <div className={`!grid !h-16 !w-16 !place-items-center !rounded-full ${selected.state === "reserved" ? "!bg-[#17365a]" : "!bg-[#70531a]"}`}>
                    {selectedCharacter ? <StudySquadAvatar character={selectedCharacter} large active={viewTick > 0} /> : null}
                  </div>
                  <div>
                    <div className="!flex !items-center !gap-2">
                      {selectedCharacter ? <span className="!text-base">{selectedCharacter.emoji}</span> : null}
                      <div className="!text-[0.72rem] !font-bold !text-white">{selected.name || selectedCharacter?.name || "Occupied seat"}</div>
                    </div>
                    <div className="!text-[0.58rem] !text-[#a8bdd8]">{selected.exam || selectedCharacter?.label || "Exam not set"}</div>
                  </div>
                </div>
                {selectedCharacter ? (
                  <div className="!mt-3 !rounded-[14px] !bg-white !px-3 !py-2 !text-[0.62rem] !font-semibold !leading-5 !text-[#1a1a2e]">
                    “{selectedQuote}”
                  </div>
                ) : null}
                <div className="!mt-3 !grid !grid-cols-2 !gap-2">
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Shift</div><div className="!text-[0.65rem] !font-semibold !text-white">{selected.shift || (selected.state === "reserved" ? "Full Day" : "Partial hours")}</div></div>
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Status</div><div className={`!text-[0.65rem] !font-semibold ${selected.state === "reserved" ? "!text-[#8dbaf0]" : "!text-[#ffe08c]"}`}>Active</div></div>
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
