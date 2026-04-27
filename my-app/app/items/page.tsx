import AnnouncementBar from "../components/AnnouncementBar";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import items from "../data/items";

export default function ItemsPage() {
  return (
    <>
    <AnnouncementBar/>
     <Navbar/>
    <div className="bg-[#F8FAFC] min-h-screen py-10 px-4">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        
        {/* Badge */}
        <span className="font-[var(--font-dm-mono)] text-[11px] tracking-[0.14em] uppercase text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full">
          Kiraya Items
        </span>

        {/* Heading */}
        <h1 className="mt-4 text-[2rem] md:text-[2.4rem] font-extrabold text-[#1251A3] font-[var(--font-syne)]">
          Hamare Saare Samaan
        </h1>

        <p className="text-[#64748B] mt-2 text-sm font-[var(--font-dm-sans)]">
          Photo dekho, rate samjho — jo chahiye wo select karo aur bill banao.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Discount Banner */}
      <div className="max-w-7xl mx-auto mt-10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #1251A3, #FF8C00)",
        }}
      >
        <div>
          <h2 className="text-white font-[var(--font-syne)] font-extrabold text-[1.4rem] md:text-[1.6rem]">
            Reference se 10% Discount!
          </h2>
          <p className="text-white text-sm mt-1 font-[var(--font-dm-sans)]">
            Kisi bhi known customer ka naam lo — 10% discount milega.
          </p>
        </div>

        <button className="bg-white text-[#1251A3] px-5 py-2 rounded-lg font-bold text-sm">
          Abhi Call Karo
        </button>
      </div>
    </div>
    </>
  );
}