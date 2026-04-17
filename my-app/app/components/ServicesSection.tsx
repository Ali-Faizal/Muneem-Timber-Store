"use client";

import { FaHammer, FaHome, FaWrench, FaTools, FaBolt, FaPhone } from "react-icons/fa";

const services = [
  {
    title: "Timber Kiraya",
    desc: "Balli, Patra, Teen, Bans, Gatur — sab kuch premium quality mein.",
    tags: ["Chali", "Balli", "Patra", "Teen"],
    icon: <FaHammer />,
  },
  {
    title: "Ghar Construction",
    desc: "Foundation se lekar chhat tak full construction.",
    tags: ["Construction", "Renovation"],
    icon: <FaHome />,
  },
  {
    title: "Mistri / Raj Mistri",
    desc: "Brick work, plastering, roofing — sab kaam.",
    tags: ["Brick", "Plaster", "Roofing"],
    icon: <FaWrench />,
  },
  {
    title: "Plumber",
    desc: "Bathroom fitting, drainage, pipeline ka kaam.",
    tags: ["Pipe", "Drainage"],
    icon: <FaTools />,
  },
  {
    title: "Electrician",
    desc: "Wiring, fan fitting, switchboard ka kaam.",
    tags: ["Wiring", "Fan"],
    icon: <FaBolt />,
  },
  {
    title: "Aaj Hi Sampark Karein",
    desc: "Call ya WhatsApp karein — free estimate milega.",
    tags: [],
    icon: <FaPhone />,
  },
];

export default function ServicesSection() {
  return (
    <div className="bg-[#E3F0FF] px-4 md:px-10 py-12">

      {/* HEADING */}
      <div className="mb-10">
        <p className="text-sm text-blue-500 font-medium">Hamari Services</p>

        <h2 className=" bg-white/20 text-2xl md:text-4xl font-bold text-gray-800">
          Sirf Kiraya Nahi —
          <span className="text-blue-600"> Poora Ghar Banwao Humse</span>
        </h2>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Timber kiraye ke saath hum aapko poori construction team bhi dete hain
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((item, i) => (
          <div
            key={i}
            className="group bg-white p-6 rounded-xl border border-gray-200 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg relative overflow-hidden"
          >

            {/* TOP BORDER ANIMATION */}
            <div className="absolute top-0 left-0 h-[3px] w-0 bg-blue-600 
            transition-all duration-300 group-hover:w-full"></div>

            {/* ICON */}
            <div className="text-blue-600 text-xl mb-4">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-500 mt-2">
              {item.desc}
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}   