"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import Badge from "@/components/ui/Badge";
import { mockOrders } from "@/data/mockData";

export default function ManageRentalsAdminPage() {
  const columns = [
    { header: "Rental Reference", accessor: "id" },
    { header: "Customer Name", accessor: "customer" },
    { header: "Rental Window Duration", accessor: "date" },
    { 
      header: "Status Flags", 
      accessor: "status",
      render: (val) => (
        <Badge variant={val === "Active" ? "warning" : "success"}>
          {val}
        </Badge>
      )
    }
  ];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Active Rental Workflows</h1>
          <p className="text-gray-500 text-sm">Live physical tracking monitoring logs for Hardoi facility inventory.</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-blue/10 shadow-sm p-4 overflow-hidden">
          <DataTable columns={columns} data={mockOrders} />
        </div>
      </div>
    </DashboardLayout>
  );
}
