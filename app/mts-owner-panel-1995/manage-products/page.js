"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Edit2, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProd, setNewProd] = useState({ name: "", price: "", stock: "", icon: "" });
  const [editingProduct, setEditingProduct] = useState(null);

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
        toast.error("❌ Failed to load products!");
      }
    } catch (err) {
      console.error("Error loading products:", err);
      toast.error("❌ Technical error loading products");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      toast.warn("⚠️ Name and price are required!");
      return;
    }
    
    if (editingProduct) {
      // Edit mode
      try {
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: editingProduct._id,
            name: newProd.name,
            price: newProd.price,
            stock: newProd.stock || "0",
            icon: newProd.icon || "🪵"
          })
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("✅ Product updated successfully!");
          setNewProd({ name: "", price: "", stock: "", icon: "" });
          setEditingProduct(null);
          loadProducts();
        } else {
          toast.error("❌ Error updating product: " + data.error);
        }
      } catch (err) {
        console.error("Edit product error:", err);
        toast.error("❌ Technical error: " + err.message);
      }
    } else {
      // Create mode
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newProd.name,
            price: `₹${newProd.price} per piece/day`,
            stock: newProd.stock || "100",
            icon: newProd.icon || "🪵"
          })
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("✅ Product successfully added!");
          setNewProd({ name: "", price: "", stock: "", icon: "" });
          loadProducts();
        } else {
          toast.error("❌ Error adding product: " + data.error);
        }
      } catch (err) {
        console.error("Add product error:", err);
        toast.error("❌ Technical error: " + err.message);
      }
    }
  };

  const startEdit = (p) => {
    setEditingProduct(p);
    const rawPrice = p.price ? p.price.replace(/[^\d.]/g, "") : "";
    setNewProd({
      name: p.name,
      price: rawPrice,
      stock: String(p.stock || "0"),
      icon: p.icon || "🪵"
    });
    toast.info(`✍️ Editing: ${p.name}`);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProd({ name: "", price: "", stock: "", icon: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("⚠️ Kya aap is product ko database se permanent delete karna chahte hain?")) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("🗑️ Product deleted successfully!");
        loadProducts();
        if (editingProduct && editingProduct._id === id) {
          cancelEdit();
        }
      } else {
        toast.error("❌ Error deleting product: " + data.error);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("❌ Technical error: " + err.message);
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
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p._id || p.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-mono">#MT-{p.id || String(p._id).slice(-4).toUpperCase()}</td>
                    <td className="p-4 font-bold text-brand-dark flex items-center gap-2">
                      <span className="text-xl">{p.icon || "🪵"}</span>
                      <span>{p.name}</span>
                    </td>
                    <td className="p-4 text-brand-blue font-semibold">{p.price}</td>
                    <td className="p-4 font-medium">{p.stock || "100+ Pcs"}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="bg-sky-50 text-[#1251A3] hover:bg-sky-100 p-2 rounded-xl transition"
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-2 rounded-xl transition"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm h-fit">
          <h3 className="font-heading text-md font-bold text-brand-dark mb-4">
            {editingProduct ? "Edit Product" : "Stock Entry Form"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Item Name" placeholder="e.g. Gatur Wood" value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} />
            <Input label="Item Icon / Emoji" placeholder="e.g. 🛠️" value={newProd.icon} onChange={(e) => setNewProd({...newProd, icon: e.target.value})} />
            <Input label="Price per Day (₹)" placeholder="e.g. 12" value={newProd.price} onChange={(e) => setNewProd({...newProd, price: e.target.value})} />
            <Input label="Initial Inventory Count" placeholder="e.g. 250" value={newProd.stock} onChange={(e) => setNewProd({...newProd, stock: e.target.value})} />
            
            <div className="flex gap-2">
              <Button type="submit" variant="primary" className="w-full">
                {editingProduct ? "Save Changes" : "Product Add Karein"}
              </Button>
              {editingProduct && (
                <Button type="button" variant="outline" onClick={cancelEdit} className="w-1/2 flex items-center justify-center gap-1">
                  <X size={14} /> Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
