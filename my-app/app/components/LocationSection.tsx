"use client";

const infoCards = [
  {
    title: "Address",
    content: [
      "Muneem Timber Store",
      "Main Bazaar, Hardoi",
      "Uttar Pradesh — 241001",
    ],
  },
  {
    title: "Working Hours",
    content: [
      "Monday – Saturday",
      "8:00 AM – 8:00 PM",
      "🟢 Abhi Open Hai",
    ],
  },
  {
    title: "Contact",
    content: [
      "+91 98765 43210",
      "muneem.timber@gmail.com",
    ],
  },
  {
    title: "Delivery Area",
    content: [
      "Hardoi + 30km radius",
      "Free delivery on orders above ₹2000",
    ],
  },
];

export default function LocationSection() {
  return (
    <div className="bg-[#f8fbff] px-4 md:px-10 py-12">

      {/* TOP TEXT */}
      <div className="mb-8">
        <p className="text-sm text-blue-500 font-medium">Hamari Location</p>

        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Hardoi, <span className="text-blue-600">UP Mein Milein</span>
        </h2>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Google Maps pe location dekho ya seedha aa jao
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT MAP */}
        <div className="lg:col-span-2 w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border">
          <iframe
            src="https://www.google.com/maps?q=Hardoi%20Uttar%20Pradesh&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>

        {/* RIGHT CARDS */}
        <div className="flex flex-col gap-4">

          {infoCards.map((card, i) => (
            <div
              key={i}
              className="bg-[#E3F0FF] p-4 rounded-xl border border-blue-100"
            >
              <h3 className="text-xs text-blue-600 font-semibold uppercase mb-2">
                {card.title}
              </h3>

              {card.content.map((line, index) => (
                <p key={index} className="text-sm text-gray-700">
                  {line}
                </p>
              ))}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}