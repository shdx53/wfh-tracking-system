// Function
import { normalizeDate, sortArrangementsByShiftType } from "@/app/lib/utils";

export function filterArrangements(
  selectedTab,
  arrangements,
  normalizedDate,
  setFilteredArrangements,
) {
  if (selectedTab === "In-Office") {
    const filtered = [];
    arrangements.forEach((arrangement) => {
      const startDate = arrangement.Start_Date;

      if (startDate) {
        const normalizedStartDate = normalizeDate(startDate);

        if (normalizedStartDate.getTime() === normalizedDate.getTime()) {
          const staffID = arrangement.Staff_ID;

          // Find all records with the same Staff_ID and matching Start_Date
          const matches = arrangements.filter((arr) => {
            const arrStartDate = arr.Start_Date;
            const normalizedArrStartDate = normalizeDate(arrStartDate);

            return (
              arr.Staff_ID === staffID &&
              normalizedArrStartDate.getTime() === normalizedStartDate.getTime()
            );
          });

          if (matches.length === 1) {
            const matchShiftType = matches[0].Shift_Type;

            // If there is only one matching arrangement and the Shift_Type is not Full Day,
            // there are only two options: AM and PM
            // Add the opposite Shift_Type to the array
            if (matchShiftType !== "Full Day") {
              filtered.push({
                ...arrangement,
                Shift_Type: matchShiftType === "AM" ? "PM" : "AM",
              });
            }
          }
        } else {
          filtered.push(arrangement);
        }
      } else {
        filtered.push(arrangement);
      }
    });
    sortArrangementsByShiftType(filtered);
    setFilteredArrangements(filtered);
  } else if (selectedTab === "Work-From-Home") {
    const filtered = arrangements.filter((arrangement) => {
      const startDate = arrangement.Start_Date;

      if (startDate) {
        const normalizedStartDate = normalizeDate(startDate);

        // Return true if the arrangement date matches the selected date
        return normalizedStartDate.getTime() === normalizedDate.getTime();
      }
    });
    sortArrangementsByShiftType(filtered);
    setFilteredArrangements(filtered);
  } else {
    const filtered = [];
    sortArrangementsByShiftType(filtered);
    setFilteredArrangements(filtered);
  }
}
