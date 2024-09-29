// Component
import ArrangementCard from "@/components/schedules/arrangement-card";

// Function
import { formatDateToShortString } from "@/app/lib/utils";

// Filter arrangements that matches selected date
function filterArrangements(arrangements, selectedDate) {
  return arrangements.filter((arrangement) => {
    const formattedStartDate = formatDateToShortString(arrangement.Start_Date);
    return formattedStartDate === selectedDate;
  });
}

export function renderArrangementCards(arrangements, selectedDate) {
  const filteredArrangements = filterArrangements(arrangements, selectedDate);

  return filteredArrangements.map((arrangement, index) => {
    const shiftType = arrangement.Shift_Type;
    return (
      <ArrangementCard
        key={index}
        page="personal"
        shiftType={shiftType === "Full Day" ? "All Day" : shiftType}
        arrangement="Work-From-Home"
      />
    );
  });
}
