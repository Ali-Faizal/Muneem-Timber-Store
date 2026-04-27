export default function ServiceCard({ service }) {
  const phone = "919580716752";

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] p-7 border transition-all duration-200 group
      ${
        service.featured
          ? "bg-[#1251A3] border-[#1251A3] text-white"
          : "bg-white border-[rgba(18,81,163,0.12)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(18,81,163,0.1)]"
      }`}
    >
      {/* Top Hover Line */}
      {!service.featured && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#1251A3] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      )}

      {/* Icon Box */}
      <div
        className={`w-[52px] h-[52px] rounded-[14px] mb-[18px] flex items-center justify-center text-xl
        ${
          service.featured
            ? "bg-white/20"
            : "bg-[#E3F0FF] text-[#1251A3]"
        }`}
      >
        ⚙️
      </div>

      {/* Title */}
      <h3
        className={`text-[18px] font-bold mb-2 font-[var(--font-syne)]
        ${service.featured ? "text-white" : "text-[#0D1B2A]"}`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={`text-[13.5px] leading-[1.65] mb-[18px] font-[var(--font-dm-sans)]
        ${service.featured ? "text-white/80" : "text-[#64748B]"}`}
      >
        {service.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag, i) => (
          <span
            key={i}
            className={`px-2.5 py-[3px] rounded-full text-[11px] tracking-[0.04em] font-[var(--font-dm-mono)]
            ${
              service.featured
                ? "bg-white/20 text-white"
                : "bg-[#E3F0FF] text-[#1251A3]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={`tel:${phone}`}
        className={`block mt-[18px] text-[13px] font-semibold
        ${service.featured ? "text-white" : "text-[#1251A3]"}`}
      >
        {service.cta}
      </a>
    </div>
  );
}