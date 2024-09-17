export default function EmployeeCard({ type }) {
  const classStyles = {
    AM: "bg-blue-100/40 border-blue-700",
    PM: "bg-indigo-100/40 border-indigo-700",
    "All Day": "bg-teal-100/40 border-teal-700",
  };

  return (
    <div
      className={`flex justify-between rounded-lg border-l-[10px] p-6 ${classStyles[type]}`}
    >
      <div className="flex flex-col gap-1">
        <div className="font-medium">John Doe</div>
        <div className="opacity-70">Sales</div>
      </div>
      <div>{type}</div>
    </div>
  );
}
