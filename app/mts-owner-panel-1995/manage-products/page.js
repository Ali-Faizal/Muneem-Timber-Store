"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProd, setNewProd] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        console.error("Failed to load products:", data);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProd.name,
          price: `₹${newProd.price} per piece/day`,
          stock: newProd.stock || "100"
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Product successfully added to MongoDB!");
        setNewProd({ name: "", price: "", stock: "" });
        loadProducts();
      } else {
        alert("❌ Error adding product: " + data.error);
      }
    } catch (err) {
      console.error("Add product error:", err);
      alert("❌ Technical error: " + err.message);
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Timber Inventory Stock</h1>
          <div className="bg-white rounded-2xl border border-brand-blue/10 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-brand-light text-brand-dark uppercase font-mono text-xs">
                <tr>
                  <th className="p-4">Item ID</th>
                  <th className="p-4">Item Title</th>
                  <th className="p-4">Rate / Day</th>
                  <th className="p-4">In Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p._id || p.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-mono">#MT-{p.id || String(p._id).slice(-4).toUpperCase()}</td>
                    <td className="p-4 font-bold text-brand-dark">{p.name}</td>
                    <td className="p-4 text-brand-blue font-semibold">{p.price}</td>
                    <td className="p-4 font-medium">{p.stock || "100+ Pcs"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm h-fit">
          <h3 className="font-heading text-md font-bold text-brand-dark mb-4">Stock Entry Form</h3>
          <form onSubmit={addProduct} className="space-y-4">
            <Input label="Item Name" placeholder="e.g. Gatur Wood" value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} />
            <Input label="Price per Day (₹)" placeholder="e.g. ₹12" value={newProd.price} onChange={(e) => setNewProd({...newProd, price: e.target.value})} />
            <Input label="Initial Inventory Count" placeholder="e.g. 250" value={newProd.stock} onChange={(e) => setNewProd({...newProd, stock: e.target.value})} />
            <Button type="submit" variant="primary" className="w-full">Product Add Karein</Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
