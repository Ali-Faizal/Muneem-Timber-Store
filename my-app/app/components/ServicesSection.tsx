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
    <section id="services" className="bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-12">
          <p className="text-[11px] font-medium text-blue-600 tracking-wide">HAMARI SERVICES</p>

          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 mt-3">
            Sirf Kiraya Nahi — Poora Ghar Banwao
          </h2>

          <p className="text-base leading-[1.7] text-gray-700 mt-4 max-w-2xl">
            Timber kiraye ke saath hum aapko poori construction team, mistri, plumber, electrician — sab kuch ek jagah se dete hain.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {services.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-[20px] p-7 border border-blue-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
            >
              {/* TOP BORDER ANIMATION */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>

              {/* ICON */}
              <div className="text-blue-600 text-3xl mb-4">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-[18px] font-bold text-gray-900">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-[13.5px] leading-[1.65] text-gray-700 mt-3">
                {item.desc}
              </p>

              {/* TAGS */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}   