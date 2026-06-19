"use client";

import Link from "next/link";
import items from "../data/items";

export default function ItemsSection() {
  return (
    <section id="items" className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* TOP TEXT */}
        <div className="mb-12">
          <p className="text-[11px] font-medium text-[#1251A3] tracking-wide uppercase font-mono">KIRAYA ITEMS</p>

          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-[#0D1B2A] mt-3 font-[var(--font-syne)]">
            Hamare Saare Samaan
          </h2>

          <p className="text-base leading-[1.7] text-gray-600 mt-4 max-w-2xl font-[var(--font-dm-sans)]">
            Chali, Balli, Patra aur construction materials — jo chahiye wo select karo aur bill banao. Delivery + Installation sab included!
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="group border border-blue-100/60 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#1251A3] bg-white flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* INITIAL AREA */}
                <div className="w-12 h-12 rounded-xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center text-xl font-heading font-extrabold mb-4 group-hover:scale-105 transition-all duration-250">
                  {item.name.charAt(0)}
                </div>

                {/* NAME */}
                <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#1251A3] transition-colors">
                  {item.name}
                </h3>

                {/* DESC */}
                <p className="text-xs text-gray-600 mt-2 leading-[1.5] line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* PRICE */}
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-50">
                <p className="text-[#1251A3] font-bold text-[13px] font-mono">
                  {item.price}
                </p>
                <span className="text-xs font-bold text-[#FF6B2B] group-hover:underline">
                  Get Rent →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}