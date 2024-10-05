// Component
import ArrangementCard from "@/components/schedules/arrangement-card";

export default function TabContent({
  isViewTeamSchedule,
  isArrangementsPending,
  isArrangementsError,
  filteredArrangements,
  currentPageArrangements,
}) {
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
          {!isViewTeamSchedule ? (
            <div className="flex flex-col gap-1 pb-4 pt-12">
              <div>Employee Count</div>
              <div className="text-3xl font-medium">{uniqueEmployeeCount}</div>
            </div>
          ) : (
            <br />
          )}

          {/* Arrangements */}
          {currentPageArrangements.map((arrangement, index) => {
            const firstName = arrangement.Staff_FName;
            const lastName = arrangement.Staff_LName;
            const dept = arrangement.Dept;
            const position = arrangement.Position;
            const shiftType = arrangement.Shift_Type;
            const requestStatus = arrangement.Request_Status;

            return (
              <ArrangementCard
                key={index}
                page="overall/team"
                firstName={firstName}
                lastName={lastName}
                dept={dept}
                position={position}
                shiftType={
                  shiftType === "Full Day" || shiftType === null
                    ? "All Day"
                    : shiftType
                }
                requestStatus={requestStatus}
              />
            );
          })}
        </>
      )}
    </>
  );
}
