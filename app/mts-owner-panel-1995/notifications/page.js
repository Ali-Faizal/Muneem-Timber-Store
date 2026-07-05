"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NotificationCard from "@/components/dashboard/NotificationCard";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications?includeRead=true&limit=30");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setNotifications(data);
        }
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true })
      });
      if (res.ok) {
        toast.success("✅ Marked all notifications as read!");
        fetchNotifications();
      } else {
        toast.error("❌ Failed to update notifications");
      }
    } catch (err) {
      console.error("Error marking all read:", err);
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="max-w-3xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-heading text-2xl font-bold text-brand-dark">System Alerts Registry</h1>
            <p className="text-gray-500 text-sm">Administrative log notification triggers.</p>
          </div>
          {notifications.some(n => !n.read) && (
            <Button variant="outline" onClick={handleMarkAllRead} className="text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1251A3]"></div>
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-xs text-gray-500 italic py-6">Koi system alerts nahi hain.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif._id} className={notif.read ? "opacity-60" : "font-bold"}>
                <NotificationCard notification={notif} />
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
