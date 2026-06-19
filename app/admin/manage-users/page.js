"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserCard from "@/components/dashboard/UserCard";

export default function ManageUsersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCustomers(data);
        } else {
          console.error("Failed to load customers:", data);
        }
      })
      .catch((err) => console.error("Error loading customers:", err));
  }, []);

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Manage Registered Customers</h1>
          <p className="text-gray-500 text-sm font-sans mt-1">All store accounts lookup index from MongoDB database</p>
        </div>
        
        {customers.length === 0 ? (
          <p className="text-xs text-gray-500 italic py-6 font-sans">Koi customer accounts register nahi hain.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((user) => (
              <UserCard key={user._id || user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
