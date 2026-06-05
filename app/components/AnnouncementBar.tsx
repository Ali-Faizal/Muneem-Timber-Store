export default function AnnouncementBar() {
  const announcements = [
    "🌱 Naya Stock — Bamboo Balli 50% OFF iska saal!",
    "🚚 FREE Delivery — Hardoi + 30km radius par ₹2000 se upar",
    "🔨 Expert Mistri — Same day service available ab!",
    "⭐ Verified Quality — 500+ Happy Customers",
    "📞 Call Now — 9580716752 (Open 8AM - 8PM)",
  ];

  return (
    <div className="relative flex items-center h-[42px] overflow-hidden bg-[#0A3578]">
      
      {/* Blur Left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-16 md:w-20 bg-gradient-to-r from-[#0A3578] via-[#0A3578] to-transparent z-10" />

      {/* Blur Right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-16 md:w-20 bg-gradient-to-l from-[#0A3578] via-[#0A3578] to-transparent z-10" />

      {/* Moving Track */}
      <div className="flex whitespace-nowrap animate-marquee gap-4 sm:gap-8 md:gap-12">
        {[...announcements, ...announcements].map((text, index) => (
          <div key={index} className="flex items-center">
            
            {/* Pill */}
            <span className="font-mono text-[9px] sm:text-[10px] font-bold px-2 py-[2px] rounded-full bg-white text-[#0A3578]">
            M.T.S
            </span>

            {/* Text */}
            <span className="ml-2 text-[11px] sm:text-xs md:text-[13px] font-medium text-[#E8F0FE]">
              {text}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}