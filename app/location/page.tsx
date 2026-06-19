"use client";
import React from "react";
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
  Sparkles,
  ShieldCheck,
  Star,
  Award,
  Heart,
  Users
} from "lucide-react";

export default function LocationPage() {
  const contactData = {
    phone: "+919580716752",
    whatsapp: "919580716752",
    email: "aaqilmansoorias@gmail.com",
    instagram: "@aaqilmansoori143",
    instaLink: "https://instagram.com/aaqilmansoori143",
    mapLink: "https://maps.google.com/?q=Muneem+Timber+Store,Hardoi,UP",
    timings: "8:00 AM - 10:00 PM"
  };

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen text-[#0D1B2A] pb-24 font-sans overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-[#1251A3] via-[#0A3578] to-slate-900 text-white py-20 md:py-28 px-6 text-center overflow-hidden">
          {/* Decorative mesh background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-[#FF6B2B]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs tracking-[0.14em] uppercase text-[#E3F0FF] bg-white/10 border border-white/20 px-4 py-1.5 rounded-full font-bold backdrop-blur-md">
              <Sparkles size={12} className="text-[#FF6B2B]" />
              Visit Our Branch
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              Muneem Timber Store <br />
              <span className="text-[#90CAF9]">Radha Nagar, Hardoi</span>
            </h1>

            <p className="text-white/80 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
              Hardoi aur aas-paas ke areas mein Shuttering Patra, Balli, Scaffolding materials rent karne aur expert construction services book karne ke liye hamari primary branch visit karein.
            </p>
          </div>
        </section>

        {/* HERITAGE & LEGACY SECTION */}
        <section className="max-w-7xl mx-auto px-6 mt-[-32px] relative z-20">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#1251A3]/10 shadow-[0_15px_50px_rgba(18,81,163,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center flex-shrink-0">
                <Award size={32} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">
                  Serving Hardoi Since 1995
                </h3>
                <p className="text-xs text-[#64748B] font-semibold">
                  Founded by Late Mr. Anees Mansoori
                </p>
              </div>
            </div>

            <div className="h-[1px] md:h-12 w-full md:w-[1px] bg-slate-200" />

            <div className="text-center md:text-left">
              <span className="text-xs font-mono font-bold text-[#1251A3] block uppercase tracking-wider">Our Heritage Motto</span>
              <p className="font-heading italic text-sm text-[#0D1B2A] mt-1">
                "Ek Virasat Jo Aaj Bhi Logon Ka Sabse Bada Bharosa Hai"
              </p>
            </div>

            <div className="h-[1px] md:h-12 w-full md:w-[1px] bg-slate-200" />

            <a
              href={`tel:${contactData.phone}`}
              className="w-full md:w-auto bg-[#FF6B2B] hover:bg-[#E55A1F] text-white text-center px-6 py-3 rounded-xl text-xs font-bold transition shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              Direct Support
            </a>
          </div>
        </section>

        {/* INTERACTIVE MAP + CONTACT GRID */}
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* MAP COLUMN */}
            <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#1251A3]/10 shadow-sm group">
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
                  <h4 className="font-bold text-xs text-[#0D1B2A] flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-[#1251A3]" />
                    Need Site Navigation?
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Google Maps layout pe live directions open karein.</p>
                </div>
                <a
                  href={contactData.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-5 py-3 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-1.5 active:scale-95"
                >
                  Open in Google Maps
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* CONTACT CARDS COLUMN */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#1251A3] uppercase tracking-wider">Quick Connect</span>
                <h2 className="text-xl md:text-2xl font-extrabold font-heading text-[#0D1B2A]">Store Contact Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Address */}
                <div className="bg-white rounded-2xl p-5 border border-[#1251A3]/8 shadow-sm hover:shadow-md transition duration-300 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1251A3] flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">Our Address</h3>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      Radha Nagar gali ke samne, Bilgram Road, Hardoi, UP (241001)
                    </p>
                  </div>
                </div>

                {/* Call */}
                <div className="bg-white rounded-2xl p-5 border border-[#1251A3]/8 shadow-sm hover:shadow-md transition duration-300 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">Call Us</h3>
                    <a
                      href={`tel:${contactData.phone}`}
                      className="text-xs text-[#1251A3] font-extrabold hover:underline block mt-1"
                    >
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-white rounded-2xl p-5 border border-[#1251A3]/8 shadow-sm hover:shadow-md transition duration-300 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">WhatsApp Chat</h3>
                    <a
                      href={`https://wa.me/${contactData.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 font-extrabold hover:underline block mt-1"
                    >
                      {contactData.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-5 border border-[#1251A3]/8 shadow-sm hover:shadow-md transition duration-300 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B2B] flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">Email Support</h3>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-xs text-[#FF6B2B] font-extrabold hover:underline block mt-1 truncate"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="bg-white rounded-2xl p-5 border border-[#1251A3]/8 shadow-sm hover:shadow-md transition duration-300 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">Instagram</h3>
                    <a
                      href={contactData.instaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-pink-600 font-extrabold hover:underline block mt-1"
                    >
                      {contactData.instagram}
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="bg-white rounded-2xl p-5 border border-[#1251A3]/8 shadow-sm hover:shadow-md transition duration-300 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">Store Timings</h3>
                    <p className="text-xs text-slate-800 font-extrabold block mt-1">
                      {contactData.timings}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* WHY CHOOSE US CHECKLIST */}
        <section className="bg-[#F0F6FF] py-16 px-6 border-y border-[#1251A3]/10 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <span className="text-[10px] font-mono font-bold text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full uppercase tracking-wider">
                Why Choose Muneem Store
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-[#0D1B2A]">
                Hamari Khasiyat
              </h2>
              <p className="text-xs md:text-sm text-[#64748B] max-w-sm mx-auto">
                Built on Trust, Honesty and Quality Work for generations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              
              {/* Option 1 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto">
                  <Star size={18} className="fill-[#1251A3]" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A]">Since 1995</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  30+ saal se Hardoi ke har chhote-bade project ka sathi.
                </p>
              </div>

              {/* Option 2 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A]">Trusted Local</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Hardoi city and adjacent tehsils mein verified registration.
                </p>
              </div>

              {/* Option 3 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto">
                  <Award size={18} />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A]">Quality Timber</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Premium Quality Bamboo Balli, Patra, Chali aur centering materials.
                </p>
              </div>

              {/* Option 4 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto">
                  <Users size={18} />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A]">Skilled Team</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Experienced Raj Mistri, Plumber, Electrician dynamic profiles.
                </p>
              </div>

              {/* Option 5 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto">
                  <Heart size={18} className="fill-[#1251A3]" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0D1B2A]">Honest Pricing</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Anees Mansoori legacy ke mutabik bina kisi hidden charge ke.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* DELIVERY Reach section */}
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-center text-[#0D1B2A] mb-12">
            Our Delivery & Logistics Reach
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Reach 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm hover:shadow-md transition duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center">
                <Truck size={24} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#0D1B2A]">Hardoi City Delivery</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Hardoi town limits aur local sectors me same-day loading aur dispatch options site setup guidelines ke sath.
              </p>
            </div>

            {/* Reach 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm hover:shadow-md transition duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center">
                <Truck size={24} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#0D1B2A]">Regional Blocks Dispatch</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Bilgram, Sandila, Shahabad, Sandi aur nearby tehsil blocks ke rural limits me material loading logistics.
              </p>
            </div>

            {/* Reach 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm hover:shadow-md transition duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center">
                <Truck size={24} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#0D1B2A]">Bulk Site Hauling</h3>
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