export default function OrderCard({ order }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-brand-blue/10 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Order #{order?.id}</div>
          <div className="text-xs text-gray-500">{order?.customer}</div>
        </div>
        <div className="text-sm font-semibold">{order?.total}</div>
      </div>
    </div>
  );
}
