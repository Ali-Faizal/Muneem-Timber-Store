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
    name: "Plai",
    desc: "Plywood sheets — false ceiling aur shuttering",
    price: 12,
    icon: <FaSquare />,
  },
  {
    name: "Centering Plate",
    desc: "Steel plates — slab construction ke liye",
    price: 15,
    icon: <FaGripLines />,
  },
];

export default function ItemsSection() {
  return (
    <div className="px-4 md:px-10 py-10">

      {/* TOP TEXT */}
      <div className="mb-8">
        <p className="text-sm text-blue-500 font-medium">Kiraya Items</p>

        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Hamare Saare Samaan
        </h1>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Photo dekho, rate samjho — jo chahiye wo select karo aur bill banao
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 
            transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-[rgb(182, 209, 240)]- hover:shadow-md"
          >

            {/* ICON */}
            <div className="text-blue-500 text-xl mb-3">
              {item.icon}
            </div>

            {/* NAME */}
            <h2 className="font-semibold text-gray-800">
              {item.name}
            </h2>

            {/* DESC */}
            <p className="text-xs text-gray-500 mt-1">
              {item.desc}
            </p>

            {/* PRICE */}
            <p className="text-blue-600 font-medium mt-3 text-sm ">
              ₹{item.price} / din
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}