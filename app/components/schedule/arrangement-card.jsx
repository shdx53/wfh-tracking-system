export default function ArrangementCard({ page, type, arrangement, status }) {
  const classStyles = {
    AM: "bg-blue-100/40 border-blue-700",
    PM: "bg-indigo-100/40 border-indigo-700",
    "All Day": "bg-teal-100/40 border-teal-700",
  };

  return (
    <div
      className={`flex justify-between rounded-lg border-l-[10px] p-6 ${classStyles[type]} ${status === "pending" && "opacity-50"}`}
    >
      <div className="flex flex-col gap-1">
        <div className="font-semibold">{ page === "overall" ? "Phris Coskit" : arrangement }</div>
        <div className="opacity-70">{ page === "overall" ? "Sales" : type }</div>
      </div>
      {page === "overall" && <div className="font-medium">{type}</div>}
      {status === "pending" && <div className="italic">Pending</div>}
    </div>
  );
}
