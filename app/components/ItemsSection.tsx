"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import fallbackItems from "../data/items";

export default function ItemsSection() {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((p: any) => {
            const localFallback = fallbackItems.find((i) => i.slug === p.slug);
            return {
              id: p.id || String(p._id),
              name: p.name,
              slug: p.slug,
              desc: p.desc || localFallback?.desc || `${p.name} - Quality construction tool`,
              price: p.price || `₹${p.dailyRate} per day`,
              icon: localFallback?.icon || "🪵"
            };
          });
          setItemsList(formatted);
        }
      } catch (err) {
        console.error("Failed to load homepage items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  const displayItems = itemsList.length > 0 ? itemsList.slice(0, 8) : fallbackItems.slice(0, 8);

  return (
    <section id="items" className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* TOP TEXT */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium text-[#1251A3] tracking-wide uppercase font-mono">KIRAYA ITEMS</p>

            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-[#0D1B2A] mt-3 font-[var(--font-syne)]">
              Hamare Saare Samaan
            </h2>

            <p className="text-base leading-[1.7] text-gray-600 mt-4 max-w-2xl font-[var(--font-dm-sans)]">
              Chali, Balli, Patra aur construction materials — jo chahiye wo select karo aur bill banao. Delivery + Installation sab included!
            </p>
          </div>

          <Link href="/items" className="text-sm font-bold text-[#1251A3] hover:underline flex-shrink-0">
            Saara Catalog Dekhein →
          </Link>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1251A3]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayItems.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="group border border-blue-100/60 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#1251A3] bg-white flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* INITIAL AREA */}
                  <div className="w-12 h-12 rounded-xl bg-[#E3F0FF] flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-all duration-250">
                    {item.icon && !item.icon.includes(".") ? (
                      <span>{item.icon}</span>
                    ) : (
                      <span className="font-heading font-extrabold text-sm text-[#1251A3]">{item.name.charAt(0)}</span>
                    )}
                  </div>

                  {/* NAME */}
                  <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#1251A3] transition-colors">
                    {item.name}
                  </h3>

                  {/* DESC */}
                  <p className="text-xs text-gray-600 mt-2 leading-[1.5] line-clamp-2 font-sans">
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
        )}
      </div>
    </section>
  );
}