"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen text-[#0D1B2A] pb-24 font-sans overflow-x-hidden relative">
        
        {/* Decorative ambient background glows */}
        <div className="absolute top-[10%] left-[-15%] w-[500px] h-[500px] bg-[#1251A3]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[500px] h-[500px] bg-[#FF6B2B]/5 rounded-full blur-3xl pointer-events-none" />

        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-[#1251A3] via-[#0A3578] to-slate-900 text-white py-20 md:py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6 relative z-10"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs tracking-[0.14em] uppercase text-[#E3F0FF] bg-white/10 border border-white/20 px-4 py-1.5 rounded-full font-bold backdrop-blur-md">
              <Sparkles size={12} className="text-[#FF6B2B]" />
              Visit Our Branch
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              Muneem Timber Store <br />
              <span className="text-[#90CAF9] text-3xl md:text-5xl block mt-2">Radha Nagar, Hardoi</span>
            </h1>

            <p className="text-white/80 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
              Hardoi aur surrounding blocks me shuttering, scaffolding materials rent karne aur verified construction services book karne ke liye hamari Radha Nagar branch visit karein.
            </p>
          </motion.div>
        </section>

        {/* HERITAGE & LEGACY SECTION */}
        <section className="max-w-7xl mx-auto px-6 mt-[-32px] relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#1251A3]/10 shadow-[0_15px_50px_rgba(18,81,163,0.06)] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center flex-shrink-0 border border-[#1251A3]/5">
                <Award size={30} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">
                  Serving Hardoi Since 1995
                </h3>
                <p className="text-xs text-[#64748B] font-semibold">
                  A Legacy Built By Mr. Anees Mansoori
                </p>
              </div>
            </div>

            <div className="h-[1px] md:h-12 w-full md:w-[1px] bg-slate-100" />

            <div className="text-center md:text-left">
              <span className="text-xs font-mono font-bold text-[#1251A3] block uppercase tracking-wider">Heritage Motto</span>
              <p className="font-heading italic text-sm text-[#0D1B2A] mt-1 font-medium">
                "Ek Virasat Jo Aaj Bhi Logon Ka Sabse Bada Bharosa Hai"
              </p>
            </div>

            <div className="h-[1px] md:h-12 w-full md:w-[1px] bg-slate-100" />

            <a
              href={`tel:${contactData.phone}`}
              className="w-full md:w-auto bg-[#FF6B2B] hover:bg-[#E55A1F] text-white text-center px-6 py-3.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              Direct Support
            </a>
          </motion.div>
        </section>

        {/* MAP + CONTACT GRID */}
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* MAP COLUMN (Glassmorphic Container) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#1251A3]/10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] group flex flex-col justify-between"
            >
              <div className="relative overflow-hidden h-[380px] md:h-[450px] flex-grow">
                <iframe
                  src="https://maps.google.com/maps?q=Hardoi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="border-0 group-hover:scale-[1.01] transition-transform duration-700"
                  loading="lazy"
                  title="Muneem Timber Store Map Location"
                />
              </div>

              <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                <div>
                  <h4 className="font-bold text-xs text-[#0D1B2A] flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-[#1251A3]" />
                    Need Site Navigation?
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">Google Maps application par live coordinates load karein.</p>
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
            </motion.div>

            {/* CONTACT CARDS COLUMN */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#1251A3] uppercase tracking-widest bg-[#E3F0FF] border border-[#1251A3]/10 px-3 py-1 rounded-full">
                  Quick Connect
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold font-heading text-[#0D1B2A] pt-2">
                  Store Contact Directory
                </h2>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow"
              >
                {/* Card 1: Address */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 border border-[#1251A3]/10 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300 flex flex-col justify-between gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1251A3] flex items-center justify-center border border-[#1251A3]/5 group-hover:scale-105 transition-transform">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">Our Address</h3>
                    <p className="text-[11px] text-[#64748B] leading-relaxed font-medium">
                      Radha Nagar gali ke samne, Bilgram Road, Hardoi, UP (241001)
                    </p>
                  </div>
                </motion.div>

                {/* Card 2: Call */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 border border-[#1251A3]/10 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300 flex flex-col justify-between gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100 group-hover:scale-105 transition-transform">
                    <Phone size={18} />
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
                </motion.div>

                {/* Card 3: WhatsApp */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 border border-[#1251A3]/10 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300 flex flex-col justify-between gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                    <MessageCircle size={18} />
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
                </motion.div>

                {/* Card 4: Email */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 border border-[#1251A3]/10 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300 flex flex-col justify-between gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B2B] flex items-center justify-center border border-orange-100 group-hover:scale-105 transition-transform">
                    <Mail size={18} />
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
                </motion.div>

                {/* Card 5: Instagram */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 border border-[#1251A3]/10 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300 flex flex-col justify-between gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100 group-hover:scale-105 transition-transform">
                    <MessageCircle size={18} />
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
                </motion.div>

                {/* Card 6: Timings */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 border border-[#1251A3]/10 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300 flex flex-col justify-between gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#0D1B2A] mb-0.5">Store Timings</h3>
                    <p className="text-xs text-slate-800 font-extrabold block mt-1 font-mono">
                      {contactData.timings}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US GRID */}
        <section className="bg-slate-50 py-16 px-6 border-y border-slate-100 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <span className="text-[10px] font-mono font-bold text-[#1251A3] bg-[#E3F0FF] border border-[#1251A3]/10 px-4 py-1.5 rounded-full uppercase tracking-wider">
                Why Choose Muneem Store
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-[#0D1B2A] pt-1">
                Our Core Strengths
              </h2>
              <p className="text-xs md:text-sm text-[#64748B] max-w-sm mx-auto font-medium">
                Built on Trust, Honesty and Quality Work for generations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3 hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto border border-[#1251A3]/5">
                  <Star size={16} className="fill-[#1251A3]" />
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Established 1995</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed font-semibold">
                  30+ saal se Hardoi ke har chhote-bade project ka sathi.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3 hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto border border-[#1251A3]/5">
                  <ShieldCheck size={16} />
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Trusted Local</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed font-semibold">
                  Hardoi city and adjacent tehsils mein verified credentials.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3 hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto border border-[#1251A3]/5">
                  <Award size={16} />
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Premium Quality</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed font-semibold">
                  Bamboo Balli, Shuttering Patra, Chali aur centering materials.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3 hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto border border-[#1251A3]/5">
                  <Users size={16} />
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Skilled Workforce</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed font-semibold">
                  Experienced Raj Mistri, Plumber, Electrician dynamic profiles.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm text-center space-y-3 hover:-translate-y-1 transition duration-300">
                <div className="w-10 h-10 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto border border-[#1251A3]/5">
                  <Heart size={16} className="fill-[#1251A3]" />
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Legacy of Trust</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed font-semibold">
                  Mr. Anees Mansoori legacy ke mutabik transparent pricing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LOGISTICS REACH */}
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-center text-[#0D1B2A] mb-12">
            Our Delivery & Logistics Reach
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Logistics Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm hover:shadow-md transition duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center border border-[#1251A3]/5">
                <Truck size={22} />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">Hardoi City Same-Day</h3>
              <p className="text-xs text-[#64748B] font-semibold leading-relaxed">
                Town limits aur local sectors me loading aur instant dispatch options site setup material support ke sath.
              </p>
            </motion.div>

            {/* Logistics Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm hover:shadow-md transition duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center border border-[#1251A3]/5">
                <Truck size={22} />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">Regional Blocks Hauling</h3>
              <p className="text-xs text-[#64748B] font-semibold leading-relaxed">
                Bilgram, Sandila, Shahabad, Sandi aur surrounding blocks ke rural limits me heavy load logistics setups.
              </p>
            </motion.div>

            {/* Logistics Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm hover:shadow-md transition duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center border border-[#1251A3]/5">
                <Truck size={22} />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">Bulk Site Loading</h3>
              <p className="text-xs text-[#64748B] font-semibold leading-relaxed">
                Industrial infrastructure projects aur bulk material quantities loading (e.g. 5,000+ pieces) logs dispatch.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}