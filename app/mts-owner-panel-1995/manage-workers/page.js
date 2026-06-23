"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Wrench, 
  Sparkles, 
  Search, 
  TrendingUp, 
  Upload, 
  UserCheck, 
  Briefcase 
} from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "mistri", label: "Mistri / Raj Mistri" },
  { value: "plumber", label: "Plumber" },
  { value: "electrician", label: "Electrician" },
  { value: "emergency-manpower", label: "Emergency Manpower / Labor" },
  { value: "carpenter", label: "Carpenter" },
  { value: "painter", label: "Painter" },
  { value: "tile expert", label: "Tile Expert" },
  { value: "pop expert", label: "POP Expert" }
];

export default function ManageWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    category: "mistri",
    experience: "5+ Years",
    dailyRate: "",
    skills: "",
    availability: true,
    location: "Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: ""
  });

  // Fetch all workers
  const loadWorkers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/workers");
      if (res.ok) {
        const data = await res.json();
        setWorkers(data);
      }
    } catch (e) {
      console.error("Failed to load workers:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  // Handle file base64 convert
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Limit file size to 2MB to avoid huge database documents
      if (file.size > 2 * 1024 * 1024) {
        alert("❌ File size limits are 2MB! Please upload a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/api/workers";
    const method = editMode ? "PUT" : "POST";
    const payload = editMode ? { ...form, id: currentId } : form;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`✅ Worker successfully ${editMode ? "updated" : "created"}!`);
        setModalOpen(false);
        resetForm();
        loadWorkers();
      } else {
        const errData = await res.json();
        alert(`❌ Error: ${errData.error || "Save operation failed"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Request error, please try again.");
    }
  };

  // Toggle availability directly
  const handleToggleAvailability = async (worker) => {
    try {
      const res = await fetch("/api/workers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: worker._id,
          availability: !worker.availability
        })
      });

      if (res.ok) {
        loadWorkers();
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete worker
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this worker?")) return;

    try {
      const res = await fetch(`/api/workers?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("✅ Worker deleted successfully!");
        loadWorkers();
      } else {
        alert("❌ Failed to delete worker.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Setup Edit
  const startEdit = (worker) => {
    setEditMode(true);
    setCurrentId(worker._id);
    setForm({
      name: worker.name,
      category: worker.category,
      experience: worker.experience || "5+ Years",
      dailyRate: worker.dailyRate,
      skills: Array.isArray(worker.skills) ? worker.skills.join(", ") : worker.skills || "",
      availability: worker.availability,
      location: worker.location || "Hardoi",
      phone: worker.phone || "9580716752",
      whatsapp: worker.whatsapp || "919580716752",
      photoUrl: worker.photoUrl || ""
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "mistri",
      experience: "5+ Years",
      dailyRate: "",
      skills: "",
      availability: true,
      location: "Hardoi",
      phone: "9580716752",
      whatsapp: "919580716752",
      photoUrl: ""
    });
    setEditMode(false);
    setCurrentId(null);
  };

  // Filter listings
  const filteredWorkers = workers.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || 
                        (w.skills && w.skills.some(s => s.toLowerCase().includes(search.toLowerCase())));
    const matchCat = filterCategory === "all" || w.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-[#0D1B2A] tracking-tight">
              Manage Workers Registry
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              Add, edit, or delete active service providers available in Muneem Timber Store.
            </p>
          </div>

          <button 
            onClick={() => {
              resetForm();
              setModalOpen(true);
            }}
            className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-5 py-3 rounded-xl font-bold text-xs transition flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <UserPlus size={16} />
            Add Worker Provider
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search by name or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50 flex-grow md:flex-grow-0"
            >
              <option value="all">All Categories</option>
              {CATEGORY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center border">
              Total: {filteredWorkers.length}
            </div>
          </div>
        </div>

        {/* Worker Table Card list */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 animate-pulse">
            <p className="text-xs text-gray-500 font-semibold">Loading workers registry...</p>
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Users size={40} className="text-gray-300 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-sm text-[#0D1B2A]">No providers found</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1">
              Search criteria modify karein ya naya worker provider create karein.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-gray-700 uppercase font-mono text-[10px] tracking-wider">
                    <th className="py-4 px-6">Worker Info</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Daily Rate</th>
                    <th className="py-4 px-6">Availability</th>
                    <th className="py-4 px-6">Skills</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWorkers.map((worker) => (
                    <tr key={worker._id} className="hover:bg-slate-50/50 transition">
                      {/* Name / Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 border flex items-center justify-center font-heading font-bold text-blue-600 text-sm overflow-hidden flex-shrink-0">
                            {worker.photoUrl ? (
                              <img src={worker.photoUrl} alt={worker.name} className="w-full h-full object-cover" />
                            ) : (
                              worker.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0D1B2A]">{worker.name}</h4>
                            <div className="text-[10px] text-gray-500 flex items-center gap-1.5 mt-0.5 font-mono">
                              <span>⭐ {worker.rating || "4.8"}</span>
                              <span>•</span>
                              <span>{worker.experience || "5+ Years"} exp</span>
                              <span>•</span>
                              <span>📍 {worker.location || "Hardoi"}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 font-semibold uppercase tracking-wider text-[10px] text-slate-700">
                        {worker.category}
                      </td>

                      {/* Daily Rate */}
                      <td className="py-4 px-6 font-bold text-[#1251A3]">
                        ₹{worker.dailyRate}/day
                      </td>

                      {/* Availability status */}
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => handleToggleAvailability(worker)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition ${
                            worker.availability 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {worker.availability ? "Available" : "Engaged"}
                        </button>
                      </td>

                      {/* Skills list */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {worker.skills?.map((skill, sIdx) => (
                            <span 
                              key={sIdx} 
                              className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Edit/Delete Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => startEdit(worker)}
                            className="p-2 text-[#1251A3] hover:bg-[#1251A3]/5 rounded-lg border border-slate-100 transition"
                            title="Edit Worker"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(worker._id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-100 transition"
                            title="Delete Worker"
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
        )}

      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#0A3578]/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#1251A3]/10 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#0D1B2A]">
                  {editMode ? "Edit Worker Profile" : "Register New Worker"}
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Database update values for store-backed marketplace listings.</p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter name"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Category Type</label>
                  <select 
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  >
                    {CATEGORY_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Experience Level</label>
                  <input 
                    type="text" 
                    required
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 8+ Years"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Daily Charge Rate (INR)</label>
                  <input 
                    type="number" 
                    required
                    value={form.dailyRate}
                    onChange={(e) => setForm({ ...form, dailyRate: e.target.value })}
                    placeholder="e.g. 700"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Contact Phone</label>
                  <input 
                    type="text" 
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Worker mobile number"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp Mobile</label>
                  <input 
                    type="text" 
                    required
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="e.g. 919580716752"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Skills Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="e.g. Brick Work, Plastering, Tiles"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Working Location</label>
                  <input 
                    type="text" 
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1251A3] bg-slate-50"
                  />
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input 
                    type="checkbox"
                    id="availability"
                    checked={form.availability}
                    onChange={(e) => setForm({ ...form, availability: e.target.checked })}
                    className="w-4 h-4 text-[#1251A3] border-gray-300 rounded focus:ring-[#1251A3]"
                  />
                  <label htmlFor="availability" className="text-xs font-bold text-gray-700 cursor-pointer">
                    Is Available Now
                  </label>
                </div>
              </div>

              {/* Photo Upload Container */}
              <div className="border border-dashed border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
                <div className="w-16 h-16 rounded-full border border-slate-200 bg-white overflow-hidden flex items-center justify-center text-gray-400 font-heading text-xs font-extrabold flex-shrink-0 relative">
                  {form.photoUrl ? (
                    <img src={form.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    "Photo"
                  )}
                </div>

                <div className="flex-1 w-full space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Upload Profile Photo</label>
                  <div className="flex items-center gap-2">
                    <label className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-[11px] font-bold text-[#1251A3] cursor-pointer flex items-center gap-1.5 transition">
                      <Upload size={12} />
                      Choose Image
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {form.photoUrl && (
                      <button 
                        type="button" 
                        onClick={() => setForm(prev => ({ ...prev, photoUrl: "" }))}
                        className="text-rose-600 font-bold text-[10px] hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[9px] text-gray-400 leading-none">Max file size 2MB (base64 stored in MongoDB)</p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4 border-t mt-4">
                <button 
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-grow border text-slate-700 py-2.5 rounded-xl text-xs font-bold transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-grow bg-[#1251A3] hover:bg-[#0A3578] text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Check size={14} />
                  Save Worker Details
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
