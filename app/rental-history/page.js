"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/dashboard/DataTable";
import Badge from "@/components/ui/Badge";
import { mockOrders } from "@/data/mockData";

export default function RentalHistoryPage() {
  const rentalColumns = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer Name", accessor: "customer" },
    { header: "Total Amount", accessor: "total" },
    { 
      header: "Status", 
      accessor: "status",
      render: (val) => (
        <Badge variant={val === "Active" ? "warning" : val === "Completed" ? "success" : "danger"}>
          {val}
        </Badge>
      )
    },
    { header: "Order Date", accessor: "date" }
  ];

  return (
    <DashboardLayout isAdmin={false}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Rental History Log</h1>
          <p className="text-gray-500 text-sm">Purane saare orders aur rentals ka track data</p>
        </div>
        <div className="bg-white rounded-2xl border border-brand-blue/10 shadow-sm p-4 overflow-hidden">
          <DataTable columns={rentalColumns} data={mockOrders} />
        </div>
      </div>
    </DashboardLayout>
  );
}
