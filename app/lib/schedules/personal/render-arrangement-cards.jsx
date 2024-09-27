// Component
import ArrangementCard from "@/components/schedule/arrangement-card";

// Function
import { formatDate } from "@/app/lib/utils";

// Filter arrangements that matches selected date
function filterArrangements(arrangements, selectedDate) {
  return arrangements.filter((arrangement) => {
    const formattedStartDate = formatDate(arrangement.Start_Date);
    return formattedStartDate === selectedDate;
  });
}

export function renderArrangementCards(arrangements, selectedDate) {
  const filteredArrangements = filterArrangements(arrangements, selectedDate);
  return filteredArrangements.map((arrangement, index) => {
    const arrangementID = arrangement.Arrangement_ID;
    const shiftType = arrangement.Shift_Type;
    return (
      <ArrangementCard
        key={index}
        page="personal"
        type={shiftType === "Full Day" ? "All Day" : shiftType}
        arrangement="Work-From-Home"
      />
    );
  });
}