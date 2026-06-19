"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: "Mohit Hardoi",
    email: "mohit@gmail.com",
    phone: "+91 9876543210",
    address: "Cinema Road, Near Rumi Gate, Hardoi, UP"
  });

  return (
    <DashboardLayout isAdmin={false}>
      <div className="max-w-2xl bg-white rounded-2xl border border-brand-blue/10 shadow-sm p-6 md:p-8">
        <h1 className="font-heading text-xl font-bold text-brand-dark mb-6">Mera Profile Details</h1>
        
        <div className="space-y-5">
          <Input
            label="Poora Naam"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
          <Input
            label="Email Address"
            type="email"
            value={profile.email}
            disabled
          />
          <Input
            label="Mobile Number"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
          />
          <Input
            label="Delivery Address"
            value={profile.address}
            onChange={(e) => setProfile({...profile, address: e.target.value})}
          />

          <Button variant="primary" className="mt-4">
            Profile Save Karein
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
