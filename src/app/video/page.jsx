"use client";

import Navbar from "@/app/components/Navbar";

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-[#03070f] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:px-8 md:pb-14 md:pt-28">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#23e07b] md:text-[0.72rem]">
              Animated Video
            </p>
            <h1 className="font-['Playfair_Display'] text-[clamp(1.8rem,4vw,3.8rem)] font-black leading-tight text-white">
              Inside EduCafe in <em className="text-[#23e07b]">motion</em>
            </h1>
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-[#23e07b]/30 bg-[#050b16] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <video
            src="/videos/educafe.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
