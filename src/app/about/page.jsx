import React from "react";

const facilities = [
  "Air Conditioned",
  "High-Speed Wi-Fi Connectivity",
  "Clean Drinking Water",
  "Spacious Cabins",
  "24 Hour House Supply",
  "Daily Newspapers, Magazines, Books & Study Materials",
  "Discussion Area",
  "Leisure Space",
  "Cafeteria and More",
];

const seatingPlans = [
  { plan: "Seat Reservation", cost: "₹1400 / Month" },
  { plan: "5:00 AM – 10:00 AM", cost: "₹700 / Month" },
  { plan: "10:00 AM – 2:00 PM", cost: "₹800 / Month" },
  { plan: "10:00 AM – 4:00 PM", cost: "₹900 / Month" },
  { plan: "2:00 PM – 6:00 PM", cost: "₹700 / Month" },
  { plan: "6:00 PM – 12:00 AM", cost: "₹800 / Month" },
];

const page = () => {
  return (
    <div className="w-full text-white px-2 md:px-4 lg:px-20">
      {/* FACILITIES */}
      <section className="bg-[#16424a] px-4 md:px-20 flex flex-col gap-10 items-center py-16">
        <h1 className=" text-center tracking-widest font-black text-2xl">
          Premium Facilities
        </h1>
        <div className="p-4 w-full border border-white rounded-md">
          <ul className="list-disc pl-6 flex flex-col gap-3">
            {facilities.map((fac, i) => (
              <li key={i} className="text-xs md:text-base">
                {fac}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SEAT ARRANGEMENT */}
      <section className="bg-white text-black py-16 px-4">
        <div className="w-fit mx-auto flex flex-col gap-0 leading-none">
          <h1 className="text-6xl md:text-8xl text-[#16424a] font-bold leading-none m-0 p-0">
            Booking
          </h1>
          <h1 className="text-6xl md:text-8xl text-[#16424a] font-bold leading-none m-0 p-0 -mt-2 md:-mt-4">
            Opens
          </h1>
        </div>

        <p className="p-2 bg-[#16424a] mx-auto w-fit font-bold mt-12 rounded-2xl text-lg md:text-2xl text-white">
          LIMITED SEATS
        </p>
        <p className="text-center mt-5 font-md text-black text-xl md:text-2xl ">
          First Come, First Served.
        </p>
        <div className="border-y-5 my-5 max-w-5xl p-3 border-[#16424a] mx-auto">
          <p className="text-center font-semibold text-[#16424a]">
            TIME SLOTS & FEE STRUCTURE
          </p>
        </div>
        <p className="p-2 py-1 bg-[#16424a] mx-auto w-fit font-medium mt-12 rounded-2xl text-md md:text-xl text-white">
          Registration Fee: ₹300
        </p>
        <div className="max-w-5xl mx-auto mt-10 grid gap-4 ">
          {seatingPlans.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-1 py-2 hover:bg-green-50 transition"
            >
              <div className="flex items-center gap-3">
                {/* Diamond Arrow */}
                <span className="w-3 h-3 bg-[#16424a] rotate-45 inline-block"></span>

                <p className="font-semibold text-lg text-[#16424a]">
                  {item.plan}:
                </p>
              </div>

              <p className="text-sm text-gray-600">{item.cost}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
