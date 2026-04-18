export default function AnnouncementBar() {
  const announcements = [
    "🌱 Naya Stock — Bamboo Balli 50% OFF iska saal!",
    "🚚 FREE Delivery — Hardoi + 30km radius par ₹2000 se upar",
    "🔨 Expert Mistri — Same day service available ab!",
    "⭐ Verified Quality — 500+ Happy Customers",
    "📞 Call Now — 9580716752 (Open 8AM - 8PM)",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 sm:py-3">
      {/* Blur Left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 md:w-20 bg-gradient-to-r from-blue-700 via-blue-700 to-transparent z-10" />

      {/* Blur Right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 md:w-20 bg-gradient-to-l from-blue-700 via-blue-700 to-transparent z-10" />

      {/* Moving Track */}
      <div className="flex w-max animate-marquee gap-6 sm:gap-10 md:gap-16">
        {[...announcements, ...announcements].map((text, index) => (
          <span
            key={index}
            className="whitespace-nowrap text-xs sm:text-sm md:text-[13px] font-medium"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}