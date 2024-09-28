// Component
import ArrangementCard from "@/components/schedule/arrangement-card";

export function renderTabContent(
  isArrangementsPending,
  isArrangementsError,
  filteredArrangements,
  currentPageArrangements,
) {
  const order = ["AM", "PM", "Full Day", null];

  // Sort filteredArrangements by Shift_Type
  currentPageArrangements.sort((a, b) => {
    return order.indexOf(a.Shift_Type) - order.indexOf(b.Shift_Type);
  });

  // Create a Set to store unique employee names from filteredArrangements
  const uniqueEmployees = new Set();

  filteredArrangements.forEach((arrangement) => {
    const employeeIdentifier = `${arrangement.Staff_ID}`;
    uniqueEmployees.add(employeeIdentifier);
  });

  const uniqueEmployeeCount = uniqueEmployees.size; 

  return (
    <>
      {isArrangementsPending && (
        <div className="pt-12">Loading arrangements...</div>
      )}

      {isArrangementsError && (
        <div className="pt-12">
          Oops! Something went wrong while fetching the arrangements. Please try
          again later.
        </div>
      )}

      {!isArrangementsPending && !isArrangementsError && (
        <>
          {/* Employee Count */}
          <div className="flex flex-col gap-1 pb-4 pt-12">
            <div>Employee Count</div>
            <div className="text-3xl font-medium">
              {uniqueEmployeeCount}
            </div>
          </div>

          {/* Arrangements */}
          {currentPageArrangements.map((arrangement, index) => {
            const firstName = arrangement.Staff_FName;
            const lastName = arrangement.Staff_LName;
            const dept = arrangement.Dept;
            const shiftType = arrangement.Shift_Type;
            const requestStatus = arrangement.Request_Status;

            return (
              <ArrangementCard
                key={index}
                page="overall"
                firstName={firstName}
                lastName={lastName}
                dept={dept}
                shiftType={
                  shiftType === "Full Day" || shiftType === null
                    ? "All Day"
                    : shiftType
                }
                status={requestStatus}
              />
            );
          })}
        </>
      )}
    </>
  );
}
