"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import Badge from "@/components/ui/Badge";
import { mockOrders } from "@/data/mockData";

export default function ManageOrdersAdminPage() {
  const columns = [
    { header: "ID Token", accessor: "id" },
    { header: "Client Link", accessor: "customer" },
    { header: "Billing Gross", accessor: "total" },
    { 
      header: "Workflow Status", 
      accessor: "status",
      render: (val) => (
        <Badge variant={val === "Active" ? "warning" : "success"}>
          {val}
        </Badge>
      )
    },
    { header: "Creation Stamp", accessor: "date" }
  ];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Global Orders Log</h1>
          <p className="text-gray-500 text-sm">System configuration audit log for all client active receipts</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-blue/10 shadow-sm p-4 overflow-hidden">
          <DataTable columns={columns} data={mockOrders} />
        </div>
      </div>
    </DashboardLayout>
  );
}
