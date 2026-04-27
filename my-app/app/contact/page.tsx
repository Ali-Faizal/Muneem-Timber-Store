'use client'

import { useState } from 'react'
import contactData from '../data/contact'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import AnnouncementBar from '../components/AnnouncementBar'

export default function ContactPage() {

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message Sent ✅')
  }

  return (
  <>
     < AnnouncementBar/>
         <Navbar/>
    <div className="bg-[#1251A3] min-h-screen px-4 md:px-10 py-10 text-white">

      {/* HEADING */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-[px] md:text-[34px] font-extrabold font-[var(--font-syne)]">
          Hum Yahan Hain —
          <span className="text-[#90CAF9]"> Ek Call Kaafi Hai</span>
        </h1>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="min-h-[480px] flex flex-col justify-between bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] p-6 rounded-[20px] space-y-4"
        >
          <h2 className="text-[22px] font-extrabold font-[var(--font-syne)]">
            Message Bhejo
          </h2>

          <input
            placeholder="Aapka Naam"
            className="w-full p-3 rounded bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Mobile Number"
            className="w-full p-3 rounded bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] outline-none"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <select
            className="w-full p-3 rounded bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)]"
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option>Select Service</option>
            {contactData.services.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>

          <textarea
            placeholder="Message likho..."
            className="w-full p-3 rounded bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] h-[120px]"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button className="w-full bg-[#FF6B2B] py-4 rounded font-bold text-[16px]">
            Message Bhejo
          </button>
        </form>

        {/* INFO */}
        <div className="min-h-[480px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] p-6 rounded-[20px] flex flex-col justify-between space-y-4">

          <div className="bg-[rgba(255,255,255,0.08)] p-4 rounded-xl">
            <p className="text-[10px] uppercase opacity-50 font-[var(--font-mono)]">Phone</p>
            <a href={`tel:${contactData.phone}`} className="text-[#90CAF9]">
              {contactData.phone}
            </a>
          </div>

          <div className="bg-[rgba(255,255,255,0.08)] p-4 rounded-xl">
            <p className="text-[10px] uppercase opacity-50 font-[var(--font-mono)]">Timing</p>
            <p className="font-[var(--font-mono)]">{contactData.timing.morning}</p>
            <p className="font-[var(--font-mono)]">{contactData.timing.evening}</p>
          </div>

          <div className="bg-[rgba(255,255,255,0.08)] p-4 rounded-xl">
            <p className="text-[10px] uppercase opacity-50 font-[var(--font-mono)]">Address</p>
            <p>{contactData.address}</p>
          </div>

          <div className="bg-[rgba(255,107,43,0.15)] p-4 rounded-xl border border-[#355490]">
            <p className="text-[#FFD580]">{contactData.offer}</p>
          </div>

        </div>
      </div>

      {/* FULL WIDTH WHITE STRIP */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-white py-10 mt-12">

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">

          {/* CALL */}
          <a
            href={`tel:${contactData.phone}`}
            className="text-black border border-black rounded-[20px] text-center py-5 md:py-6 hover:bg-blue-500 hover:text-white transition"
          >
            <Phone className="mx-auto mb-2" size={28} />
            <p className="font-bold text-[15px] md:text-[16px]">Call Karein</p>
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${contactData.whatsapp}`}
            target="_blank"
            className="bg-green-500 text-white rounded-[20px] text-center py-5 md:py-6"
          >
            <MessageCircle className="mx-auto mb-2" size={28} />
            <p className="font-bold text-[15px] md:text-[16px]">WhatsApp Karein</p>
          </a>

          {/* LOCATION */}
          <a
            href={`https://maps.google.com/?q=${contactData.address}`}
            target="_blank"
            className="bg-[#1251A3] text-white rounded-[20px] text-center py-5 md:py-6"
          >
            <MapPin className="mx-auto mb-2" size={28} />
            <p className="font-bold text-[15px] md:text-[16px]">Location Dekho</p>
          </a>

        </div>
      </div>

    </div>
    </>
  )
}