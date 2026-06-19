export default function DataTable({ columns = [], data = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-blue/10 shadow-sm overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c.accessor} className="text-left px-4 py-2">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((c) => (
                <td key={c.accessor} className="px-4 py-3">{c.render ? c.render(row[c.accessor]) : row[c.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
