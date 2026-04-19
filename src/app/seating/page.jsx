"use client";

import { useEffect, useState } from "react";
import HomeSeatMap from "@/app/components/HomeSeatMap";

export default function SeatingChart() {
  const [seatItems, setSeatItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/seats", { cache: "no-store" });
        const data = await res.json();
        setSeatItems(Array.isArray(data) ? data : []);
      } catch {
        setSeatItems([]);
      }
    };

    load();
  }, []);

  return <HomeSeatMap seats={seatItems} />;
}
