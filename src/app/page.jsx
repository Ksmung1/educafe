"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import heroImage from "@/assets/hero.png";
import educafe1 from "@/assets/educafe1.png";
import educafe2 from "@/assets/educafe2.png";
import educafe3 from "@/assets/educafe3.png";
import educafe4 from "@/assets/educafe4.png";
import educafe5 from "@/assets/educafe5.png";
import educafe6 from "@/assets/educafe6.png";
import educafe7 from "@/assets/educafe7.png";
import educafe8 from "@/assets/educafe8.png";
import educafe9 from "@/assets/educafe9.png";
import educafe10 from "@/assets/educafe10.png";
import educafe21 from "@/assets/educafe21.png";
import { chronologies } from "@/data/chronologies";
import HomeSeatMap from "@/app/components/HomeSeatMap";
import Navbar from "@/app/components/Navbar";

const heroStats = [
  { value: "20+", label: "Active Students" },
  { value: "34+", label: "Exam Tracks" },
  { value: "100%", label: "Focus Guaranteed" },
];

const examChips = [
  { label: "UPSC Civil Services", tone: "upsc" },
  { label: "SBI PO & Clerk", tone: "bank" },
  { label: "NEET UG / PG", tone: "med" },
  { label: "JEE Main & Advanced", tone: "eng" },
  { label: "SSC CGL / CHSL", tone: "ssc" },
  { label: "IBPS RRB / PO", tone: "bank" },
  { label: "RBI Grade B", tone: "ssc" },
  { label: "UPSC NDA & CDS", tone: "upsc" },
  { label: "SEBI Grade A", tone: "eng" },
];

const upcomingExams = [
  { name: "NEET UG 2026", date: "May 3, 2026" },
  { name: "UPSC Prelims", date: "May 24, 2026" },
  { name: "UPSC CDS (I)", date: "May 24, 2026" },
  { name: "UPSC Mains", date: "Aug 21, 2026" },
  { name: "JEE Main Session 2", date: "Completed", past: true },
];

const tickerItems = [
  { text: "NEET UG City Intimation Slip Released", detail: "Download at neet.nta.nic.in" },
  { text: "JEE Main Session 2 Result Expected", detail: "~April 20, 2026" },
  { text: "UPSC CSE 2026", detail: "933 Vacancies Notified" },
  { text: "NEET UG Exam", detail: "May 3, 2026 | 2 PM-5 PM" },
  { text: "UPSC Prelims", detail: "May 24, 2026" },
  { text: "UPSC Mains", detail: "Aug 21, 2026" },
  { text: "AIIMS NORCET 10 Result", detail: "14,500+ qualify Stage 2" },
];

const galleryImages = [
  { src: educafe1, label: "Main hall" },
  { src: educafe2, label: "Study area" },
  { src: educafe3, label: "Cabin zone" },
  { src: educafe4, label: "Reading corner" },
  { src: educafe5, label: "Quiet pods" },
  { src: educafe6, label: "Desk line" },
  { src: educafe7, label: "Focus wall" },
  { src: educafe8, label: "Window side" },
  { src: educafe9, label: "Front view" },
  { src: educafe10, label: "Night study" },
];

const newsCards = [
  {
    tag: "Action Required", tone: "alert", date: "April 12, 2026",
    title: "NEET UG 2026 City Intimation Slips Released - Download Now Before Admit Card",
    body: "NTA released exam city slips for over 26 lakh candidates registered for NEET UG 2026 on April 12. Candidates must log in at neet.nta.nic.in using their application number and date of birth to check their allotted city. The admit card with the exact exam centre is expected in the last week of April. The exam is on May 3, 2026 - from 2:00 PM to 5:00 PM in a single shift across 552 cities in India and 14 cities abroad.",
    source: "NTA Official", featured: true, image: educafe21,
  },
  {
    tag: "Result Update", tone: "result", date: "Expected ~April 20, 2026",
    title: "JEE Main Session 2 Result Expected April 20",
    body: "Session 2 was conducted April 2-8, 2026. The provisional answer key has been released for challenge. Final scores expected by April 20. Best-of-two sessions rule applies for AIR.",
    source: "jeemain.nta.nic.in",
  },
  {
    tag: "Notification", tone: "exam", date: "February 4, 2026",
    title: "UPSC CSE 2026 Out - 933 Vacancies for IAS, IPS, IFS",
    body: "UPSC released the Civil Services Examination 2026 notification for 933 vacancies. Last date to apply was February 24. Prelims on May 24 - last chance for many age-limit candidates.",
    source: "upsc.gov.in",
  },
  {
    tag: "Result", tone: "result", date: "April 2026",
    title: "AIIMS NORCET 10 - 14,500+ Candidates Qualify for Stage 2",
    body: "AIIMS announced Stage 2 qualifiers for the NORCET Nursing Officer Recruitment Test. Candidates can check their status at aiimsexams.ac.in.",
    source: "AIIMS Official",
  },
  {
    tag: "Admit Card", tone: "admit", date: "Expected late April 2026",
    title: "NEET UG 2026 Admit Card - Expected by April 29",
    body: "After the city slip release, the NEET UG 2026 Hall Ticket is expected to be activated by April 29 at neet.nta.nic.in. Candidates need application number + DOB to download.",
    source: "NTA Official",
  },
  {
    tag: "Recruitment", tone: "gen", date: "April 2026",
    title: "SSC Selection Post Phase 14 - 3,003 Posts Notified",
    body: "SSC released Phase 14 notification for 3,003 posts across various departments. Applications open on the official SSC portal. Eligibility: 10th pass to Graduation depending on post.",
    source: "ssc.gov.in",
  },
];

const whyChoose = [
  { icon: "🎯", title: "Silence by design", text: "No distractions, no noise. Our study zones are built for sustained deep focus - the kind that moves you forward." },
  { icon: "📅", title: "Always-current exam intel", text: "We track every notification - dates, vacancies, syllabus changes - so you don&apos;t have to hunt for information." },
  { icon: "🤝", title: "Community of serious aspirants", text: "Being around people who are genuinely working hard is the best motivation you&apos;ll find. That&apos;s the EduCafe effect." },
  { icon: "📚", title: "Every stream, one roof", text: "UPSC. Banking. Medical. Engineering. SSC. It doesn&apos;t matter which path you&apos;re on - we have space for you here." },
];

const seatData = {};

function getSeatRecord(seatMap, num) {
  return seatMap[num] || { seatNumber: num, state: "available", name: "", exam: "", shift: "" };
}

function getSeatStatus(seatMap, num) {
  return getSeatRecord(seatMap, num).state;
}

