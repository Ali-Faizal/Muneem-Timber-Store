"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NotificationCard from "@/components/dashboard/NotificationCard";
import { mockNotifications } from "@/data/mockData";

export default function AdminNotificationsPage() {
  return (
    <DashboardLayout isAdmin={true}>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">System Alerts Registry</h1>
          <p className="text-gray-500 text-sm">Administrative log notification triggers.</p>
        </div>
        <div className="space-y-3">
          {mockNotifications.map((notif) => (
            <NotificationCard key={notif.id} notification={notif} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
