"use client";

import { FaEquals, FaPlus, FaSquare, FaGripLines } from "react-icons/fa";

const items = [
  {
    name: "Balli",
    desc: "Bamboo poles — ghar construction mein scaffolding ke liye",
    price: 5,
    icon: <FaEquals />,
  },
  {
    name: "Patra",
    desc: "Tin sheets — chhat dhakne aur siding ke liye",
    price: 8,
    icon: <FaPlus />,
  },
  {
    name: "Chali",
    desc: "Wooden planks — formwork aur shuttering ke liye",
    price: 6,
    icon: <FaSquare />,
  },
  {
    name: "Gatur",
    desc: "Heavy timber — load bearing beams ke liye",
    price: 10,
    icon: <FaGripLines />,
  },
  {
    name: "Bans",
    desc: "Long bamboo — lightweight framework ke liye",
    price: 4,
    icon: <FaEquals />,
  },
  {
    name: "Teen",
    desc: "Corrugated iron sheets — roofing ke liye",
    price: 7,
    icon: <FaPlus />,
  },
  {
    name: "Teen",
    desc: "Corrugated iron sheets — roofing ke liye",
    price: 7,
    icon: <FaPlus />,
  },
  {
    name: "Teen",
    desc: "Corrugated iron sheets — roofing ke liye",
    price: 7,
    icon: <FaPlus />,
  },
];

export default function ItemsSection() {
  return (
    <section id="items" className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* TOP TEXT */}
        <div className="mb-12">
          <p className="text-[11px] font-medium text-blue-600 tracking-wide">KIRAYA ITEMS</p>

          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 mt-3">
            Hamare Saare Samaan
          </h2>

          <p className="text-base leading-[1.7] text-gray-600 mt-4 max-w-2xl">
            Chali, Balli, Patra aur construction materials — jo chahiye wo select karo aur bill banao. Delivery + Installation sab included!
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-blue-100 rounded-2xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-600"
            >
              {/* ICON */}
              <div className="text-blue-600 text-2xl mb-3">
                {item.icon}
              </div>

              {/* NAME */}
              <h3 className="text-[15px] font-bold text-gray-900">
                {item.name}
              </h3>

              {/* DESC */}
              <p className="text-xs text-gray-600 mt-1.5 leading-[1.5]">
                {item.desc}
              </p>

              {/* PRICE */}
              <p className="text-blue-700 font-bold mt-3 text-[13px]">
                ₹{item.price} / din
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}