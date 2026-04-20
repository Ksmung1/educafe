"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
import project from "@/assets/project.png";
import educafe20 from "@/assets/educafe20.png";
import { chronologies } from "@/data/chronologies";
import { newsSeed } from "@/data/newsSeed";
import HomeSeatMap from "@/app/components/HomeSeatMap";
import Navbar from "@/app/components/Navbar";
import { MessageCircle } from "lucide-react";

const heroStats = [
  { value: "200+", label: "Students Enrolled" },
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
  { text: "NEET UG City Intimation Slip Released", detail: "Download at neet.nta.nic.in", href: "https://neet.nta.nic.in/" },
  { text: "JEE Main Session 2 Result Expected", detail: "~April 20, 2026", href: "https://jeemain.nta.ac.in/" },
  { text: "UPSC CSE 2026", detail: "933 Vacancies Notified", href: "https://upsc.gov.in/" },
  { text: "NEET UG Exam", detail: "May 3, 2026 | 2 PM-5 PM", href: "https://neet.nta.nic.in/" },
  { text: "UPSC Prelims", detail: "May 24, 2026", href: "https://upsc.gov.in/" },
  { text: "UPSC Mains", detail: "Aug 21, 2026", href: "https://upsc.gov.in/" },
  { text: "AIIMS NORCET 10 Result", detail: "14,500+ qualify Stage 2", href: "https://www.aiimsexams.ac.in/" },
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

const upcomingProjects = [
  {
    image: project,
    title: "",
    body: ""
  },

];

const whyChoose = [
  { icon: "🎯", title: "Silence by design", text: "No distractions, no noise. Our study zones are built for sustained deep focus - the kind that moves you forward." },
  { icon: "📅", title: "Always-current exam intel", text: "We track every notification - dates, vacancies, syllabus changes - so you don't have to hunt for information." },
  { icon: "🤝", title: "Community of serious aspirants", text: "Being around people who are genuinely working hard is the best motivation you'll find. That's the EduCafe effect." },
  { icon: "📚", title: "Every stream, one roof", text: "UPSC. Banking. Medical. Engineering. SSC. It doesn't matter which path you're on - we have space for you here." },
];

const campusLocation = {
  title: "EduCafe Study Hall",
  addressLine1: "EduCafe Study Hall",
  addressLine2: "New, Sim Veng, Churachandpur, Manipur 795128",
  mapsQuery: "EduCafe Study Hall",
  satelliteHref: "https://www.google.com/maps/search/?api=1&query=EduCafe+Study+Hall+Dhubri+Assam&basemap=satellite",
};


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
function Quote() {
  return (
    <div className="relative mt-3 mx-4 pb-10 px-3 max-w-[560px] ">


      {/* Quote text */}
      <p className="relative m-0 font-serif text-[12px] italic underline font-normal text-green-400 leading-[1.8] text-center tracking-[0.02em]">
        "The best time to prepare for tomorrow is today"
      </p>
    </div>
  )
}
// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero  !grid !w-full !items-center !gap-1 !pt-0 !pb-0 !mb-0 md:!px-0 md:!pt-20">
      <div className="!absolute !inset-0 !bg-black/10" />
      <div className="tag !mb-0 !ml-3 !inline-flex  !gap-1.5 !rounded-full !border !border-white/10 !bg-white/5 !px-2.5 !py-1.5 !text-[0.55rem] !font-semibold !tracking-[0.1em] !text-[#a8bdd8] md:!ml-12 lg:!ml-20">
        <span className="tag-pulse" />
        Dedicated Study Hub
      </div>  
      <div className="p-2 !bg-[url('/images/bg.png')] !bg-cover !bg-no-repeat !bg-[80%_center]">
      <div className="!relative max-w-[260px] mx-auto !overflow-hidden !px-3  md:!px-12 lg:!px-20">
        {/* Glassmorphism container for hero-left content */}
        <div 
          className="hero-left rv py-4 px-4"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(0.5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
        >
          <h1 className="hero-heading  !font-sans !font-semibold !text-[24px] !leading-[1.05] !tracking-[-0.02em] !text-[#d8e8f8]">
            The right <br /> <em>environment</em> <br />can  work <em>wonders.</em>
          </h1>
          <p className="hero-body !mb-0 !max-w-[460px] !text-[0.72rem] !font-light !leading-[1.8] !text-gray-100 md:!text-[1rem]">
  Your next exam deserves  a space <br /> built for focus and consistency.
          </p>


          <div className="hero-proof !mt-1 mb-3 !flex items-center !gap-5 !border-t !border-white/10 !pt-5 md:!mt-10 md:!gap-8 md:!pt-8">
            {heroStats.map((item) => (
              <div key={item.label}>
                <div className="proof-num !font-['Playfair_Display'] !text-[1rem] !font-black !leading-none !text-white md:!text-[2rem]">{item.value}</div>
                <div className="proof-lbl !mt-1 !text-[0.4rem] !font-medium !text-gray-200 md:!text-[0.68rem]">{item.label}</div>
              </div>
            ))}

          </div>

          <div className=" !flex !flex-wrap !gap-3  md:!mt-2">
            <a
              href="#seats"
              className="group !relative !inline-flex !items-center !justify-center !overflow-visible !rounded-full !px-0 !py-0 !text-[0.9rem] !font-semibold !text-[#e8fff1] !transition-all !duration-300 hover:!scale-[1.03]"
            >

              {/* Outer glow */}
              <span className="!absolute !inset-0 !rounded-full [box-shadow:0_0_18px_4px_rgba(50,255,140,0.18),0_0_40px_8px_rgba(50,255,140,0.10)]" />

              {/* Inner pill */}
              <span className="!relative italic !z-10 !rounded-full !border !border-[rgba(120,255,180,0.38)] !bg-green-500/95 !px-3.5 !py-[8px] [box-shadow:0_0_10px_rgba(80,255,170,0.45),0_0_24px_rgba(80,255,170,0.25),inset_0_0_10px_rgba(80,255,170,0.12)]">
                Start today
              </span>
            </a>
          </div>
        </div>
      </div>
      </div>

    </section>
  );
}


