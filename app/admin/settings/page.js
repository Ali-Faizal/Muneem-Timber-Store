"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [storeMeta, setStoreMeta] = useState({
    storeName: "Muneem Timber Store",
    locationCode: "Hardoi District, Uttar Pradesh",
    contactPhone: "+91 9450XXXXXX"
  });

  return (
    <DashboardLayout isAdmin={true}>
      <div className="max-w-2xl bg-white rounded-2xl border border-brand-blue/10 shadow-sm p-6 md:p-8">
        <h1 className="font-heading text-xl font-bold text-brand-dark mb-6">Global Facility Parameters Configuration</h1>
        
        <div className="space-y-5">
          <Input
            label="Corporate Registered Name"
            value={storeMeta.storeName}
            onChange={(e) => setStoreMeta({...storeMeta, storeName: e.target.value})}
          />
          <Input
            label="Branch Operational Location Address"
            value={storeMeta.locationCode}
            onChange={(e) => setStoreMeta({...storeMeta, locationCode: e.target.value})}
          />
          <Input
            label="Corporate Gateway Alert Number"
            value={storeMeta.contactPhone}
            onChange={(e) => setStoreMeta({...storeMeta, contactPhone: e.target.value})}
          />

          <div className="pt-2">
            <Button variant="primary">
              Global Cluster Sync Save
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
