export default function UserCard({ user }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-brand-blue/10 shadow-sm">
      <div className="text-sm font-medium">{user?.name}</div>
      <div className="text-xs text-gray-500">{user?.email}</div>
    </div>
  );
}
