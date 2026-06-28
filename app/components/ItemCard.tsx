"use client";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ItemCard({ item }: { item: any })  {
  return (
    <Link href={`/products/${item.slug}`} className="block h-full">
      <motion.div 
        whileHover={{ 
          y: -6,
          scale: 1.01,
          boxShadow: "0 20px 35px rgba(18, 81, 163, 0.08)",
          borderColor: "rgba(18, 81, 163, 0.5)"
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white border border-[rgba(18,81,163,0.12)] rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col justify-between"
      >

        {/* Image Area */}
        <div className="bg-[#E3F0FF] h-[100px] flex items-center justify-center text-4xl">
          {item.icon && !item.icon.includes(".") ? (
            <span>{item.icon}</span>
          ) : (
            <span className="font-[var(--font-syne)] text-xl font-extrabold text-[#1251A3]">{item.name.charAt(0)}</span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-[var(--font-syne)] text-[15px] font-bold text-[#0D1B2A]">
              {item.name}
            </h3>

            <p className="font-[var(--font-dm-sans)] text-[12px] text-[#64748B] leading-[1.5] mt-1 line-clamp-2">
              {item.desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="font-[var(--font-dm-mono)] text-[13px] font-semibold text-[#1251A3]">
              {item.price}
            </span>

            <span className="w-7 h-7 bg-[#1251A3] text-white rounded-md flex items-center justify-center hover:bg-[#0A3578] transition">
              <FaPlus size={10} />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
