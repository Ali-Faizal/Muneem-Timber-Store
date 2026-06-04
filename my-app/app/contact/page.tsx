'use client'

import { useState } from 'react'
import contactData from '../data/contact'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import AnnouncementBar from '../components/AnnouncementBar'
import Footer from '../components/Footer'
import logo from '../imagesection/WhatsApp_icon.png'

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
     <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-white py-16 mt-12">

  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">

    {/* CARD */}
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">

      {/* LOGO */}
      <img
        src={logo.src}
        alt="logo"
        className="w-14 h-14 mx-auto mb-3 object-contain "
      />

      {/* TITLE */}
      <p className="font-bold text-lg" style={{ color: '#688EC1' }}>Call Karein</p>

      {/* TIMING */}
      <p className="text-gray-500 text-sm mt-1">
        Subah 8 baje se raat 9 baje tak
      </p>

      {/* BUTTON */}
      <a
        href="tel:9580716752"
        className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Call Now
      </a>
    </div>

    {/* WHATSAPP */}
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
      <MessageCircle className="mx-auto mb-3 text-green-500" size={30} />

       <p className="font-normal text-xs" style={{ color: '#1251A3' }}>
       Sampark kare
      </p>
      <p className="font-bold text-lg " style={{ color: '#688EC1' }} >WhatsApp Karein</p>

      <a
        href={`https://wa.me/919580716752`}
        target="_blank"
        className="mt-4 inline-block bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Chat Now
      </a>
    </div>

    {/* LOCATION */}
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
      <MapPin className="mx-auto mb-3 text-blue-600" size={30}   />
      <p className=" mx-auto mb-3 mt-5 font-normal text-xs" style={{ color: '#1251A3' }}>
       Bilgrsam Chungi Hardoi
      </p>
      <p className="font-bold text-xl" style={{ color: '#688EC1' }}>
        Location Dekho
      </p>

      <a
        href={`https://maps.google.com/?q=${contactData.address}`}
        target="_blank"
        className="mt-4 inline-block bg-[#1251A3] text-white px-5 py-2 rounded-lg hover:bg-[#0f3f82] transition"
      >
        Open Map
      </a>
    </div>

  </div>
</div>

    </div>
    <Footer/>
    </>
  )
}