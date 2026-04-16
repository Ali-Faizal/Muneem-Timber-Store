export default function AnnouncementBar() {
  const announcements = [
    "🔥 Winter Prep Special: Furnace Checkup starting at 50% — Just $59",
    "💨 Breathe Easy — Duct Cleaning 20% Off This Month!",
    "❄️ AC Service Offer — Flat 30% Discount Today!",
    "🏠 Home Comfort Deal — Free Inspection Included!",
  ];

  return (
    <div className="relative w-full overflow-hidden text-white py-2 sm:py-3 md:py-4">

      {/* Blur Left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 md:w-20 bg-gradient-to-r from-white to-transparent z-10" />

      {/* Blur Right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 md:w-20 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Moving Track */}
      <div className="flex w-max animate-marquee gap-6 sm:gap-10 md:gap-16 text-black">

        {[...announcements, ...announcements, ...announcements].map((text, index) => (
          <span
            key={index}
            className="whitespace-nowrap text-xs sm:text-sm md:text-base font-medium"
          >
            {text}
          </span>
        ))}

      </div>
    </div>
  );
}