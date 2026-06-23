"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { DollarSign, BarChart2, TrendingUp } from "lucide-react";

export default function RevenueAnalyticsPage() {
  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Financial & Revenue Metrics</h1>
          <p className="text-gray-500 text-sm">Real-time ledger audit matrix summaries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Monthly Gross" value="₹1,24,500" icon={DollarSign} type="success" />
          <StatsCard title="Outstanding Balances" value="₹24,100" icon={BarChart2} type="warning" />
          <StatsCard title="Yearly Target Projections" value="84% Achieved" icon={TrendingUp} type="info" />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm">
          <h3 className="font-heading text-md font-bold text-brand-dark mb-4">Branch Settlement Logs</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Data values reflecting net customer cash-flows. Ledger metrics reflect automated calculations using local parameters specified for item profiles.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
