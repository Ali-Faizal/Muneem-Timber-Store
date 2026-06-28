"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHammer, FaHome, FaWrench, FaTools, FaBolt, FaPhone } from "react-icons/fa";

/**
 * @param {{service: {featured?: boolean, title: string, desc: string, tags: string[], cta: string}}} props
 */
export default function ServiceCard(props: any) {
  const service = props.service;
  const phone = "919580716752";

  let linkHref = `tel:${phone}`;
  if (service.title.includes("Timber Kiraya")) {
    linkHref = "/items";
  } else if (service.title.includes("Construction")) {
    linkHref = "/contact";
  } else if (service.title.includes("Mistri")) {
    linkHref = "/services/mistri";
  } else if (service.title.includes("Plumber")) {
    linkHref = "/services/plumber";
  } else if (service.title.includes("Electrician")) {
    linkHref = "/services/electrician";
  } else if (service.title.includes("Emergency Manpower")) {
    linkHref = "/services/emergency-manpower";
  }

  let IconComponent = FaWrench;
  if (service.title.includes("Timber Kiraya")) {
    IconComponent = FaHammer;
  } else if (service.title.includes("Construction")) {
    IconComponent = FaHome;
  } else if (service.title.includes("Mistri")) {
    IconComponent = FaWrench;
  } else if (service.title.includes("Plumber")) {
    IconComponent = FaTools;
  } else if (service.title.includes("Electrician")) {
    IconComponent = FaBolt;
  } else if (service.title.includes("Manpower")) {
    IconComponent = FaPhone;
  }

  return (
    <motion.div
      whileHover={{ 
        y: -6,
        scale: 1.01,
        boxShadow: "0 20px 35px rgba(18, 81, 163, 0.08)",
        borderColor: service.featured ? "#1251A3" : "rgba(18, 81, 163, 0.5)"
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[20px] p-7 border transition-colors group
      ${
        service.featured
          ? "bg-[#1251A3] border-[#1251A3] text-white"
          : "bg-white border-[rgba(18,81,163,0.12)]"
      }`}
    >
      {/* Top Hover Line */}
      {!service.featured && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#1251A3] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      )}

      {/* Icon Box */}
      <div
        className={`w-[52px] h-[52px] rounded-[14px] mb-[18px] flex items-center justify-center text-xl
        ${
          service.featured
            ? "bg-white/20 text-white"
            : "bg-[#E3F0FF] text-[#1251A3]"
        }`}
      >
        <IconComponent size={20} />
      </div>

      {/* Title */}
      <h3
        className={`text-[18px] font-bold mb-2 font-[var(--font-syne)]
        ${service.featured ? "text-white" : "text-[#0D1B2A]"}`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={`text-[13.5px] leading-[1.65] mb-[18px] font-[var(--font-dm-sans)]
        ${service.featured ? "text-white/80" : "text-[#64748B]"}`}
      >
        {service.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag: string, i: number) => (
          <span
            key={i}
            className={`px-2.5 py-[3px] rounded-full text-[11px] tracking-[0.04em] font-[var(--font-dm-mono)]
            ${
              service.featured
                ? "bg-white/20 text-white"
                : "bg-[#E3F0FF] text-[#1251A3]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={linkHref}
        className={`block mt-[18px] text-[13px] font-semibold
        ${service.featured ? "text-white" : "text-[#1251A3]"}`}
      >
        {service.cta}
      </Link>
    </motion.div>
  );
}