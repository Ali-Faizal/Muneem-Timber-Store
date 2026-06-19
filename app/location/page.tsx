import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Truck,
  ArrowUpRight,
} from "lucide-react";

export default function LocationPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F0F6FF] min-h-screen pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#1251A3] bg-[#E3F0FF] px-4 py-1.5 rounded-full font-bold">
            Kiraya Store Location
          </span>

          <h1 className="text-4xl md:text-[3.4rem] font-heading font-extrabold text-[#0D1B2A] leading-tight mt-6 tracking-tight">
            Visit Muneem Timber Store
          </h1>

          <p className="text-[#64748B] max-w-2xl mx-auto mt-4 text-sm md:text-base font-[var(--font-dm-sans)] leading-relaxed">
            Hardoi aur nearby areas mein shuttering, balli, patra aur construction material rental services ke liye humse directly contact karein ya humari branch visit karein.
          </p>
        </section>

        {/* Map + Contact Grid */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* MAP COLUMN */}
            <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[rgba(18,81,163,0.12)] shadow-md group">
              <div className="relative overflow-hidden h-[380px] md:h-[480px]">
                <iframe
                  src="https://maps.google.com/maps?q=Hardoi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="border-0 group-hover:scale-[1.01] transition-transform duration-700"
                  loading="lazy"
                  title="Muneem Timber Store Map"
                />
              </div>

              <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                <div>
                  <h4 className="font-bold text-sm text-[#0D1B2A]">Need Site Navigation?</h4>
                  <p className="text-xs text-[#64748B]">Google maps par active direction check karein.</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Hardoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-5 py-3 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-1.5"
                >
                  Google Maps Pe Dekho
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* CONTACT CARDS COLUMN */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Address */}
                <div className="bg-white rounded-2xl p-5 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1251A3] flex items-center justify-center mb-4">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-[#0D1B2A] mb-1">Our Address</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Radha Nagar gali ke samne, Bilgram Road, Hardoi, UP
                  </p>
                </div>

                {/* Call */}
                <div className="bg-white rounded-2xl p-5 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                    <Phone size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-[#0D1B2A] mb-1">Call Us</h3>
                  <a
                    href="tel:+919580716752"
                    className="text-xs text-[#1251A3] font-bold hover:underline block mt-1"
                  >
                    +91 9580716752
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="bg-white rounded-2xl p-5 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <MessageCircle size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-[#0D1B2A] mb-1">WhatsApp Chat</h3>
                  <a
                    href="https://wa.me/919580716752"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 font-bold hover:underline block mt-1"
                  >
                    9580716752
                  </a>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-5 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B2B] flex items-center justify-center mb-4">
                    <Mail size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-[#0D1B2A] mb-1">Email Support</h3>
                  <a
                    href="mailto:aaqilmansoorias@gmail.com"
                    className="text-xs text-[#FF6B2B] font-bold hover:underline block mt-1 truncate"
                  >
                    aaqilmansoorias@gmail.com
                  </a>
                </div>

                {/* Instagram */}
                <div className="bg-white rounded-2xl p-5 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                    <MessageCircle size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-[#0D1B2A] mb-1">Instagram</h3>
                  <a
                    href="https://instagram.com/aaqilmansoori143"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-pink-600 font-bold hover:underline block mt-1"
                  >
                    @aaqilmansoori143
                  </a>
                </div>

                {/* Timings */}
                <div className="bg-white rounded-2xl p-5 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-[#0D1B2A] mb-1">Store Timings</h3>
                  <p className="text-xs text-slate-700 font-semibold block mt-1">
                    8:00 AM - 10:00 PM
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Delivery Areas Section */}
        <section className="max-w-7xl mx-auto px-4 mt-20">
          <h2 className="text-3xl font-heading font-extrabold text-center text-[#0D1B2A] mb-12">
            Our Delivery Reach
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Reach 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-base text-[#0D1B2A] mb-3">Hardoi City Delivery</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Hardoi town limits aur local sectors me same-day loading aur dispatch options site setup guidelines ke sath.
              </p>
            </div>

            {/* Reach 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-base text-[#0D1B2A] mb-3">Regional Blocks Dispatch</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Bilgram, Sandila, Shahabad, Sandi aur nearby tehsil blocks ke rural limits me material loading logistics.
              </p>
            </div>

            {/* Reach 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[rgba(18,81,163,0.08)] shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-base text-[#0D1B2A] mb-3">Bulk Site Hauling</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Bade infrastructure projects aur bulk material quantities loading (e.g. 5,000+ pieces) ke liye heavy haul options.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}