"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Star, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Info,
  Loader
} from "lucide-react";
import AnnouncementBar from "../../components/AnnouncementBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Custom static metadata for service pages
const serviceData = {
  mistri: {
    title: "Raj Mistri & Construction Expert",
    subtitle: "Ghar Banwane Ka Sabse Bharosemand Kaam",
    tagline: "Brick work, plastering, flooring, wall tiles, and roof slab casting — under premium guidance.",
    heritageTag: "Alhamdulillah · Serving Hardoi Since 1995",
    urduMotto: "Imandari aur safai hamari pehchaan",
    gradient: "from-[#1251A3]/90 via-[#0A3578]/95 to-slate-900",
    stats: { workers: "25+ Expert Mistri", projects: "600+ Projects Done", rating: "4.9★ Local Rating" },
    categories: [
      { name: "Senior Raj Mistri", rate: 1000, unit: "per day", experience: "15+ Years", features: ["Foundation Construction", "Wall Alignment Expert", "Heavy Slab Casting", "Structural Guidance"] },
      { name: "Tiles & Flooring Specialist", rate: 1200, unit: "per day", experience: "12+ Years", features: ["Marble Flooring", "Kitchen Granite Setup", "Bathroom Wall Tiles", "Glass Tile fitting"] },
      { name: "Plaster & Patch Worker", rate: 800, unit: "per day", experience: "8+ Years", features: ["Clean Finish Plastering", "Crack Repair & Masonry", "Boundary Walls Setup"] },
      { name: "POP & Ceiling Mason", rate: 1100, unit: "per day", experience: "10+ Years", features: ["Interior Plaster designs", "Ceiling moulding", "Gypsum Board styling"] }
    ],
    reviews: [
      { name: "Ramesh Kumar Verma", location: "Radha Nagar, Hardoi", rating: 5, comment: "Ram Bahadur ji ne hamare naye ghar ka plastering ka kaam kiya. Kaam ki safai aour raftar dono bahut hi badhiya thi. Ek rupaye ki bekar kharcha nahi hone diya." },
      { name: "Suresh Yadav", location: "Shahabad, Hardoi", rating: 5, comment: "Muneem Timber Store se mistri bulwaya, bathroom tiles aour kitchen flooring ka kaam tha. Pure samay pe aaye aur rate bhi bilkul transparent tha." }
    ]
  },
  plumber: {
    title: "Expert Plumber Service",
    subtitle: "Premium Sanitary Fitting & Piping",
    tagline: "Leakage repair, bathroom fittings, main pipe layout, water tanks, and drainage solutions.",
    heritageTag: "1995 Se Hardoi Mein Vishwas Ka Doosra Naam",
    urduMotto: "Khidmat aur sahi kaam, har waqt",
    gradient: "from-[#1976D2]/95 via-[#1251A3] to-slate-900",
    stats: { workers: "18+ Expert Plumbers", projects: "450+ Sites Serviced", rating: "4.8★ Rating" },
    categories: [
      { name: "Piping & Tank Specialist", rate: 800, unit: "per day", experience: "10+ Years", features: ["Water Tank Installation", "Main line pipeline setup", "CPVC/GI pipe welding", "Pressure pump setup"] },
      { name: "Sanitary Fitting Expert", rate: 700, unit: "per day", experience: "8+ Years", features: ["Wash basin fitting", "Wall-hung commode setup", "Premium shower fixtures", "Bath accessories installation"] },
      { name: "Basic Repair Plumber", rate: 450, unit: "per day", experience: "5+ Years", features: ["Tap leakage repair", "Drain blockage cleaning", "Flush tank valve fix", "Sink repairs"] }
    ],
    reviews: [
      { name: "Mohan Lal Gupta", location: "Bilgram Road, Hardoi", rating: 5, comment: "Irfan ji ne hamari water tank plumbing complete ki. Pipeline ka layout bahut neat aur zero water leaks ke sath finish kiya." },
      { name: "Zafar Imam", location: "Shahabad, Hardoi", rating: 4, comment: "Excellent emergency response. Hamara bathroom pipeline fat gaya tha, call karne ke ek ghante me plumber aa gaya. Bahut accha kaam kiya." }
    ]
  },
  electrician: {
    title: "Trained Electrician Service",
    subtitle: "Safe, Standardized Home Wiring",
    tagline: "Modular switchboard fitting, full building internal wiring, MCB panel installs, and inverter setups.",
    heritageTag: "Late Mr. Anees Mansoori's Legacy of Trust",
    urduMotto: "Aapki hifazat, hamara maqsad",
    gradient: "from-[#FF6B2B]/90 via-[#E55A1F] to-slate-900",
    stats: { workers: "15+ Trained Electricians", projects: "500+ Homes Wired", rating: "4.9★ Rating" },
    categories: [
      { name: "Full Building Wiring Expert", rate: 850, unit: "per day", experience: "12+ Years", features: ["Conduit pipe fitting", "DB Box layout & Load calc", "Main circuit distribution", "Earthing installation"] },
      { name: "MCB & Appliance Technician", rate: 800, unit: "per day", experience: "9+ Years", features: ["Stabilizer installation", "Inverter battery setup", "AC switchbox installation", "Geyser fitting"] },
      { name: "Modular Fittings Specialist", rate: 450, unit: "per day", experience: "6+ Years", features: ["Modular switchboard fitting", "LED ceiling lights setup", "Fancy chandeliers", "Fan & Exhaust fixes"] }
    ],
    reviews: [
      { name: "Rakesh Pathak", location: "Pihani Road, Hardoi", rating: 5, comment: "Sunil ji ne hamari puri dukan ki wiring ki hai. Unka kaam behad professional tha, safety parameters ka pura khyal rakha." },
      { name: "Aslam Khan", location: "Cinema Road, Hardoi", rating: 5, comment: "Switchboards aur inverter setup ka kaam thik rate me ho gaya. Sahi electrician dhoondna ab aasan ho gaya hai." }
    ]
  },
  "emergency-manpower": {
    title: "Emergency Manpower & Helpers",
    subtitle: "Same-Day Construction Workforce Dispatch",
    tagline: "Centering helpers, loaders, shuttering helpers, concrete mixers, and skilled manual labor.",
    heritageTag: "1995 Se Hardoi Ke Har Bado Project Ka Partner",
    urduMotto: "Mehnat aur imandari hamara asool",
    gradient: "from-[#0F9D58]/90 via-[#0C8449] to-slate-900",
    stats: { workers: "50+ Active Helpers", projects: "700+ Sites Powered", rating: "4.7★ Rating" },
    categories: [
      { name: "Centering & Shuttering Helper", rate: 500, unit: "per day", experience: "5+ Years", features: ["Centering support help", "Iron rod bending support", "Balli-patra staging setup", "Site clearance"] },
      { name: "Basic Construction Labor (Beldar)", rate: 450, unit: "per day", experience: "3+ Years", features: ["Cement & sand mixing", "Brick shifting support", "Foundation digging", "Debris cleaning"] },
      { name: "Heavy Loader & Unloader", rate: 550, unit: "per day", experience: "4+ Years", features: ["Heavy timber logs unloading", "Balli-patra stacking", "Truck loading/unloading", "Fast logistics"] }
    ],
    reviews: [
      { name: "Anil Rawat", location: "Sandi Road, Hardoi", rating: 5, comment: "Hamari slab casting (lantar) ke liye emergency me 5 helpers chahiye the. Same day subah hi bhej diye, kaam behad tez aour thik se kiya." },
      { name: "Imran Mansoori", location: "Radha Nagar, Hardoi", rating: 5, comment: "Unloading timber logs needs special skill. Pappu ji's team loaded 1500 balli within 2 hours. Very satisfied." }
    ]
  }
};

