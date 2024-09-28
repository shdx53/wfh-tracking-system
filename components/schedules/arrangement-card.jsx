export default function ArrangementCard({
  page,
  firstName,
  lastName,
  dept,
  shiftType,
  arrangement,
  status,
}) {
  const classStyles = {
    AM: "bg-blue-100/40 border-blue-700",
    PM: "bg-indigo-100/40 border-indigo-700",
    "All Day": "bg-teal-100/40 border-teal-700",
  };

  return (
    <div
      className={`flex justify-between rounded-lg border-l-[10px] p-6 ${classStyles[shiftType]} ${status === "pending" && "opacity-50"}`}
    >
      <div className="flex flex-col gap-1">
        <div className="font-semibold">
          {page === "overall" ? `${firstName} ${lastName}` : arrangement}
        </div>
        <div className="opacity-70">
          {page === "overall" ? dept : shiftType}
        </div>
      </div>
      {page === "overall" && <div className="font-medium">{shiftType}</div>}
      {status === "pending" && <div className="italic">Pending</div>}
    </div>
  );
}
