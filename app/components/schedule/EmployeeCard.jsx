export default function EmployeeCard({ type }) {
  let style = {};

  // Set background color and text color dynamically based on type (i.e., AM, PM, Full Day)
  switch (type) {
    case "AM":
      style.backgroundColor = "#1d4ed8";
      style.color = "#fff";
      break;
    case "PM":
      style.backgroundColor = "#4338ca";
      style.color = "#fff";
      break;
    default:
      style.backgroundColor = "#f2f2f2";
  }

  return (
    <div className="flex justify-between rounded-lg p-6" style={style}>
      <div className="flex flex-col gap-1">
        <div className="font-medium">John Doe</div>
        <div className="opacity-70">Sales</div>
      </div>
      <div>{type}</div>
    </div>
  );
}
