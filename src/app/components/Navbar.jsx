"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "SeatChart", link: "/seating" },
    { name: "Animated Video", link: "/video" },
    { name: "gallery", link: "/gallery" },
    { name: "About", link: "/about" },
  ];

  return (
    <nav className="w-full bg-white mb-2">
      <div className="flex items-center justify-between mx-auto px-4 md:px-6 lg:px-20 py-3">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Image
            src={logo}
            alt="Edu-Cafe"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-lg font-extrabold text-gray-800">EDUCAFE</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((nav) => (
            <button
              key={nav.link}
              onClick={() => router.push(nav.link)}
              className={`uppercase tracking-[8px] transition
                ${
                  pathname === nav.link
                    ? "font-bold text-black"
                    : "font-light text-gray-500 hover:text-black"
                }
              `}
            >
              {nav.name}
            </button>
          ))}
          <button
            onClick={() => router.push("/contact")}
            className="bg-[#16424a] ml-10 font-semibold py-1 px-4 rounded-sm text-white"
          >
            Contact us
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-[2px] bg-black" />
          <span className="w-6 h-[2px] bg-black" />
          <span className="w-6 h-[2px] bg-black" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          {navItems.map((nav) => (
            <button
              key={nav.link}
              onClick={() => {
                router.push(nav.link);
                setOpen(false);
              }}
              className={`block w-full text-left uppercase tracking-widest transition
                ${
                  pathname === nav.link
                    ? "font-semibold text-black"
                    : "font-light text-gray-500"
                }
              `}
            >
              {nav.name}
            </button>
          ))}

          <button
            onClick={() => {
              router.push("/contact");
              setOpen(false);
            }}
            className="w-full bg-[#16424a] font-semibold py-2 rounded-sm text-white"
          >
            Contact us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
