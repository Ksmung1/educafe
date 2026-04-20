"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Address", href: "#address" },
  { name: "Gallery", href: "#gallery" },
  { name: "News", href: "#news" },
  { name: "Exams", href: "#exams" },
  { name: "Seats", href: "#seats" },
  { name: "Achievers", href: "#achievers" },
  { name: "Projects", href: "#projects" },
  { name: "Animated Video", href: "/video" },
  { name: "Contact", href: "#contact" },
];

const isHashLink = (href) => href.startsWith("#");

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  const handleNavigate = (href) => {
    setOpen(false);

    if (!isHashLink(href)) {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (!isHashLink(href)) return pathname === href;
    return false;
  };

  return (
    <nav ref={navRef} className="fixed left-1/2 top-0 z-[950] w-[min(1200px,calc(100%-0.5rem))] -translate-x-1/2 rounded-b-[14px] border border-t-0 border-white/10 bg-[rgba(5,8,15,0.9)] px-3 py-2 backdrop-blur-xl md:px-6 md:py-3">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:flex lg:items-center lg:justify-between">
        <button
          type="button"
          onClick={() => handleNavigate("/")}
          className="flex min-w-0 items-center justify-self-start gap-2"
          aria-label="Go to home page"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-green-400 bg-white md:h-10 md:w-10">
            <Image
              src={logo}
              alt="EduCafe logo"
              fill
              sizes="40px"
              className="object-cover object-center"
              priority
            />
          </div>
          <span className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white md:text-[0.95rem]">
            EduCafe
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavigate(item.href)}
              className={`rounded-full px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.1em] transition-colors ${
                isActive(item.href)
                  ? "bg-white/8 text-white"
                  : "text-[#a8bdd8] hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="relative flex justify-self-end lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="flex flex-col gap-1">
              <span
                className={`block h-0.5 w-4 bg-white transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-white transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-white transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          {open ? (
            <div className="absolute right-0 top-full z-[960] mt-2 grid w-[min(320px,calc(100vw-1rem))] gap-2 rounded-[12px] border border-white/10 bg-[rgba(5,8,15,0.96)] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className={`rounded-[10px] px-3 py-2 text-center text-[0.72rem] font-medium uppercase tracking-[0.08em] transition-colors ${
                    isActive(item.href)
                      ? "bg-white/8 text-white"
                      : "text-[#d8e8f8] hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
