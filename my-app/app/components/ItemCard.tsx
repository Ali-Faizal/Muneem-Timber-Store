import { FaEquals, FaPlus, FaSquare, FaGripLines } from "react-icons/fa";
import Navbar from "./Navbar";
export default function ItemCard({ item }) {
  return (
   
   
    <div className="bg-white border border-[rgba(18,81,163,0.12)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#1251A3] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(18,81,163,0.12)]">
      
      {/* Image Area */}
      <div className="bg-[#E3F0FF] h-[100px] flex items-center justify-center text-2xl text-[#1251A3]">
     ()
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-[var(--font-syne)] text-[15px] font-bold text-[#0D1B2A]">
          {item.name}
        </h3>

        <p className="font-[var(--font-dm-sans)] text-[12px] text-[#64748B] leading-[1.5]">
          {item.desc}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="font-[var(--font-dm-mono)] text-[13px] font-medium text-[#1251A3]">
            {item.price}
          </span>

          <button className="w-7 h-7 bg-[#1251A3] text-white rounded-md flex items-center justify-center">
            +
          </button>
        </div>
      </div>
    </div>
    
  );
}