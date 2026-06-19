export default function NotificationCard({ notification }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-brand-blue/10 shadow-sm">
      <div className="text-sm font-medium">{notification?.title}</div>
      <div className="text-xs text-gray-500 mt-1">{notification?.message}</div>
    </div>
  );
}