function getSeatClasses(status) {
  const base = "relative flex h-10 w-8 flex-col items-center justify-center rounded-[8px] border transition-transform duration-200 hover:-translate-y-0.5 sm:h-12 sm:w-9";
  return {
    available: `${base} border-[#1c2b49] bg-[#0b1220] text-[#d8e8f8] hover:border-[#23e07b]/60 hover:bg-[#10213a]`,
    reserved:  `${base} border-[#8f6a20]/40 bg-[linear-gradient(180deg,rgba(35,30,12,0.98),rgba(19,15,8,0.98))] text-[#f8e6b5]`,
    shifting:  `${base} border-[#2d5a8c]/50 bg-[linear-gradient(180deg,rgba(9,23,40,0.98),rgba(8,15,26,0.98))] text-[#8dbaf0]`,
  }[status];
}

function ratioGroup(aspectRatio) {
  if (aspectRatio >= 1.35) return "wide";
  if (aspectRatio <= 0.8) return "tall";
  return "balanced";
}


// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero !mx-auto !grid !w-full !max-w-[1200px] !grid-cols-1 !items-center !gap-6 !px-3 !pt-20 md:!grid-cols-[1.05fr_0.95fr] md:!px-10 md:!pt-28">
      <div className="hero-left rv !p-0">
        <div className="tag !inline-flex !items-center !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1.5 !text-[0.55rem] !font-semibold !tracking-[0.1em] !text-[#a8bdd8]">
          <span className="tag-pulse" />Dedicated Study Hub
        </div>
        <h1 className="hero-heading !mb-4 !font-['Playfair_Display'] !text-[clamp(1.9rem,6vw,4.8rem)] !font-black !leading-[1.05] !tracking-[-0.02em] !text-[#d8e8f8]">
          Your exam.<br />Your timeline.<br /><em>Our space.</em>
        </h1>
        <p className="hero-body !mb-5 !max-w-[460px] !text-[0.72rem] !font-light !leading-[1.8] !text-[#a8bdd8] md:!text-[1rem]">
          Most students don&apos;t fail because they lack talent -<br />
          they fail because they lack the right environment.<br />
          At EduCafe, we fix that. For <strong>UPSC, NEET, JEE, SSC, Banking</strong> and beyond - your preparation starts here.
        </p>
        <div className="btn-set !flex !flex-wrap !gap-2">
          <a href="#exams" className="btn-primary !inline-flex !items-center !gap-1.5 !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-3.5 !py-2 !text-[0.65rem] !font-semibold !text-white !shadow-[0_8px_28px_rgba(29,181,106,0.28)] md:!px-5 md:!py-3 md:!text-[0.82rem]">
            <span>📅</span>2026 Exam Dates
          </a>
          <a href="#contact" className="btn-outline !inline-flex !items-center !rounded-full !border !border-white/10 !px-3.5 !py-2 !text-[0.65rem] !font-medium !text-[#a8bdd8] md:!px-5 md:!py-3 md:!text-[0.82rem]">
            Talk to Us
          </a>
        </div>
        <div className="hero-proof !mt-5 !flex !gap-5 !border-t !border-white/10 !pt-5 md:!gap-8 md:!mt-10 md:!pt-8">
          {heroStats.map((item) => (
            <div key={item.label}>
              <div className="proof-num !font-['Playfair_Display'] !text-[1.3rem] !font-black !leading-none !text-white md:!text-[2rem]">{item.value}</div>
              <div className="proof-lbl !mt-1 !text-[0.52rem] !font-medium !text-[#7890a8] md:!text-[0.68rem]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right rv rv-delay-1 !relative !min-h-[360px] !overflow-hidden !rounded-[18px] !border !border-white/10 !bg-[rgba(255,255,255,0.03)] !p-4 md:!min-h-[520px] md:!rounded-[28px] md:!p-6">
        <div className="hero-right-glow !absolute !inset-0 !bg-[radial-gradient(circle_at_top,rgba(29,181,106,0.18),transparent_55%)]" />
        <div className="hero-watermark pointer-events-none !absolute !right-0 !top-4 !select-none !text-[clamp(2.5rem,10vw,7rem)] !font-black !tracking-[0.18em] !text-white/5">CAFÉ</div>
        <div className="panel-eyebrow !relative !z-10 !mb-2 !text-[0.52rem] !font-bold !uppercase !tracking-[0.12em] !text-[#1db56a] md:!text-[0.62rem]">We prepare you for</div>
        <div className="panel-title !relative !z-10 !mb-3 !font-['Playfair_Display'] !text-[1rem] !font-black !leading-tight !text-white md:!text-[1.55rem]">
          Every exam that<br />matters in India
        </div>
        <div className="exam-chips-grid !relative !z-10 !mb-4 !flex !flex-wrap !gap-1">
          {examChips.map((chip) => (
            <span key={chip.label} className={`exam-chip chip-${chip.tone} !inline-flex !items-center !rounded-full !border !px-2 !py-0.5 !text-[0.52rem] !font-medium md:!px-3 md:!py-1.5 md:!text-[0.7rem] ${chip.tone==="upsc"?"!border-[#2c4c76] !bg-[#101b30] !text-[#cfe0ff]":chip.tone==="bank"?"!border-[#245c46] !bg-[#0f241b] !text-[#bdf4dc]":chip.tone==="med"?"!border-[#5a3254] !bg-[#21141f] !text-[#f0d0e8]":chip.tone==="eng"?"!border-[#5a4a22] !bg-[#201b10] !text-[#ffe9b8]":"!border-[#31456c] !bg-[#10192b] !text-[#d0def4]"}`}>
              {chip.label}
            </span>
          ))}
        </div>
        <div className="upcoming-widget !relative !z-10 !rounded-[12px] !border !border-white/10 !bg-white/5 !p-3 md:!rounded-[18px] md:!p-4">
          <div className="widget-label !mb-2 !flex !items-center !gap-1.5 !text-[0.5rem] !font-bold !uppercase !tracking-[0.1em] !text-[#4e6380] md:!text-[0.6rem]">
            <span className="live-dot" />Upcoming confirmed dates
          </div>
          {upcomingExams.map((item) => (
            <div key={item.name} className="upcoming-item !flex !items-center !justify-between !border-b !border-white/5 !py-1.5 last:!border-b-0">
              <span className="upcoming-name !text-[0.6rem] !text-[#a8bdd8] md:!text-[0.8rem]">{item.name}</span>
              <span className={`upcoming-date !text-[0.58rem] !font-bold md:!text-[0.78rem] ${item.past?"!text-[#4e6380]":"!text-[#23e07b]"}`}>{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────
function Ticker() {
  const track = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker-bar !relative !z-[3] !overflow-hidden !border-y !border-[#f2b93b]/15 !bg-[linear-gradient(90deg,rgba(5,8,15,0.98),rgba(8,13,28,0.98))] !py-2">
      <div className="ticker-track !flex !whitespace-nowrap !gap-12">
        {track.map((item, index) => (
          <span key={`${item.text}-${index}`} className="t-item !inline-flex !items-center !gap-1.5 !text-[0.6rem] !text-[#a8bdd8]">
            <span className="t-sep">◆</span>{item.text} - <b>{item.detail}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────
function GalleryShowcase({ images }) {
  const getDimensions = (img) => {
    if (img.width && img.height) return { width: Number(img.width), height: Number(img.height) };
    if (img.src?.width && img.src?.height) return { width: img.src.width, height: img.src.height };
    return { width: 1, height: 1 };
  };
  const getSource = (img) => img.src?.src || img.src || img.image || img;

  const buckets = useMemo(() => {
    const wide=[], balanced=[], tall=[];
    images.forEach((img) => {
      const {width,height} = getDimensions(img);
      const ratio = width/height;
      if (ratio>=1.35) wide.push(img); else if (ratio<=0.8) tall.push(img); else balanced.push(img);
    });
    return {wide,balanced,tall};
  }, [images]);

  const ordered = useMemo(() => [...buckets.wide,...buckets.balanced,...buckets.tall],[buckets]);

  const displayOrder = useMemo(() => {
    if (!ordered.length) return [];
    const base = ordered.length===1?[ordered[0],ordered[0]]:ordered;
    if (base.length>=8) return base;
    const filled=[...base]; let cursor=0;
    while(filled.length<8){filled.push(base[cursor%base.length]);cursor+=1;}
    return filled;
  },[ordered]);

  const [slideIndex,setSlideIndex]=useState(0);
  const [selectedImage,setSelectedImage]=useState(null);
  const [isPaused,setIsPaused]=useState(false);
  const [mobileSeed,setMobileSeed]=useState(()=>Math.floor(Date.now()/45000));

  useEffect(()=>{
    if(displayOrder.length<=1||isPaused||selectedImage) return;
    const t=window.setInterval(()=>setSlideIndex(c=>(c+1)%displayOrder.length),8500);
    return ()=>window.clearInterval(t);
  },[displayOrder.length,isPaused,selectedImage]);

  useEffect(()=>{
    if(!displayOrder.length) return;
    const t=window.setInterval(()=>setMobileSeed(c=>c+1),45000);
    return ()=>window.clearInterval(t);
  },[displayOrder.length]);

  const currentSlide=useMemo(()=>{
    if(!displayOrder.length) return [];
    return displayOrder.map((_,i)=>displayOrder[(slideIndex+i)%displayOrder.length]);
  },[displayOrder,slideIndex]);

  const mobileSlide=useMemo(()=>{
    if(!displayOrder.length) return [];
    const pool=[...displayOrder]; const n=6;
    if(pool.length>=n){const s=mobileSeed%pool.length;return Array.from({length:n},(_,i)=>pool[(s+i)%pool.length]);}
    while(pool.length<n)pool.push(displayOrder[pool.length%displayOrder.length]);
    return pool;
  },[displayOrder,mobileSeed]);

  const gridClassFor=(ratio)=>ratio>=1.45?"g-main":ratio<=0.82?"ratio-tall":"ratio-balanced";

  return (
    <div className="gallery-wrap !bg-[#080d1c]" id="gallery">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-12 md:!px-10 md:!py-20">
        <div className="gallery-hdr rv !mb-6 !flex !items-end !justify-between !gap-4">
          <div>
            <div className="sec-eyebrow !mb-2 !text-[0.5rem] !font-bold !uppercase !tracking-[0.14em] !text-[#0fdbc8] md:!text-[0.62rem]">Inside EduCafe</div>
            <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
              A place built for<br /><em>deep work</em>
            </h2>
          </div>
          <p className="gallery-note !max-w-[110px] !text-right !text-[0.58rem] !leading-5 !text-[#7890a8] md:!max-w-[180px] md:!text-[0.78rem] md:!leading-6">
            Every corner is designed to help you stay in the zone longer.
          </p>
        </div>

        <div className="gallery-desktop">
          <div key={slideIndex} className="gallery-grid mosaic-fade !grid !grid-cols-[repeat(auto-fit,minmax(150px,1fr))] !gap-2">
            {currentSlide.map((item,index)=>{
              const {width,height}=getDimensions(item);
              const ratio=width/height;
              return (
                <div key={`${item.label}-${index}`} className={`g-item ${gridClassFor(ratio)} ${ratio>=1.45?"!col-span-2":""} ${ratio<=0.82?"!row-span-2":""}`}
                  role="button" tabIndex={0}
                  onClick={()=>{setSelectedImage(item);setIsPaused(true);}}
                  onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelectedImage(item);setIsPaused(true);}}}
                >
                  <Image src={getSource(item)} alt={item.label} fill sizes="(max-width:768px) 50vw, 33vw" className="gallery-image !object-cover" priority={index===0}/>
                  <div className="g-overlay"/><div className="g-caption"><span>{item.label}</span></div>
                </div>
              );
            })}
          </div>
        </div>

        <div key={mobileSeed} className="gallery-mobile mosaic-fade !mt-3">
          <div className="gallery-mobile-grid !grid !grid-cols-3 !gap-1.5">
            {mobileSlide.slice(0,6).map((item,index)=>(
              <div key={`${item.label}-mobile-${index}`} className="g-item g-mobile-item" role="button" tabIndex={0}
                onClick={()=>{setSelectedImage(item);setIsPaused(true);}}
                onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelectedImage(item);setIsPaused(true);}}}
              >
                <Image src={getSource(item)} alt={item.label} fill sizes="33vw" className="gallery-image !object-cover" priority={index===0}/>
                <div className="g-overlay"/><div className="g-caption"><span>{item.label}</span></div>
              </div>
            ))}
          </div>
          <Link href="/gallery" className="gallery-seeall !mt-3 !inline-flex !min-h-9 !items-center !justify-center !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-4 !py-2 !text-[0.68rem] !font-bold !text-white">See all</Link>
        </div>

        {selectedImage?(
          <div className="image-viewer-overlay !fixed !inset-0 !z-[1000] !grid !place-items-center !bg-black/80 !p-3 !backdrop-blur-md"
            role="button" tabIndex={0}
            onClick={()=>{setSelectedImage(null);setIsPaused(false);}}
            onKeyDown={(e)=>{if(e.key==="Escape"||e.key==="Enter"||e.key===" "){e.preventDefault();setSelectedImage(null);setIsPaused(false);}}}
          >
            <div className="image-viewer-panel !w-full !max-w-[920px] !overflow-hidden !rounded-[18px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(9,14,26,0.98),rgba(5,8,15,0.98))] !p-3 sm:!p-6" onClick={(e)=>e.stopPropagation()}>
              <button type="button" className="image-viewer-close !mb-3 !ml-auto !grid !h-8 !w-8 !place-items-center !rounded-full !border !border-white/10 !bg-white/5 !text-sm !text-white" onClick={()=>{setSelectedImage(null);setIsPaused(false);}}>×</button>
              <div className="image-viewer-image !relative !aspect-[4/3] !overflow-hidden !rounded-[12px] !bg-black sm:!aspect-[16/9]">
                <Image src={getSource(selectedImage)} alt={selectedImage.label} fill sizes="100vw" className="object-contain"/>
              </div>
              <div className="image-viewer-label !mt-2 !text-center !text-[0.6rem] !text-[#a8bdd8]">{selectedImage.label}</div>
            </div>
          </div>
        ):null}
      </div>
    </div>
  );
}

// ─── News ─────────────────────────────────────────────────────────────────
function NewsSection() {
  const tagMap = [
    {cls:"nt-alert", icon:"🔔 Action Required"},
    {cls:"nt-result",icon:"📊 Result Update"},
    {cls:"nt-exam",  icon:"📝 Notification"},
    {cls:"nt-result",icon:"✅ Result"},
    {cls:"nt-admit", icon:"🪪 Admit Card"},
    {cls:"nt-gen",   icon:"📋 Recruitment"},
  ];
  return (
    <div className="news-wrap !bg-[#0c1325]" id="news">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-12 md:!px-10 md:!py-20">
        <div className="news-hdr rv !mb-6 !flex !items-end !justify-between !gap-4">
          <div>
            <div className="sec-eyebrow !mb-2 !text-[0.5rem] !font-bold !uppercase !tracking-[0.14em] md:!text-[0.62rem]">Latest Updates</div>
            <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">Exam <em>News & Alerts</em></h2>
          </div>
          <p className="sec-desc !max-w-[130px] !text-right !text-[0.55rem] !leading-5 !text-[#a8bdd8] md:!max-w-[260px] md:!text-[0.8rem] md:!leading-7">
            Verified updates from NTA, UPSC and other official bodies - April 2026
          </p>
        </div>
        <div className="news-grid rv !grid !gap-2 lg:!grid-cols-[1.35fr_1fr_1fr]">
          {/* Featured card */}
          <article className="news-card news-featured !overflow-hidden !rounded-[14px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,15,26,0.98),rgba(6,10,18,0.98))] md:!rounded-[22px]">
            <div className="!relative !h-[140px] !overflow-hidden !bg-[#15203a] md:!h-[260px]">
              <Image src={newsCards[0].image} alt={newsCards[0].title} fill sizes="(max-width:768px) 100vw, 50vw" className="!object-cover"/>
              <div className="!absolute !inset-0 !bg-[linear-gradient(to_top,rgba(5,8,15,0.75),transparent_50%)]"/>
            </div>
            <div className="news-body !p-3">
              <span className="news-tag nt-alert !text-[0.5rem] md:!text-[0.65rem]">🔔 Action Required</span>
              <div className="news-date !mt-1 !text-[0.5rem] !text-[#7890a8] md:!text-[0.65rem]">{newsCards[0].date}</div>
              <div className="news-title !mt-1 !text-[0.65rem] !font-semibold !leading-snug !text-white md:!text-[0.85rem]">{newsCards[0].title}</div>
              <p className="news-snippet !mt-1 !text-[0.58rem] !leading-relaxed !text-[#a8bdd8] md:!text-[0.75rem]">{newsCards[0].body}</p>
            </div>
            <div className="news-footer !flex !items-center !justify-between !border-t !border-white/5 !px-3 !py-2 !text-[0.5rem] !text-[#7890a8] md:!text-[0.72rem]">
              <span>Source: {newsCards[0].source}</span><span className="news-arrow">→</span>
            </div>
          </article>

          <div className="news-side !grid !gap-2">
            {[1,2].map((i)=>(
              <article key={i} className="news-card !overflow-hidden !rounded-[14px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,15,26,0.98),rgba(6,10,18,0.98))] md:!rounded-[22px]">
                <div className="news-body !p-3">
                  <span className={`news-tag ${tagMap[i].cls} !text-[0.5rem] md:!text-[0.62rem]`}>{tagMap[i].icon}</span>
                  <div className="news-date !mt-1 !text-[0.48rem] !text-[#7890a8] md:!text-[0.62rem]">{newsCards[i].date}</div>
                  <div className="news-title !mt-1 !text-[0.6rem] !font-semibold !leading-snug !text-white md:!text-[0.78rem]">{newsCards[i].title}</div>
                  <p className="news-snippet !mt-1 !text-[0.55rem] !leading-relaxed !text-[#a8bdd8] md:!text-[0.72rem]">{newsCards[i].body}</p>
                </div>
                <div className="news-footer !flex !items-center !justify-between !border-t !border-white/5 !px-3 !py-1.5 !text-[0.48rem] !text-[#7890a8] md:!text-[0.68rem]">
                  <span>Source: {newsCards[i].source}</span><span className="news-arrow">→</span>
                </div>
              </article>
            ))}
          </div>

          {[3,4,5].map((i)=>(
            <article key={i} className="news-card !overflow-hidden !rounded-[14px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,15,26,0.98),rgba(6,10,18,0.98))] md:!rounded-[22px]">
              <div className="news-body !p-3">
                <span className={`news-tag ${tagMap[i].cls} !text-[0.5rem] md:!text-[0.62rem]`}>{tagMap[i].icon}</span>
                <div className="news-date !mt-1 !text-[0.48rem] !text-[#7890a8] md:!text-[0.62rem]">{newsCards[i].date}</div>
                <div className="news-title !mt-1 !text-[0.6rem] !font-semibold !leading-snug !text-white md:!text-[0.78rem]">{newsCards[i].title}</div>
                <p className="news-snippet !mt-1 !text-[0.55rem] !leading-relaxed !text-[#a8bdd8] md:!text-[0.72rem]">{newsCards[i].body}</p>
              </div>
              <div className="news-footer !flex !items-center !justify-between !border-t !border-white/5 !px-3 !py-1.5 !text-[0.48rem] !text-[#7890a8] md:!text-[0.68rem]">
                <span>Source: {newsCards[i].source}</span><span className="news-arrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ExamTable ────────────────────────────────────────────────────────────
function ExamTable() {
  const [filter, setFilter] = useState("all");
  const categories = ["all","UPSC","Banking","SSC","Medical","Engineering","Insurance","RBI","SEBI"];
  const categoryClass = { UPSC:"cb-upsc",Banking:"cb-bank",SSC:"cb-ssc",Medical:"cb-med",Engineering:"cb-eng",Insurance:"cb-ins",RBI:"cb-rbi",SEBI:"cb-sebi" };
  const filtered = chronologies.filter((item)=>filter==="all"||item.category===filter);

  return (
    <div className="exam-wrap" id="exams">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-12 md:!px-10 md:!py-20">
        <div className="rv">
          <div className="sec-eyebrow !mb-2 !text-[0.5rem] !font-bold !uppercase !tracking-[0.14em] md:!text-[0.62rem]">2026 Calendar</div>
          <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Every deadline.<br /><em>One place.</em>
          </h2>
          <p className="sec-desc !max-w-[520px] !text-[0.65rem] !leading-6 !text-[#a8bdd8] md:!text-[0.92rem] md:!leading-7">
            Chronological exam timeline verified against official notifications. Filter by category. Gold dates are confirmed. Grey are estimated.
          </p>
        </div>

        {/* Filter — horizontally scrollable on mobile */}
        <div className="rv !mt-5 !-mx-3 !overflow-x-auto md:!mx-0">
          <div className="!flex !gap-1.5 !px-3 md:!flex-wrap md:!px-0" style={{width:"max-content"}}>
            {categories.map((item)=>(
              <button key={item} type="button"
                className={`!shrink-0 !rounded-full !border !px-3 !py-1.5 !text-[0.55rem] !font-semibold !uppercase !tracking-[0.08em] md:!px-4 md:!py-2 md:!text-[0.72rem] ${filter===item?"!border-[#23e07b] !bg-[#23e07b] !text-[#04110a]":"!border-white/10 !bg-white/5 !text-[#a8bdd8]"}`}
                onClick={()=>setFilter(item)}
              >{item}</button>
            ))}
          </div>
        </div>

        {/* Table — horizontally scrollable on mobile */}
        <div className="rv !mt-5 !-mx-3 !overflow-x-auto md:!mx-0">
          <div className="!min-w-[540px] !px-3 md:!min-w-0 md:!px-0">
            <div className="!overflow-hidden !rounded-[14px] !border !border-white/10 !bg-[rgba(255,255,255,0.03)] md:!rounded-[24px]">
              <table className="etable !w-full !border-collapse">
                <thead className="!bg-white/5">
                  <tr>
                    {["#","Exam","Category","Application","Exam Date"].map((h)=>(
                      <th key={h} className="!whitespace-nowrap !px-3 !py-2.5 !text-left !text-[0.55rem] !font-semibold !uppercase !tracking-[0.08em] !text-[#8aa0bf] md:!px-4 md:!py-4 md:!text-[0.72rem]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="!divide-y !divide-white/5">
                  {filtered.map((item,index)=>{
                    const chip=item.ok?(<span className="!ml-1 !inline-flex !items-center !rounded-full !border !border-amber-400/20 !bg-amber-500/10 !px-1.5 !py-0.5 !text-[0.45rem] !font-semibold !text-amber-100 md:!text-[0.62rem]">CONFIRMED</span>):null;
                    return (
                      <tr key={item.exam} className={item.done?"!opacity-70":""}>
                        <td className="!px-3 !py-2 !text-[0.58rem] !font-semibold !text-[#7890a8] md:!px-4 md:!py-4 md:!text-[0.8rem]">{String(index+1).padStart(2,"0")}</td>
                        <td className="!whitespace-nowrap !px-3 !py-2 !text-[0.58rem] !font-medium !text-white md:!whitespace-normal md:!px-4 md:!py-4 md:!text-[0.85rem]">{item.done?<s>{item.exam}</s>:item.exam}</td>
                        <td className="!px-3 !py-2 md:!px-4 md:!py-4">
                          <span className={`cbadge ${categoryClass[item.category]||"cb-other"} !inline-flex !items-center !rounded-full !border !px-2 !py-0.5 !text-[0.48rem] !font-semibold !uppercase md:!px-3 md:!py-1 md:!text-[0.66rem]`}>{item.category}</span>
                        </td>
                        <td className="!whitespace-nowrap !px-3 !py-2 !text-[0.55rem] !text-[#8aa0bf] md:!px-4 md:!py-4 md:!text-[0.78rem]">{item.application}</td>
                        <td className="!whitespace-nowrap !px-3 !py-2 !text-[0.58rem] !font-semibold !text-[#d8e8f8] md:!px-4 md:!py-4 md:!text-[0.8rem]">{item.examDate}{chip}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="table-note !mt-3 !text-[0.52rem] !leading-5 !text-[#7890a8] md:!text-[0.72rem] md:!leading-6">
          ✦ Confirmed = verified from official notification | Est. = based on official patterns | Strikethrough = already conducted
        </p>
      </div>
    </div>
  );
}

// ─── SeatMap ──────────────────────────────────────────────────────────────
function SeatMap() {
  const [selected, setSelected] = useState(null);
  const counts = useMemo(() => {
    return Array.from({length:43},(_,i)=>i+1).reduce(
      (acc,seat)=>{acc[getSeatStatus(seat)]+=1;return acc;},
      {available:0,reserved:0,shifting:0}
    );
  },[]);

  const seatGroups = seatLayout;
  const renderSeatButton = (num) => (
    <button key={num} type="button" className={getSeatClasses(getSeatStatus(num))} onClick={()=>setSelected({num,...seatData[num]})}>
      {seatData[num]?.state==="reserved"?(
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#f2b93b] shadow-[0_0_0_2px_rgba(242,185,59,0.18)]" />
      ):seatData[num]?.state==="shifting"?(
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#4e9cff] shadow-[0_0_0_2px_rgba(78,156,255,0.18)]" />
      ):null}
      <div className="seat-num !text-[0.45rem] sm:!text-[0.58rem]">{num}</div>
    </button>
  );

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
            {[{cls:"!bg-[#23e07b]",l:"Available"},{cls:"!bg-[#f2b93b]",l:"Reserved"},{cls:"!bg-[#4e9cff]",l:"Shifting"},{cls:"!bg-white",l:"Instructor"}].map(({cls,l})=>(
              <div key={l} className="!flex !items-center !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1.5 !text-[0.52rem] !text-[#a8bdd8] md:!text-[0.72rem]">
                <div className={`!h-2 !w-2 !rounded-full ${cls}`}/>{l}
              </div>
            ))}
          </div>
        </div>

        {/* Seat map wrapper — scrollable on mobile so nothing gets clipped */}
        <div className="rv !-mx-3 !overflow-x-auto md:!mx-0">
          <div className="!px-3 md:!px-0" style={{minWidth:"300px"}}>
            <div className="room-container !relative !overflow-hidden !rounded-[16px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(8,13,26,0.98),rgba(6,10,18,0.98))] !p-3 md:!rounded-[28px] md:!p-6">
              <div className="!pointer-events-none !absolute !inset-x-0 !top-0 !h-px !bg-[linear-gradient(90deg,transparent,rgba(35,224,123,0.6),transparent)]"/>
              <div className="!mb-2 !inline-flex !items-center !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1 !text-[0.48rem] !font-semibold !uppercase !text-[#a8bdd8] md:!text-[0.62rem]">
                <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#23e07b]"/>Live · 43 Seats
              </div>
              <div className="!mb-3 !text-[0.55rem] !font-semibold !uppercase !tracking-[0.1em] !text-[#7890a8] md:!text-[0.78rem]">EduCafe Study Hall</div>

              <div className="room-layout">
                {/* Top row */}
                <div className="room-row row-top !flex !flex-nowrap !items-center !justify-center !gap-0.5 md:!gap-1">
                  <button type="button" className="teacher-box !flex !h-10 !w-12 !flex-col !items-center !justify-center !gap-0.5 !rounded-[8px] !border !border-white/20 !bg-white/10 sm:!h-14 sm:!w-16" onClick={()=>setSelected({type:"teacher"})}>
                    <span className="teacher-icon !text-xs sm:!text-base">🚪</span>
                    <span className="teacher-lbl !text-[0.38rem] sm:!text-[0.48rem]">Door</span>
                  </button>
                  {seatGroups.find((r)=>r.rowId==="top").seats.map((num)=>renderSeatButton(num))}
                </div>

                {/* Middle */}
                <div className="room-middle !mt-2 !flex !items-start !justify-center !gap-1.5 md:!mt-4 md:!gap-4">
                  <div className="side-col !flex !flex-col !gap-0.5 md:!gap-1">
                    {renderSeatButton(43)}
                    {[42,41,40].map((num)=><div key={num} className="!flex !flex-col !gap-0.5 md:!gap-1">{renderSeatButton(num)}</div>)}
                  </div>
                  <div className="middle-rows !flex !flex-col !gap-0.5 md:!gap-1">
                    {/* Added spacing div to push first row down */}
                    <div className="!h-10 sm:!h-14"></div>
                    {["mid-1","mid-2"].map((rowId, index)=>(
                      <div key={rowId} className={`room-row !flex !flex-nowrap !items-center !justify-center !gap-0.5 md:!gap-1 ${index === 1 ? "!mt-2 md:!mt-4" : ""}`}>
                        {seatGroups.find((r)=>r.rowId===rowId).seats.map((num)=>renderSeatButton(num))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom row */}
                <div className="room-row row-bottom !mt-2 !flex !flex-nowrap !items-center !justify-center !gap-0.5 md:!mt-4 md:!gap-1">
                  {seatGroups.find((r)=>r.rowId==="bottom").seats.map((num)=>renderSeatButton(num))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="seats-stats rv !mt-4 !flex !flex-wrap !items-center !gap-2">
          {[{n:counts.available,c:"!text-[#23e07b]",l:"Available Now"},{n:counts.reserved,c:"!text-[#f2b93b]",l:"Reserved"},{n:counts.shifting,c:"!text-[#4e9cff]",l:"Shifting Slot"}].map(({n,c,l})=>(
            <div key={l} className="!min-w-[72px] !rounded-[12px] !border !border-white/10 !bg-white/5 !p-2.5 md:!min-w-[120px] md:!rounded-[18px] md:!p-4">
              <div className={`!text-lg !font-black md:!text-2xl ${c}`}>{n}</div>
              <div className="!text-[0.5rem] !text-[#a8bdd8] md:!text-[0.72rem]">{l}</div>
            </div>
          ))}
          <div className="!ml-auto">
            <a href="https://wa.me/919862285344" className="btn-primary !inline-flex !items-center !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-3 !py-2 !text-[0.58rem] !font-semibold !text-white md:!px-5 md:!py-3 md:!text-[0.8rem]">Reserve on WhatsApp</a>
          </div>
        </div>
      </div>

      {selected?(
        <div className="seat-modal-overlay open !fixed !inset-0 !z-[1000] !grid !place-items-center !bg-black/70 !p-3" onClick={()=>setSelected(null)}>
          <div className="seat-modal !w-full !max-w-[400px] !rounded-[18px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(9,14,26,0.98),rgba(5,8,15,0.98))] !p-4 md:!rounded-[24px] md:!p-6" onClick={(e)=>e.stopPropagation()}>
            <button className="modal-close !float-right !grid !h-7 !w-7 !place-items-center !rounded-full !border !border-white/10 !bg-white/5 !text-sm !text-white" onClick={()=>setSelected(null)} type="button">×</button>
            <div className="modal-seat-num !mb-2 !text-[0.82rem] !font-bold !text-white md:!text-[1rem]">
              {selected.type==="teacher"?"Instructor Position":`Seat #${String(selected.num).padStart(2,"0")}`}
            </div>
            {selected.type==="teacher"?(
              <>
                <span className="modal-status-badge msb-shifting !text-[0.58rem]">🎓 Instructor Desk</span>
                <div className="!mt-3 !grid !grid-cols-2 !gap-2">
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Area</div><div className="!text-[0.65rem] !font-semibold !text-white">Front of Hall</div></div>
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Available</div><div className="!text-[0.65rem] !font-semibold !text-white">Always</div></div>
                </div>
                <p className="!mt-3 !text-[0.62rem] !leading-6 !text-[#a8bdd8]">The instructor monitors study sessions, answers queries, and maintains the focused environment.</p>
              </>
            ):selected.state==="reserved"?(
              <>
                <span className="modal-status-badge msb-reserved !text-[0.58rem]">● Reserved</span>
                <div className="!mt-3 !flex !items-center !gap-3">
                  <div className={`modal-big-av !grid !h-10 !w-10 !place-items-center !rounded-full !text-[0.6rem] !font-bold ${selected.num%2===0?"mba-gold":"mba-blue"}`}>{selected.initials}</div>
                  <div><div className="!text-[0.72rem] !font-bold !text-white">{selected.name}</div><div className="!text-[0.58rem] !text-[#a8bdd8]">{selected.exam}</div></div>
                </div>
                <div className="!mt-3 !grid !grid-cols-2 !gap-2">
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Shift</div><div className="!text-[0.65rem] !font-semibold !text-white">{selected.shift}</div></div>
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Status</div><div className="!text-[0.65rem] !font-semibold !text-[#f2b93b]">Active</div></div>
                </div>
                <a href="https://wa.me/919862285344?text=Hi%2C%20I%20want%20to%20enquire%20about%20a%20nearby%20available%20seat." className="modal-cta !mt-3 !block !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-4 !py-2 !text-center !text-[0.62rem] !font-semibold !text-white">Find a Nearby Available Seat</a>
                <div className="!mt-2 !text-center !text-[0.55rem] !text-[#7890a8]">This seat is taken. We&apos;ll find you the best available spot!</div>
              </>
            ):selected.state==="shifting"?(
              <>
                <span className="modal-status-badge msb-shifting !text-[0.58rem]">↔ Shifting Slot</span>
                <div className="!mt-3 !flex !items-center !gap-3">
                  <div className="modal-big-av mba-blue !grid !h-10 !w-10 !place-items-center !rounded-full !text-sm !font-bold">↔</div>
                  <div><div className="!text-[0.72rem] !font-bold !text-white">Shifting Slot</div><div className="!text-[0.58rem] !text-[#a8bdd8]">Available for specific hours</div></div>
                </div>
                <div className="!mt-3 !grid !grid-cols-2 !gap-2">
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Open During</div><div className="!text-[0.65rem] !font-semibold !text-[#5ca8ff]">{selected.shift}</div></div>
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Type</div><div className="!text-[0.65rem] !font-semibold !text-white">Shift Seat</div></div>
                </div>
                <a href={`https://wa.me/919862285344?text=Hi%2C%20I%20want%20to%20reserve%20Seat%20%23${selected.num}%20(Shifting%20-%20${encodeURIComponent(selected.shift)})%20at%20EduCafe.`} className="modal-cta !mt-3 !block !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-4 !py-2 !text-center !text-[0.62rem] !font-semibold !text-white">Reserve This Slot on WhatsApp</a>
                <div className="!mt-2 !text-center !text-[0.55rem] !text-[#7890a8]">Available {selected.shift} - secure it before someone else does!</div>
              </>
            ):(
              <>
                <span className="modal-status-badge msb-available !text-[0.58rem]">● Available</span>
                <div className="!mt-3 !flex !items-center !gap-3">
                  <div className="modal-big-av mba-green !grid !h-10 !w-10 !place-items-center !rounded-full !text-sm !font-bold">✓</div>
                  <div><div className="!text-[0.72rem] !font-bold !text-white">This seat is yours.</div><div className="!text-[0.58rem] !text-[#a8bdd8]">Ready for a serious aspirant</div></div>
                </div>
                <div className="!mt-3 !grid !grid-cols-2 !gap-2">
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Availability</div><div className="!text-[0.65rem] !font-semibold !text-[#23e07b]">Full Day</div></div>
                  <div><div className="!text-[0.5rem] !text-[#7890a8]">Status</div><div className="!text-[0.65rem] !font-semibold !text-[#23e07b]">Open</div></div>
                </div>
                <a href={`https://wa.me/919862285344?text=Hi%2C%20I%20want%20to%20reserve%20Seat%20%23${selected.num}%20at%20EduCafe.`} className="modal-cta !mt-3 !block !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-4 !py-2 !text-center !text-[0.62rem] !font-semibold !text-white">Reserve Seat #{selected.num} on WhatsApp</a>
                <div className="!mt-2 !text-center !text-[0.55rem] !text-[#7890a8]">We&apos;ll confirm your booking within minutes.</div>
              </>
            )}
          </div>
        </div>
      ):null}
    </div>
  );
}

// ─── AchieversSection ─────────────────────────────────────────────────────
function AchieversSection() {
  const [achieversData, setAchieversData] = useState([]);
  const [loadingAchievers, setLoadingAchievers] = useState(true);
  const gridRef = useRef(null);

  const sortedAchievers = useMemo(()=>[...achieversData].sort((a,b)=>Number(b.year)-Number(a.year)),[achieversData]);

  useEffect(()=>{
    const load=async()=>{
      try{
        const res=await fetch("/api/achievers",{cache:"no-store"});
        const data=await res.json();
        setAchieversData(Array.isArray(data)?data:[]);
      }catch{setAchieversData([]);}
      finally{setLoadingAchievers(false);}
    };
    load();
  },[]);

  useEffect(()=>{
    if(loadingAchievers) return;
    const container=gridRef.current;
    if(!container) return;
    const observer=new IntersectionObserver(
      (entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add("in");observer.unobserve(entry.target);}}),
      {threshold:0.1}
    );
    const tid=setTimeout(()=>{
      container.querySelectorAll(".rv").forEach((el)=>{
        const r=el.getBoundingClientRect();
        if(r.top<window.innerHeight&&r.bottom>0) el.classList.add("in");
        else observer.observe(el);
      });
    },50);
    return ()=>{clearTimeout(tid);observer.disconnect();};
  },[loadingAchievers,achieversData]);

  return (
    <div className="ach-wrap !bg-[#05080f]" id="achievers">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-12 md:!px-10 md:!py-20">
        <div className="rv !mx-auto !max-w-[620px] !text-center">
          <div className="sec-eyebrow !mb-2 !text-[0.5rem] !font-bold !uppercase !tracking-[0.14em] !text-[#0fdbc8] md:!text-[0.62rem]">Real Results</div>
          <h2 className="sec-title !text-center !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Students who walked<br />in - and <em>walked out winning</em>
          </h2>
          <p className="sec-desc !mx-auto !text-center !text-[0.65rem] !leading-6 !text-[#a8bdd8] md:!text-[0.92rem] md:!leading-7">
            Real achievers from the EduCafe database.
          </p>
        </div>

        {loadingAchievers&&<div className="!mt-8 !text-center !text-[0.65rem] !text-[#a8bdd8]">Loading achievers...</div>}
        {!loadingAchievers&&achieversData.length===0&&<div className="!mt-8 !text-center !text-[0.65rem] !text-[#a8bdd8]">No achievers have been added yet.</div>}

        <div ref={gridRef} className="!mt-6 !grid !grid-cols-3 !gap-2 sm:!grid-cols-4 md:!grid-cols-5 md:!gap-3">
          {sortedAchievers.map((item)=>(
            <article
              key={item._id||`${item.name}-${item.exam}`}
              className="rv !flex !flex-col !items-center !gap-2 !rounded-[12px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,14,26,0.98),rgba(7,10,18,0.98))] !p-2.5 !text-center md:!rounded-[16px] md:!p-3"
            >
              {/* Fully rounded image — overflow hidden, object-cover */}
              <div className="!relative !h-16 !w-16 !shrink-0 !overflow-hidden !rounded-full !border-2 !border-[#1a9e8f] md:!h-20 md:!w-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="!absolute !inset-0 !h-full !w-full !object-cover"
                />
              </div>
              <div className="!flex !flex-col !gap-0.5">
                <div className="!text-[0.58rem] !font-bold !leading-tight !text-white md:!text-[0.7rem]">{item.name}</div>
                <div className="!text-[0.5rem] !leading-tight !text-[#6b7a99] md:!text-[0.6rem]">{item.exam}</div>
                <div className="!text-[0.52rem] !font-bold !text-[#1a9e8f] md:!text-[0.62rem]">{item.year}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-strip rv !mt-10 !rounded-[18px] !border !border-white/10 !bg-[rgba(255,255,255,0.03)] !p-4 !text-center md:!mt-14 md:!rounded-[24px] md:!p-8">
          <h3 className="!text-[0.9rem] !font-bold !text-white md:!text-[1.3rem]">You could be next. <em>You should be next.</em></h3>
          <p className="!mx-auto !mt-2 !max-w-[400px] !text-[0.62rem] !leading-6 !text-[#a8bdd8] md:!text-[0.82rem] md:!leading-7">Your goal is valid. Your effort already counts. Now add the right environment.</p>
          <a href="https://wa.me/919862285344" className="btn-primary !mx-auto !mt-3 !inline-flex !items-center !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-4 !py-2.5 !text-[0.62rem] !font-semibold !text-white md:!px-6 md:!py-3 md:!text-[0.85rem]">
            Reserve Your Seat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <div className="contact-wrap !bg-[#0c1325]" id="contact">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-12 md:!px-10 md:!py-20">
        <div className="contact-grid !grid !grid-cols-1 !gap-6 lg:!grid-cols-2">
          <div className="rv !space-y-3">
            <div className="sec-eyebrow !mb-2 !text-[0.5rem] !font-bold !uppercase !tracking-[0.14em] !text-[#0fdbc8] md:!text-[0.62rem]">Get in Touch</div>
            <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
              Ready to start?<br /><em>Let&apos;s talk.</em>
            </h2>
            <p className="sec-desc !max-w-[500px] !text-[0.65rem] !leading-6 !text-[#a8bdd8] md:!text-[0.9rem] md:!leading-7">
              Whether you have a question, want to see the space, or are ready to join - reach out. We respond fast.
            </p>
            {[{l:"Primary Number",v:"+91 98622 85344"},{l:"Alternate Number",v:"+91 70055 49898"}].map(({l,v})=>(
              <div key={l} className="!flex !items-center !gap-3 !rounded-[12px] !border !border-white/10 !bg-white/5 !p-3 md:!rounded-[18px] md:!p-4">
                <div className="!text-base">📞</div>
                <div>
                  <div className="!text-[0.48rem] !font-semibold !uppercase !tracking-[0.08em] !text-[#7890a8] md:!text-[0.68rem]">{l}</div>
                  <div className="!text-[0.68rem] !font-semibold !text-white md:!text-sm">{v}</div>
                </div>
              </div>
            ))}
            <a href="https://wa.me/919862285344" className="wa-btn !inline-flex !items-center !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !px-4 !py-2.5 !text-[0.65rem] !font-semibold !text-white md:!px-5 md:!py-3 md:!text-[0.85rem]">
              Message Us on WhatsApp
            </a>
          </div>
          <div className="rv rv-delay-1">
            <div className="why-box !rounded-[18px] !border !border-white/10 !bg-[rgba(255,255,255,0.03)] !p-3 md:!p-5">
              <h4 className="!mb-3 !text-[0.72rem] !font-semibold !text-white md:!text-[0.95rem]">Why students choose EduCafe</h4>
              <div className="!space-y-2">
                {whyChoose.map((item)=>(
                  <div key={item.title} className="!flex !items-start !gap-2.5 !rounded-[10px] !border !border-white/10 !bg-white/5 !p-2.5 md:!rounded-[16px] md:!p-4">
                    <div className="!grid !h-8 !w-8 !shrink-0 !place-items-center !rounded-full !bg-[#10192b] !text-sm md:!h-11 md:!w-11 md:!text-lg">{item.icon}</div>
                    <div>
                      <div className="!text-[0.6rem] !font-semibold !text-white md:!text-[0.8rem]">{item.title}</div>
                      <div className="!mt-0.5 !text-[0.53rem] !leading-5 !text-[#a8bdd8] md:!text-[0.72rem] md:!leading-6">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer !flex !items-center !justify-between !gap-3 !border-t !border-white/10 !px-3 !py-4 md:!px-6 md:!py-6">
      <span className="foot-logo !text-[0.72rem] !font-semibold !text-white md:!text-[0.95rem]">EduCafe</span>
      <span className="foot-credit !text-[0.55rem] !text-[#a8bdd8] md:!text-[0.78rem]">
        Made with <span className="text-red-400">♥</span> by <a href="#">Nextjourney</a> · Assam, India · 2026
      </span>
    </footer>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [seatItems, setSeatItems] = useState([]);

  useEffect(()=>{
    const nav=document.getElementById("nav");
    const updateLift=()=>nav?.classList.toggle("lifted",window.scrollY>50);
    const observer=new IntersectionObserver(
      (entries)=>entries.forEach((entry)=>{if(entry.isIntersecting)entry.target.classList.add("in");}),
      {threshold:0.12}
    );
    document.querySelectorAll(".rv").forEach((el)=>observer.observe(el));
    updateLift();
    window.addEventListener("scroll",updateLift,{passive:true});
    const loadGallery=async()=>{
      try{const res=await fetch("/api/gallery",{cache:"no-store"});const data=await res.json();if(Array.isArray(data))setGalleryItems(data);}
      catch{setGalleryItems([]);}
    };
    const loadSeats=async()=>{
      try{const res=await fetch("/api/seats",{cache:"no-store"});const data=await res.json();if(Array.isArray(data))setSeatItems(data);}
      catch{setSeatItems([]);}
    };
    loadGallery();
    loadSeats();
    return ()=>{observer.disconnect();window.removeEventListener("scroll",updateLift);};
  },[]);

  return (
    <main className="home-shell relative z-20 overflow-x-hidden bg-[#05080f] text-[#d8e8f8]">
      <div className="ambient amb-1 pointer-events-none absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(29,181,106,0.18),transparent_70%)] blur-3xl"/>
      <div className="ambient amb-2 pointer-events-none absolute right-[-10%] top-[18rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(242,185,59,0.12),transparent_70%)] blur-3xl"/>
      <div className="ambient amb-3 pointer-events-none absolute left-[20%] top-[38rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(78,156,255,0.1),transparent_70%)] blur-3xl"/>
      <Navbar/>
      <Hero/>
      <Ticker/>
      <GalleryShowcase
        images={galleryItems.length>0
          ?galleryItems.map((item)=>({src:item.image,label:item.label,width:item.width,height:item.height,aspectRatio:item.aspectRatio}))
          :galleryImages}
      />
      <div className="divider"/>
      <NewsSection/>
      <ExamTable/>
      <HomeSeatMap seats={seatItems} />
      <AchieversSection/>
      <ContactSection/>
      <Footer/>
    </main>
  );
}