function Ticker() {
  const track = [...tickerItems, ...tickerItems];

  const handleNavigate = (href) => {
    if (!href) return;
    window.location.href = href;
  };

  return (
    <div className="ticker-bar !relative !z-[3] !overflow-hidden !border-y !border-white/10 !bg-black !py-2">
      <div className="ticker-track !flex !whitespace-nowrap !gap-12">
        {track.map((item, index) => (
          <span
            key={`${item.text}-${index}`}
            onClick={() => handleNavigate(item.href)}
            className="t-item !inline-flex !cursor-pointer !items-center !gap-1.5 !text-[0.6rem] !text-[#a8bdd8]"
          >
            <span className="t-sep">◆</span>
            {item.text} - <b>{item.detail}</b>
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
  const [mobileSeed,setMobileSeed]=useState(0);

  useEffect(()=>{
    if(displayOrder.length<=1||isPaused||selectedImage) return;
    const t=window.setInterval(()=>setSlideIndex(c=>(c+1)%displayOrder.length),8500);
    return ()=>window.clearInterval(t);
  },[displayOrder.length,isPaused,selectedImage]);

  useEffect(()=>{
    if(!displayOrder.length||isPaused||selectedImage) return;
    const syncTimer=window.setTimeout(()=>setMobileSeed(Math.floor(Date.now()/5000)),0);
    const t=window.setInterval(()=>setMobileSeed(c=>c+1),5000);
    return ()=>{window.clearTimeout(syncTimer);window.clearInterval(t);};
  },[displayOrder.length,isPaused,selectedImage]);

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
    <div className="gallery-wrap !bg-black" id="gallery">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-3 md:!px-10 md:!py-20">
        <div className="gallery-hdr w-full !mb-2 !flex flex-col !items-start  !gap-0">
          <div>
            <h2 className="sec-title mb-0 !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
              A place built for <em>deep work</em>
            </h2>
          </div>
          <p className="mt-0 !text-left w-full !text-[0.58rem] !leading-5 !text-[#7890a8] md:!text-[0.78rem] md:!leading-6">
 A glimpse into the environment
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
            <div className="image-viewer-panel !w-full !max-w-[920px] !overflow-hidden !rounded-[18px] !border !border-white/10 !bg-black !p-3 sm:!p-6" onClick={(e)=>e.stopPropagation()}>
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
  const [newsItems, setNewsItems] = useState(newsSeed);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        const data = await res.json();

        if (res.ok && Array.isArray(data) && data.length > 0) {
          setNewsItems(data);
        }
      } catch {}
    };

    loadNews();
  }, []);

  const featuredItem = newsItems.find((item) => item.featured) || newsItems[0];
  const featuredIndex = featuredItem ? newsItems.findIndex((item) => item === featuredItem) : -1;
  const restItems = newsItems.filter((_, index) => index !== featuredIndex);
  const sideItems = restItems.slice(0, 2);
  const lowerItems = restItems.slice(2, 5);

  const toneMap = {
    alert: { cls: "nt-alert", icon: "Action Required" },
    result: { cls: "nt-result", icon: "Result Update" },
    exam: { cls: "nt-exam", icon: "Notification" },
    admit: { cls: "nt-admit", icon: "Admit Card" },
    gen: { cls: "nt-gen", icon: "Recruitment" },
  };

  const getToneUi = (item) => {
    const toneUi = toneMap[item?.tone] || toneMap.gen;
    return {
      cls: toneUi.cls,
      label: item?.tag || toneUi.icon || "Update",
    };
  };

  if (!featuredItem) return null;

  return (
    <div className="news-wrap !bg-black" id="news">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-3 md:!px-10 md:!py-20">
          <div className="rv">
          <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
Exam <em>News & Alerts</em>          </h2>
          <p className="sec-desc mb-2 !max-w-[520px] !text-[0.65rem] !leading-6 !text-[#a8bdd8] md:!text-[0.92rem] md:!leading-7">
            Verified updates from NTA, UPSC and other official bodies - April 2026
          </p>
        </div>

        <div className="news-grid rv !grid !gap-2 lg:!grid-cols-[1.35fr_1fr_1fr]">
          <article className="news-card news-featured !overflow-hidden !rounded-[14px] !border !border-white/10 !bg-black md:!rounded-[22px]">
            <div className="!relative  !overflow-hidden !bg-[#15203a] md:!h-[260px]">
              {featuredItem.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featuredItem.image}
                  alt={featuredItem.title}
                  className="!h-full !w-full !object-cover"
                />
              ) : (
                <div className="!flex !h-full !w-full !items-end !bg-[radial-gradient(circle_at_top_left,rgba(29,181,106,0.2),transparent_35%),linear-gradient(135deg,#000000,#000000)] !p-4">
                  <div className="!max-w-[80%] !text-[0.9rem] !font-semibold !leading-snug !text-white/90 md:!text-[1.2rem]">
                    {featuredItem.tag}
                  </div>
                </div>
              )}
              <div className="!absolute !inset-0 !bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent_50%)]" />
            </div>
            <div className="news-body !p-3">
              <span className={
                `news-tag ${getToneUi(featuredItem).cls} !text-[0.5rem] md:!text-[0.65rem]`
              }>
                {getToneUi(featuredItem).label}
              </span>
              <div className="news-date !mt-1 !text-[0.5rem] !text-[#7890a8] md:!text-[0.65rem]">{featuredItem.dateLabel}</div>
              <div className="news-title !mt-1 !text-[0.65rem] !font-semibold !leading-snug !text-white md:!text-[0.85rem]">{featuredItem.title}</div>
              <p className="news-snippet !mt-1 !text-[0.58rem] !leading-relaxed !text-[#a8bdd8] md:!text-[0.75rem]">{featuredItem.body}</p>
            </div>
            <div className="news-footer !flex !items-center !justify-between !border-t !border-white/5 !px-3 !py-2 !text-[0.5rem] !text-[#7890a8] md:!text-[0.72rem]">
              <span>Source: {featuredItem.source}</span><span className="news-arrow">-&gt;</span>
            </div>
          </article>

          <div className="news-side !grid !gap-2">
            {sideItems.map((item) => (
              <article key={item._id || item.title} className="news-card !overflow-hidden !rounded-[14px] !border !border-white/10 !bg-black md:!rounded-[22px]">
                <div className="news-body !p-3">
                  <span className={`news-tag ${getToneUi(item).cls} !text-[0.5rem] md:!text-[0.62rem]`}>{getToneUi(item).label}</span>
                  <div className="news-date !mt-1 !text-[0.48rem] !text-[#7890a8] md:!text-[0.62rem]">{item.dateLabel}</div>
                  <div className="news-title !mt-1 !text-[0.6rem] !font-semibold !leading-snug !text-white md:!text-[0.78rem]">{item.title}</div>
                  <p className="news-snippet !mt-1 !text-[0.55rem] !leading-relaxed !text-[#a8bdd8] md:!text-[0.72rem]">{item.body}</p>
                </div>
                <div className="news-footer !flex !items-center !justify-between !border-t !border-white/5 !px-3 !py-1.5 !text-[0.48rem] !text-[#7890a8] md:!text-[0.68rem]">
                  <span>Source: {item.source}</span><span className="news-arrow">-&gt;</span>
                </div>
              </article>
            ))}
          </div>

          {lowerItems.map((item) => (
            <article key={item._id || item.title} className="news-card !overflow-hidden !rounded-[14px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,15,26,0.98),rgba(6,10,18,0.98))] md:!rounded-[22px]">
              <div className="news-body !p-3">
                <span className={`news-tag ${getToneUi(item).cls} !text-[0.5rem] md:!text-[0.62rem]`}>{getToneUi(item).label}</span>
                <div className="news-date !mt-1 !text-[0.48rem] !text-[#7890a8] md:!text-[0.62rem]">{item.dateLabel}</div>
                <div className="news-title !mt-1 !text-[0.6rem] !font-semibold !leading-snug !text-white md:!text-[0.78rem]">{item.title}</div>
                <p className="news-snippet !mt-1 !text-[0.55rem] !leading-relaxed !text-[#a8bdd8] md:!text-[0.72rem]">{item.body}</p>
              </div>
              <div className="news-footer !flex !items-center !justify-between !border-t !border-white/5 !px-3 !py-1.5 !text-[0.48rem] !text-[#7890a8] md:!text-[0.68rem]">
                <span>Source: {item.source}</span><span className="news-arrow">-&gt;</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function CabinsSection() {
  return (
    <div className="cabins-wrap !bg-black" id="cabins">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-3 md:!px-10 md:!py-20">
          <div className="rv">
          <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Quiet cabins built for <em>deep focus</em>
          </h2>
          <p className="sec-desc !max-w-[520px] !text-[0.65rem] !leading-6 !text-[#a8bdd8] md:!text-[0.92rem] md:!leading-7">
            A dedicated close-up of the EduCafe cabin space for uninterrupted study sessions.
          </p>
        </div>




        <div className="rv !overflow-hidden !rounded-[18px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,15,26,0.98),rgba(6,10,18,0.98))] !p-2 md:!rounded-[28px] md:!p-3">
          <div className="!relative !aspect-[16/10] !overflow-hidden !rounded-[14px] md:!rounded-[22px]">
            <Image
              src={educafe20}
              alt="EduCafe cabins"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="!object-cover"
              priority={false}
            />
            <div className="!absolute !inset-0 !bg-[linear-gradient(to_top,rgba(5,8,15,0.34),transparent_42%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamTable() {
  const [filter, setFilter] = useState("all");
  const categories = ["all","UPSC","Banking","SSC","Medical","Engineering","Insurance","RBI","SEBI"];
  const categoryClass = { UPSC:"cb-upsc",Banking:"cb-bank",SSC:"cb-ssc",Medical:"cb-med",Engineering:"cb-eng",Insurance:"cb-ins",RBI:"cb-rbi",SEBI:"cb-sebi" };
  const filtered = chronologies.filter((item)=>filter==="all"||item.category===filter);

  return (
    <div className="exam-wrap" id="exams">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-3 md:!px-10 md:!py-20">
        <div className="rv">
          <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Exam Calendar <em>2026</em>
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


      </div>
    </div>
  );
}



function AnimatedVideo() {
  return (
    <div className="!bg-black" id="video">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-0 !py-0 md:!px-10 md:!py-20">
        <div className="rv !w-full">
          <h2 className="sec-title mb-2 !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8] !text-left">
            Animated <em>Video</em>
          </h2>

          <div className="!flex !w-full !justify-center">
            <video
              src="/videos/new.mp4"
              controls
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="!w-full !rounded-[18px] !shadow-lg md:!rounded-[24px]"
            />
          </div>
        </div>
      </div>
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
    <div className="ach-wrap !bg-black" id="achievers">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-5 md:!px-10 md:!py-20">
        <div className="rv !mx-auto !max-w-[620px] !text-left">
          <h2 className="sec-title !text-center !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Students who walked in - and <em>walked out winning</em>
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
                  className="!absolute !inset-0 !h-full !w-full !object-cover scale-110 !transition-transform duration-300 hover:scale-120"
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
    <div className="contact-wrap !bg-black" id="contact">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-2  md:!px-10 md:!py-20">
        <div className="contact-grid !grid !grid-cols-1 !gap-6 lg:!grid-cols-2">
          <div className="rv !space-y-3">
            <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
              <em>Contact with us.</em>
            </h2>
            <p className="sec-desc !max-w-[500px] !text-[0.65rem] !leading-6 !text-[#a8bdd8] md:!text-[0.9rem] md:!leading-7">
              Whether you have a question, want to see the space, or are ready to join - reach out. We respond fast.
            </p>
   <div className="!flex !gap-2 !flex-row !flex-wrap">
  {[{ l: "Primary Number", v: "+91 98622 85344" }, { l: "Alternate Number", v: "+91 70055 49898" }].map(({ l, v }) => (
    <div
      key={l}
      className="!flex !min-w-[160px] !flex-1 !items-center !gap-3 !rounded-[12px] !border !border-white/10 !bg-white/5 !p-3 md:!rounded-[18px] md:!p-4"
    >
      <div className="!text-base">📞</div>
      <div>
        <div className="!text-[0.48rem] !font-semibold !uppercase !tracking-[0.08em] !text-[#7890a8] md:!text-[0.68rem]">
          {l}
        </div>
        <div className="!text-[0.68rem] !font-semibold !text-white md:!text-sm">
          {v}
        </div>
      </div>
    </div>
  ))}
</div>


          </div>

        </div>
      </div>
    </div>
  );
}

function AddressSection() {
  const embedQuery = encodeURIComponent(campusLocation.mapsQuery);

  return (
    <div className="address-wrap !bg-black" id="address">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-3 md:!px-10 md:!py-20">
        <div className="rv !mb-4 !max-w-[720px]">
  
          <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Address and <em>live location</em>
          </h2>

        </div>

        <div className="!grid !gap-4 lg:!grid-cols-[0.95fr_1.25fr]">
          <div className="rv !rounded-[18px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,15,26,0.98),rgba(6,10,18,0.98))] !p-4 md:!rounded-[24px] md:!p-6">


            <div className=" !space-y-1">
              <div className="">
                <div className="!mt-2 !text-[0.9rem] !font-semibold !text-white md:!text-[1.05rem]">
                  {campusLocation.addressLine1}
                </div>
                <div className="!mt-1 !text-[0.68rem] !leading-6 !text-[#a8bdd8] md:!text-[0.82rem]">
                  {campusLocation.addressLine2}
                </div>
              </div>


            </div>
          </div>

          <div className="rv rv-delay-1 !grid ">
  
            <div className="!overflow-hidden !rounded-[18px] !border !border-white/10 !bg-[linear-gradient(180deg,rgba(10,15,26,0.98),rgba(6,10,18,0.98))] md:!rounded-[24px]">
              <div className="!border-b !border-white/10 !px-4 !py-3 md:!px-5">
              </div>
              <div className="!relative !aspect-[16/11] !w-full">
                <iframe
                  title="EduCafe satellite map view"
                  src={`https://maps.google.com/maps?q=${embedQuery}&t=k&z=18&output=embed`}
                  className="!absolute !inset-0 !h-full !w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyChoose () {
  return (
              <div className="rv rv-delay-1 mt-5">
            <div className="why-box !rounded-[18px] !border !border-white/10 !bg-[rgba(255,255,255,0.03)] !p-3 md:!p-5">
     <div className="rv mb-3">
          <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Why Students Choose <em>Educafe</em>
          </h2>
        </div>              <div className="!space-y-2">
                {whyChoose.map((item)=>(
                  <div key={item.title} className="!flex !items-start !gap-2.5 !rounded-[10px] !border !border-white/10 !bg-white/5 !p-2.5 md:!rounded-[16px] md:!p-4">
                    <div className="!grid !h-8 !w-8 !shrink-0 !place-items-center !rounded-full !bg-[#10192b] !text-xl md:!h-11 md:!w-11 md:!text-lg">{item.icon}</div>
                    <div>
                      <div className="!text-[0.7rem] !font-semibold !text-white md:!text-[0.8rem]">{item.title}</div>
                      <div className="!mt-0.5 !text-[0.64rem] !leading-5 !text-gray-200 md:!text-[0.72rem] md:!leading-6">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  )
}


// ─── Footer ───────────────────────────────────────────────────────────────
function UpcomingProjectsSection() {
  return (
    <div className="projects-wrap !bg-black" id="projects">
      <div className="section-inner !mx-auto !max-w-[1200px] !px-3 !py-3 md:!px-10 md:!py-20">
        <div className="rv !mb-6 !max-w-[620px]">

          <h2 className="sec-title !font-['Playfair_Display'] !text-[clamp(1.3rem,3.5vw,2.75rem)] !font-black !leading-tight !text-[#d8e8f8]">
            Project <em>Mythos</em> - <p className="text-sm font-sans font-light">Development in progress</p>
          </h2>

        </div>

        <div className="!grid !gap-4 md:!grid-cols-2 h-full xl:!grid-cols-3">
          {upcomingProjects.map((item) => (
            <article
              key={item.title}
              className="rv  h-full !rounded-[18px] !border !border-white/10 "
            >
              <div className="!relative h-130 !w-full  ">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="!object-cover"
                />
          
              </div>

              <div className="!p-4 md:!p-5">
                <h3 className="!text-[0.78rem] !font-semibold !leading-6 !text-white md:!text-[0.98rem]">
                  {item.title}
                </h3>
                <p className="!mt-2 !text-[0.62rem] !leading-6 !text-[#a8bdd8] md:!text-[0.78rem] md:!leading-7">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}



function Footer() {
  return (
    <footer className="site-footer !flex !items-center !justify-center !gap-3 !border-t !border-white/10 !px-3 !py-4 md:!px-6 md:!py-3">
      <span className="foot-credit !text-[0.8rem] !text-white md:!text-[0.1rem]">
        Made with <span className="text-red-400">♥</span> by <a className="font-bold text-white" href="https://flowpandas.com/"><span className="text-orange-500">Flow</span><span className="text-white">Pandas</span></a> 
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
    <main className=" relative z-20 overflow-x-hidden bg-black text-[#d8e8f8]">
      <Navbar/>
      <Hero/>
                          <Ticker/>

            <HomeSeatMap seats={seatItems} />

      <div className='px-2'>   

      <AnimatedVideo/>
        </div>
        <WhyChoose/>



 

            <ExamTable/>

      <GalleryShowcase
        images={galleryItems.length>0
          ?galleryItems.map((item)=>({src:item.image,label:item.label,width:item.width,height:item.height,aspectRatio:item.aspectRatio}))
          :galleryImages}
      />
      <CabinsSection/>
      <div className="divider"/>
      <NewsSection/>
      <AchieversSection/>
      <UpcomingProjectsSection/>
      <AddressSection/>
      <ContactSection/>
      <Quote/>
      <Footer/>

      <div className="flex fixed bottom-4 right-4  z-10 ">
            <a href="https://wa.me/919862285344" className=" !inline-flex !items-center !rounded-full !bg-[linear-gradient(135deg,#1db56a,#14a05e)] !p-2 !text-[0.65rem] !font-semibold !text-white md:!px-5 md:!py-3 md:!text-[0.85rem]">
              <MessageCircle/>
            </a>
</div>
    </main>
  );
}
