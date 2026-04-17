"use client";

export default function CallToAction() {
    const ctaData = {
  title: "Ek Call Mein Sab Kuch Ready",
  desc: "Kiraya, mistri, plumber, electrician — sab ek jagah se milega.",
  phone: "9580716752",
  whatsapp: "9580716752"
};
  return (
    <div className="bg-blue-700 text-white px-4 md:px-10 py-8">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">

        {/* LEFT TEXT */}
        <div className="text-center lg:text-left">
          <h2 className="text-xl md:text-3xl font-bold">
            {ctaData.title}
          </h2>

          <p className="text-sm md:text-base text-blue-100 mt-2">
            {ctaData.desc}
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">

          <a
            href={`tel:${ctaData.phone}`}
            className="bg-white text-blue-700 px-5 py-2 rounded-lg font-medium text-center"
          >
            📞 {ctaData.phone}
          </a>

          <a
            href={`https://wa.me/${ctaData.whatsapp}`}
            target="_blank"
            className="bg-green-500 text-white px-5 py-2 rounded-lg font-medium text-center"
          >
            WhatsApp Karo
          </a>

        </div>

      </div>
    </div>
  );
}