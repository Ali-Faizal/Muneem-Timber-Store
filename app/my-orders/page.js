"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderCard from "@/components/dashboard/OrderCard";
import { mockOrders } from "@/data/mockData";

export default function MyOrdersPage() {
  return (
    <DashboardLayout isAdmin={false}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Mere Orders</h1>
          <p className="text-gray-500 text-sm">Aapke sabhi booking items ki list</p>
        </div>
        <div className="space-y-4 max-w-4xl">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
