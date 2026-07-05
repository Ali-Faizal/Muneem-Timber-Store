import ServiceCard from "../components/ServiceCard";
import services from "./../data/services";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";

export default function ServicesPage() {
  return (
    <>
    <AnnouncementBar/>
    <Navbar/>
    <div className="bg-[#F8FAFC] py-12 px-6">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <span className="font-[var(--font-dm-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full">
          Hamari Services
        </span>

        <h2 className="text-[26px] md:text-[32px] font-extrabold mt-3 mb-1.5 font-[var(--font-syne)] text-[#0D1B2A]">
          Sirf Kiraya Nahi — <br />
          Poora Ghar Banwao Humse
        </h2>

        <p className="text-sm opacity-70 font-[var(--font-dm-sans)] text-[#334155]">
          Hum sirf samaan nahi dete — balki poora ghar banwane ke liye har zaroori cheez aur manpower provide karte hain.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} />
        ))}
      </div>

      {/* Payment Section */}
      <div className="max-w-7xl mx-auto mt-10 bg-[#EAF2FF] rounded-[20px] p-7">
        
        <h3 className="text-[20px] font-bold font-[var(--font-syne)] text-[#0D1B2A]">
          Aasaan Payment Options
        </h3>

        <p className="text-sm opacity-70 mt-1 font-[var(--font-dm-sans)]">
          Trusted customers ke liye credit system bhi available hai
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          
          <div className="bg-white p-5 rounded-xl">
            <h4 className="font-semibold">Half Advance</h4>
            <p className="text-sm opacity-70 mt-1">
              Minimum 5 din ka advance payment — baaki baad mein.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <h4 className="font-semibold">Credit System</h4>
            <p className="text-sm opacity-70 mt-1">
              Trusted customers ke liye credit system available.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <h4 className="font-semibold">UPI / Cash</h4>
            <p className="text-sm opacity-70 mt-1">
              UPI, cash, bank transfer — sab accepted.
            </p>
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}