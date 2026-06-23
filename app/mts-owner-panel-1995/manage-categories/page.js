"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ManageCategoriesPage() {
  const categories = [
    { title: "Slab Support Material", total: "Chali, Balli, Patra", code: "CAT-SLAB" },
    { title: "Structural Support", total: "Gatur, Teen Plates", code: "CAT-STRUCT" },
    { title: "Finishing & Plywood", total: "Plai, Bans Sheets", code: "CAT-FINISH" }
  ];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Product Categories</h1>
          <p className="text-gray-500 text-sm">Segmented structural components taxonomy system.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm">
              <span className="text-xs font-mono bg-brand-light text-brand-blue px-2 py-1 rounded">
                {c.code}
              </span>
              <h3 className="font-heading text-md font-bold text-brand-dark mt-3">{c.title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Included items: {c.total}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
