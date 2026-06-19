"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  const [notifEnabled, setNotifEnabled] = useState(true);

  return (
    <DashboardLayout isAdmin={false}>
      <div className="max-w-xl bg-white rounded-2xl border border-brand-blue/10 shadow-sm p-6">
        <h1 className="font-heading text-xl font-bold text-brand-dark mb-6">Account Settings</h1>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-medium text-brand-dark">WhatsApp Alerts</h3>
              <p className="text-xs text-gray-500 mt-0.5">Bill aur updates direct number par paayein</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifEnabled} 
              onChange={() => setNotifEnabled(!notifEnabled)}
              className="w-5 h-5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
            />
          </div>

          <div className="pt-2">
            <h3 className="font-medium text-brand-dark text-sm mb-3">Theme Variant (UI Option Only)</h3>
            <button className="px-4 py-2 text-xs font-semibold bg-brand-light text-brand-blue rounded-xl border border-brand-blue/20">
              Light Mode Theme Activated
            </button>
          </div>

          <Button variant="primary" className="w-full mt-4">
            Preferences Update Karein
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
