import { Phone, MessageCircle, MapPin } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid grid-cols-2 lg:grid-cols-4 gap-6 ">

          {/* 1️⃣ ABOUT */}
          <div>
            <h2 className="text-lg font-extrabold mb-3">
              Muneem Timber Store
            </h2>

            <p className="text-[13px] opacity-60 leading-[1.65]">
              Hardoi ka sabse bharosemand timber kiraya aur construction service. Since 2010 se aapki service mein.
            </p>
          </div>

          {/* 2️⃣ KIRAYA ITEMS */}
          <div>
            <h3 className="font-bold mb-4 text-sm">Kiraya Items</h3>

            <ul className="space-y-2">
              <li><a href="#items" className="text-[13px] opacity-60 hover:opacity-100 transition">Balli</a></li>
              <li><a href="#items" className="text-[13px] opacity-60 hover:opacity-100 transition">Patra</a></li>
              <li><a href="#items" className="text-[13px] opacity-60 hover:opacity-100 transition">Chali</a></li>
              <li><a href="#items" className="text-[13px] opacity-60 hover:opacity-100 transition">Teen</a></li>
              <li><a href="#items" className="text-[13px] opacity-60 hover:opacity-100 transition">Bans</a></li>
            </ul>
          </div>

          {/* 3️⃣ SERVICES */}
          <div>
            <h3 className="font-bold mb-4 text-sm">Services</h3>

            <ul className="space-y-2">
              <li><a href="#services" className="text-[13px] opacity-60 hover:opacity-100 transition">Timber Kiraya</a></li>
              <li><a href="#services" className="text-[13px] opacity-60 hover:opacity-100 transition">Mistri</a></li>
              <li><a href="#services" className="text-[13px] opacity-60 hover:opacity-100 transition">Plumber</a></li>
              <li><a href="#services" className="text-[13px] opacity-60 hover:opacity-100 transition">Electrician</a></li>
            </ul>
          </div>

          {/* 4️⃣ CONTACT */}
          <div>
            <h3 className="font-bold mb-4 text-sm">Contact</h3>

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
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={contactData.mapLink} target="_blank" rel="noopener noreferrer" className="text-[13px] opacity-60 hover:opacity-100 transition flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Location</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          {/* COPYRIGHT */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs opacity-30">
              © 2026 Muneem Timber Store, Hardoi UP
            </p>

            <p className="text-xs opacity-30 flex items-center gap-1">
              Crafted with <span className="text-red-500">❤️</span> by Team Muneem
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}