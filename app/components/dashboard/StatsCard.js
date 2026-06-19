export default function StatsCard({ title, value, icon: Icon, trend, type }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-brand-blue/10 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-heading text-sm font-medium text-brand-dark">{title}</h4>
          <div className="text-xl font-bold mt-1">{value}</div>
        </div>
        {Icon ? <Icon className="w-8 h-8 text-gray-400" /> : null}
      </div>
      {trend ? <div className="text-xs text-gray-500 mt-2">{trend}</div> : null}
    </div>
  );
}
