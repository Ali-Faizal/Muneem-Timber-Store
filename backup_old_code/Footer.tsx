import { Phone, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const contactData = {
    phone: "+919580716752",
    whatsapp: "919580716752",
    mapLink: "https://maps.google.com/?q=Muneem+Timber+Store,Hardoi,UP"
  };

  return (
    <footer className="bg-slate-900 text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* 1️⃣ ABOUT / HERITAGE */}
          <div className="space-y-3">
            <Link href="/" className="hover:text-[#90CAF9] transition block">
              <h2 className="text-lg font-extrabold">
                Muneem Timber Store
              </h2>
            </Link>
            <p className="text-[10px] font-mono text-[#90CAF9] uppercase tracking-widest font-bold">
              Serving Hardoi Since 1995
            </p>
            <p className="text-[13px] opacity-60 leading-[1.65]">
              Founded by Late Mr. Anees Mansoori. Built on trust, honesty and quality work. "Ek Virasat Jo Aaj Bhi Grahakon Ka Bharosa Hai."
            </p>
          </div>

          {/* 2️⃣ KIRAYA ITEMS */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Kiraya Items</h3>
            <ul className="space-y-2">
              <li><Link href="/items" className="text-[13px] opacity-60 hover:opacity-100 transition">Balli (Bamboo poles)</Link></li>
              <li><Link href="/items" className="text-[13px] opacity-60 hover:opacity-100 transition">Patra (Planks)</Link></li>
              <li><Link href="/items" className="text-[13px] opacity-60 hover:opacity-100 transition">Chali (Iron plates)</Link></li>
              <li><Link href="/items" className="text-[13px] opacity-60 hover:opacity-100 transition">Teen (Corrugated sheets)</Link></li>
              <li><Link href="/items" className="text-[13px] opacity-60 hover:opacity-100 transition">Sidi (Ladders)</Link></li>
            </ul>
          </div>

          {/* 3️⃣ SERVICES */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/items" className="text-[13px] opacity-60 hover:opacity-100 transition">Timber Kiraya</Link></li>
              <li><Link href="/services/mistri" className="text-[13px] opacity-60 hover:opacity-100 transition">Mistri / Raj Mistri</Link></li>
              <li><Link href="/services/plumber" className="text-[13px] opacity-60 hover:opacity-100 transition">Plumber Service</Link></li>
              <li><Link href="/services/electrician" className="text-[13px] opacity-60 hover:opacity-100 transition">Electrician Service</Link></li>
              <li><Link href="/services/emergency-manpower" className="text-[13px] opacity-60 hover:opacity-100 transition">Emergency Manpower</Link></li>
            </ul>
          </div>

          {/* 4️⃣ CONTACT */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${contactData.phone}`} className="text-[13px] opacity-60 hover:opacity-100 transition flex items-center gap-2">
                  <Phone size={16} />
                  <span>+91 9580716752</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${contactData.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[13px] opacity-60 hover:opacity-100 transition flex items-center gap-2">
                  <MessageCircle size={16} />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a href={contactData.mapLink} target="_blank" rel="noopener noreferrer" className="text-[13px] opacity-60 hover:opacity-100 transition flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Bilgram Road, Hardoi</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          {/* COPYRIGHT */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs opacity-35">
                © 2026 Muneem Timber Store, Hardoi UP. All Rights Reserved.
              </p>
              <p className="text-[10px] opacity-25">
                Founded by Late Mr. Anees Mansoori (1995)
              </p>
            </div>

            <p className="text-xs opacity-30 flex items-center gap-1">
              Crafted with <span className="text-red-500">❤️</span> by Team Muneem
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}