"use client";
import Image from "next/image";
import heroImage from "../assets/hero.png";
import { useRouter } from "next/navigation";
import InfiniteSlider from "./components/InfiniteSlider";
import { chronologies } from "@/data/chronologies";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();
  const [achievers, setAchievers] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/achievers");
      const data = await res.json();
      setAchievers(data);
      setLoading(false);
    };

    load();
  }, []);

  const sortedAchievers = Array.isArray(achievers)
    ? [...achievers].sort((a, b) => Number(a.year) - Number(b.year))
    : [];

  if (loading) {
    return (
      <p className="text-center text-sm text-gray-500 py-10">
        Loading achievers...
      </p>
    );
  }
  return (
    <div className="w-full mx-auto px-2 md:px-4 lg:px-20">
      {/* HERO SECTION */}
      <section className="">
        <Image
          src={heroImage}
          alt="Hero image"
          className="w-full h-auto md:h-120 object-center object-cover"
          priority
        />
      </section>

      {/* DETAILS */}
      <section className="flex flex-col md:flex-row items-center mt-10 gap-5 md:gap-8">
        <div className="flex flex-col w-full md:w-1/3 items-center">
          <h1 className="text-black tracking-widest font-black text-2xl">
            Welcome to EDUCAFE!
          </h1>
          <p className="text-xs font-light leading-tight">
            A quiet place for those who are truly trying.
          </p>
          <div className="text-[10px] md:text-sm text-justify font-light mt-6 flex flex-col gap-2">
            <p>
              Some arrive for their first important exam. Some return with
              renewed hope and quiet determination. EDUCAFE is for every such
              journey.
            </p>
            <p>
              More than a library, it is a calm corner of the world where
              distractions gently fade, silence feels reassuring, and effort is
              given the respect it deserves.
            </p>
            <p>
              Here, you learn at your own pace, pausing, reflecting, restarting
              stronger, and growing steadily with time.
            </p>
            <p>
              Whether your path leads through Boards, NEET, JEE, SSC, Banking,
              or UPSC, this space honours your commitment.
            </p>
            <p>
              No pressure. No noise. Only focus, consistency, and the quiet
              power of daily effort.
            </p>
            <p> Come with questions. Leave with clarity.</p>
          </div>
          <button
            onClick={() => router.push("/about")}
            className="bg-[#16424a] my-5 font-semibold py-1 px-4 rounded-sm text-white"
          >
            Learn More
          </button>
        </div>
        <div className="w-full md:w-2/3">
          <InfiniteSlider />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-10">
        <h1 className="text-center tracking-widest text-[#16424a] font-black text-2xl md:text-4xl mb-6">
          Chronological Exam Timeline – 2026
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-[#16424a] rounded-lg overflow-hidden">
            <thead className="bg-[#16424a] text-white">
              <tr>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm">
                  Exam
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm">
                  Category
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm">
                  Application Dates
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm">
                  Exam Dates
                </th>
              </tr>
            </thead>

            <tbody>
              {chronologies.map((item, i) => (
                <tr
                  key={i}
                  className="border-t border-[#16424a] hover:green-[#16424a] transition"
                >
                  <td className="px-2 py-2 md:px-4 md:py-3    text-xs md:text-sm font-medium">
                    {item.exam}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3    text-xs md:text-sm text-gray-700">
                    {item.category}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3    text-xs md:text-sm text-gray-600">
                    {item.application}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3    text-xs md:text-sm text-gray-600">
                    {item.examDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ACHIEVERS */}
      <section className="py-10">
        <h1 className="text-center tracking-widest text-[#16424a] font-black text-lg md:text-2xl mb-8">
          OUR ACHIEVERS
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sortedAchievers.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#16424a]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-center scale-115"
                />
              </div>

              <p className="mt-3 font-semibold text-gray-800 text-sm md:text-base">
                {p.gender === "male"
                  ? "Mr. "
                  : p.gender === "female"
                  ? "Ms. "
                  : "Dr. "}
                {p.name}
              </p>

              <p className="text-xs md:text-sm text-gray-600">{p.exam}</p>

              <p className="text-xs md:text-sm font-medium text-[#16424a]">
                {p.year}
              </p>
            </div>
          ))}
          <div
            key={"sildjl"}
            className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#16424a]">
              <img
                src="https://i.pinimg.com/1200x/54/6b/0a/546b0a6d1b6bb7268b4a1faacab536c6.jpg"
                alt=""
                className="w-full h-full object-cover object-center scale-115"
              />
            </div>

            <p className="mt-3 font-semibold text-gray-800 text-sm md:text-base">
              You can be the Next Achiever.
            </p>

            <p className="text-xs md:text-sm text-gray-600">Can you?</p>

            <p className="text-xs md:text-sm font-medium text-[#16424a]"></p>
          </div>
        </div>
      </section>
    </div>
  );
}