export default function ServiceSlugPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const currentService = serviceData[slug] || serviceData.mistri;

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); // 'loading', 'success', 'error'
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    notes: ""
  });

  // Fetch Workers of this category
  useEffect(() => {
    async function fetchWorkers() {
      try {
        setLoading(true);
        const res = await fetch(`/api/workers?category=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setWorkers(data);
        }
      } catch (err) {
        console.error("Failed to load workers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkers();
  }, [slug]);

  // Form Submit Handler
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus("loading");

    try {
      const res = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerPhone: form.phone,
          customerAddress: form.address,
          serviceType: slug,
          bookingDate: form.date,
          notes: form.notes
        })
      });

      if (res.ok) {
        setBookingStatus("success");
        setForm({ name: "", phone: "", address: "", date: "", notes: "" });
        setTimeout(() => {
          setModalOpen(false);
          setBookingStatus(null);
        }, 3000);
      } else {
        const errorData = await res.json();
        alert(`❌ Error: ${errorData.error || "Failed to submit"}`);
        setBookingStatus("error");
      }
    } catch (err) {
      console.error(err);
      setBookingStatus("error");
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#F8FAFC] min-h-screen text-[#0D1B2A] overflow-x-hidden font-sans">
        
        {/* SECTION 1: HERO SECTION */}
        <section className={`relative overflow-hidden text-white bg-gradient-to-b ${currentService.gradient} py-16 md:py-24 px-6`}>
          {/* Decorative mesh background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-radial-gradient from-white/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Heritage Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E3F0FF] backdrop-blur-md shadow-sm">
                <Sparkles size={14} className="text-[#FF6B2B]" />
                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider">
                  {currentService.heritageTag}
                </span>
              </div>

              {/* Islamic/Urdu Touch Tagline */}
              <p className="font-heading italic text-sm text-[#90CAF9] font-medium tracking-wide">
                🌸 "{currentService.urduMotto}"
              </p>

              {/* Title & Description */}
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight font-heading">
                {currentService.title} <br />
                <span className="text-[#90CAF9]">{currentService.subtitle}</span>
              </h1>

              <p className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
                {currentService.tagline} Shuttering patra, scaffolding, aur local site operations ke expertise ke saath. Humare saare worker verified aur anubhav ke sath hain.
              </p>

              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
                <div>
                  <h4 className="text-lg md:text-xl font-extrabold font-heading text-white">{currentService.stats.workers}</h4>
                  <p className="text-[10px] md:text-xs text-white/60">Verified Team</p>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-extrabold font-heading text-white">{currentService.stats.projects}</h4>
                  <p className="text-[10px] md:text-xs text-white/60">Success Rates</p>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-extrabold font-heading text-white">{currentService.stats.rating}</h4>
                  <p className="text-[10px] md:text-xs text-white/60">Customer Satisfaction</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="bg-[#FF6B2B] hover:bg-[#E55A1F] text-white px-6 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-[0_4px_20px_rgba(255,107,43,0.3)] hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Calendar size={16} />
                  Book Now
                </button>

                <a 
                  href="tel:9580716752"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Phone size={16} />
                  Call Support
                </a>

                <a 
                  href="https://wa.me/919580716752"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1DAA55] text-white px-6 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-[0_4px_15px_rgba(37,211,102,0.2)]"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right Card Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B2B]/10 rounded-full blur-xl pointer-events-none" />
                
                <h3 className="font-heading font-extrabold text-lg text-white border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-[#90CAF9]" />
                  Muneem Legacy Guarantee
                </h3>

                <ul className="space-y-4 text-xs text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold flex-shrink-0 text-[10px]">✓</span>
                    <span><strong>Anees Mansoori Trust:</strong> Har deal bilkul transparent aur imandari ke sath ki jaati hai.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold flex-shrink-0 text-[10px]">✓</span>
                    <span><strong>100% Verified Workers:</strong> ID check aur expertise validation complete hone ke baad hi assignment hoti hai.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold flex-shrink-0 text-[10px]">✓</span>
                    <span><strong>No Hidden Charges:</strong> Standard daily card ke hisab se rate check, extra charges zero.</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/60">Starting rate</p>
                    <p className="text-lg font-extrabold font-heading text-[#90CAF9]">
                      ₹{Math.min(...currentService.categories.map(c => c.rate))}/day
                    </p>
                  </div>
                  <button 
                    onClick={() => setModalOpen(true)}
                    className="text-xs font-bold text-white bg-[#1251A3] hover:bg-[#0A3578] px-4 py-2 rounded-xl transition"
                  >
                    Rates check →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SERVICE CATEGORIES & RATE CARD */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[11px] font-mono font-bold text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full uppercase tracking-wider">
              Rate Card & Specialization
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-[#0D1B2A]">
              Choose Your Required Worker
            </h2>
            <p className="text-xs md:text-sm text-[#64748B] max-w-md mx-auto">
              Transparent rates, perfect skills, aur best efficiency guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentService.categories.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm hover:shadow-md transition duration-300 relative group flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#1251A3] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-t-2xl" />
                
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">{cat.name}</h3>
                    <span className="bg-[#E3F0FF] text-[#1251A3] text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-[#1251A3]/10">
                      {cat.experience}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-1 text-[#1251A3]">
                    <span className="text-2xl font-extrabold font-heading">₹{cat.rate}</span>
                    <span className="text-xs text-[#64748B]">/ {cat.unit}</span>
                  </div>

                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{cat.desc}</p>

                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    {cat.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-xs text-[#334155]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      setForm(prev => ({ ...prev, notes: `Requires: ${cat.name}` }));
                      setModalOpen(true);
                    }}
                    className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    Select & Book
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: DYNAMIC WORKER PROFILES */}
        <section className="bg-[#F0F6FF] py-16 px-6 border-y border-[#1251A3]/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full uppercase tracking-wider">
                  Verified Manpower List
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-[#0D1B2A]">
                  Dynamic Worker Profiles
                </h2>
                <p className="text-xs md:text-sm text-[#64748B]">
                  Profiles synchronized directly from MongoDB. Zero hardcoded listings.
                </p>
              </div>

              <div className="bg-white px-4 py-2 rounded-xl border text-xs text-[#334155] font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                <span>{workers.length} Workers Available Online</span>
              </div>
            </div>

            {loading ? (
              // Loading Skeleton Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4">
                    <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto" />
                    <div className="h-4 bg-slate-200 w-3/4 mx-auto rounded" />
                    <div className="h-3 bg-slate-200 w-1/2 mx-auto rounded" />
                    <div className="space-y-2 pt-4">
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : workers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#1251A3]/10">
                <User size={48} className="text-[#64748B]/40 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-base text-[#0D1B2A]">No active worker profiles found</h3>
                <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                  Owner Dashboard se naye workers add karein. Wo database me save hote hi yahan auto-render ho jayenge.
                </p>
                <button 
                  onClick={() => setModalOpen(true)}
                  className="mt-4 bg-[#1251A3] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#0A3578] transition"
                >
                  Direct Booking Form
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {workers.map((worker) => (
                  <div 
                    key={worker._id}
                    className="bg-white rounded-2xl border border-[#1251A3]/10 p-5 shadow-sm hover:shadow-md transition duration-300 relative group flex flex-col justify-between"
                  >
                    {/* Availability Top Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      {worker.availability ? (
                        <span className="bg-[#E8F5E9] text-[#0F9D58] text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-[#E8F5E9]/20">
                          Available
                        </span>
                      ) : (
                        <span className="bg-rose-50 text-rose-600 text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-rose-100">
                          Engaged
                        </span>
                      )}
                    </div>

                    <div>
                      {/* Avatar Wrapper */}
                      <div className="w-16 h-16 rounded-full bg-[#E3F0FF] mx-auto border-2 border-white shadow-sm flex items-center justify-center text-[#1251A3] font-heading font-extrabold text-xl overflow-hidden mb-4 relative">
                        {worker.photoUrl ? (
                          <img 
                            src={worker.photoUrl} 
                            alt={worker.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          worker.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
                        )}
                      </div>

                      {/* Header */}
                      <div className="text-center">
                        <h3 className="font-heading font-bold text-sm text-[#0D1B2A] line-clamp-1">{worker.name}</h3>
                        <p className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold font-mono mt-0.5">
                          {worker.experience || "5+ Years"} exp
                        </p>
                        
                        {/* Rating stars */}
                        <div className="flex items-center justify-center gap-0.5 mt-2">
                          <Star size={12} className="fill-[#F59E0B] text-[#F59E0B]" />
                          <span className="text-xs font-bold text-[#0D1B2A]">{worker.rating || "4.8"}</span>
                          <span className="text-[10px] text-[#64748B]">/5</span>
                        </div>
                      </div>

                      {/* Skills array */}
                      <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-1 justify-center">
                        {worker.skills?.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="bg-slate-50 text-slate-600 text-[9px] font-medium px-2 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 border-t border-slate-100 pt-4 space-y-2">
                      <div className="flex justify-between items-center text-xs pb-2.5">
                        <span className="text-[#64748B] text-[10px]">Daily Rate:</span>
                        <span className="font-extrabold font-heading text-[#1251A3]">₹{worker.dailyRate}/day</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a 
                          href={`tel:${worker.phone || "9580716752"}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] py-2 rounded-lg font-bold text-center transition flex items-center justify-center gap-1 border border-slate-200"
                        >
                          <Phone size={10} />
                          Call
                        </a>
                        <a 
                          href={`https://wa.me/${worker.whatsapp || "919580716752"}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1DAA55] text-[10px] py-2 rounded-lg font-bold text-center transition flex items-center justify-center gap-1 border border-[#25D366]/10"
                        >
                          <MessageCircle size={10} />
                          WhatsApp
                        </a>
                      </div>

                      <button 
                        onClick={() => {
                          setForm(prev => ({ 
                            ...prev, 
                            notes: `Preferred Worker: ${worker.name} (${worker.category})` 
                          }));
                          setModalOpen(true);
                        }}
                        className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-2 rounded-lg text-xs font-bold transition shadow-sm active:scale-95 flex items-center justify-center gap-1"
                      >
                        <CheckCircle size={12} />
                        Book Now
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS TIMELINE */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-[11px] font-mono font-bold text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full uppercase tracking-wider">
              Scheduling Process
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-[#0D1B2A]">
              Mistri Book Karna Kitna Aasaan Hai
            </h2>
            <p className="text-xs md:text-sm text-[#64748B]">
              Only 4 quick steps to start working on your site setup.
            </p>
          </div>

          <div className="relative">
            {/* Timeline connectors */}
            <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-[2px] bg-[#1251A3]/10 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm relative text-center space-y-3 hover:border-[#1251A3] transition duration-300">
                <div className="w-12 h-12 bg-[#1251A3] text-white rounded-2xl flex items-center justify-center font-heading font-extrabold text-lg mx-auto shadow-md">
                  1
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Request Service</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Apni zaroorat online form ya direct call ke through submit karein.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm relative text-center space-y-3 hover:border-[#1251A3] transition duration-300">
                <div className="w-12 h-12 bg-[#FF6B2B] text-white rounded-2xl flex items-center justify-center font-heading font-extrabold text-lg mx-auto shadow-md">
                  2
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Verification Call</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Humare team manager aapko call karke details aur estimate verify karenge.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm relative text-center space-y-3 hover:border-[#1251A3] transition duration-300">
                <div className="w-12 h-12 bg-[#1251A3] text-white rounded-2xl flex items-center justify-center font-heading font-extrabold text-lg mx-auto shadow-md">
                  3
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Worker Assigned</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Available and matching skilled worker team setup dispatch ho jayegi.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-6 border border-[#1251A3]/10 shadow-sm relative text-center space-y-3 hover:border-[#1251A3] transition duration-300">
                <div className="w-12 h-12 bg-[#0F9D58] text-white rounded-2xl flex items-center justify-center font-heading font-extrabold text-lg mx-auto shadow-md">
                  4
                </div>
                <h4 className="font-heading font-extrabold text-sm text-[#0D1B2A]">Work Completed</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Kaam check karein aour satisfaction ke baad secure payment complete karein.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: CUSTOMER REVIEWS */}
        <section className="bg-slate-100 py-16 px-6 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <span className="text-[11px] font-mono font-bold text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full uppercase tracking-wider">
                Hamare Grahak
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-[#0D1B2A]">
                Customers Kya Kehte Hain
              </h2>
              <p className="text-xs md:text-sm text-[#64748B]">
                Real feedback from construction sites in Hardoi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentService.reviews.map((rev, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#0D1B2A]">{rev.name}</h4>
                      <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                        <MapPin size={10} />
                        {rev.location}
                      </span>
                    </div>

                    <div className="flex gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 bg-[#0A3578]/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative border border-[#1251A3]/10 overflow-hidden"
            >
              {/* Header */}
              <div className="border-b pb-4 mb-4">
                <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">Book {currentService.title}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Details fill karein, hum turant sampark karenge.</p>
              </div>

              {/* Status Banner */}
              {bookingStatus === "success" && (
                <div className="bg-[#E8F5E9] border border-[#0F9D58]/30 rounded-xl p-3.5 text-[#0F9D58] text-xs font-semibold flex items-center gap-2 mb-4 animate-fade-in">
                  <CheckCircle size={16} />
                  <span>Request registered successfully! Redirecting...</span>
                </div>
              )}

              {bookingStatus === "error" && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-rose-600 text-xs font-semibold flex items-center gap-2 mb-4">
                  <span>Booking fail ho gayi. Please try again.</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wide mb-1">Your Name</label>
                  <input 
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wide mb-1">Mobile Number</label>
                  <input 
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wide mb-1">Site Address (Hardoi Limits)</label>
                  <input 
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Address aur landmark"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wide mb-1">Required Date</label>
                    <input 
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wide mb-1">Service Type</label>
                    <input 
                      type="text"
                      disabled
                      value={slug.toUpperCase()}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-100 font-bold text-[#64748B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wide mb-1">Extra Notes (Optional)</label>
                  <textarea 
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Specify extra details if any"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50 resize-none"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-4 border-t mt-4">
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    disabled={bookingStatus === "loading"}
                    className="flex-1 border text-slate-700 py-2.5 rounded-xl text-xs font-bold transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={bookingStatus === "loading"}
                    className="flex-1 bg-[#1251A3] hover:bg-[#0A3578] text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
                  >
                    {bookingStatus === "loading" ? (
                      <>
                        <Loader size={12} className="animate-spin" />
                        Submitting...
                      </>
                    ) : "Confirm Request"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
