export function filterTeamArrangements(
  selectedTab,
  teamArrangements,
  formattedQueryDate,
  setFilteredArrangements,
) {
  if (selectedTab === "In-Office") {
    const filtered = [];

    teamArrangements.forEach((arrangement) => {
      const startDates = arrangement.Start_Date;
      const shiftTypes = arrangement.Shift_Type;

      if (startDates) {
        const startDateArr = startDates.split(",");
        const shiftTypeArr = shiftTypes.split(",");

        if (startDateArr.includes(formattedQueryDate)) {
          const matchingStartDates = [];

          for (let i = 0; i < startDateArr.length; i++) {
            const startDate = startDateArr[i];
            // Skip checking if the Start_Date has already been checked
            if (
              startDate === formattedQueryDate &&
              !matchingStartDates.includes(startDate)
            ) {
              // Find all indexes with the same Start_Date
              const matchingIndexes = [];
              startDateArr.forEach((date, index) => {
                if (date === startDate) {
                  matchingIndexes.push(index);
                  matchingStartDates.push(date);
                }
              });

              if (matchingIndexes.length === 1) {
                const matchStartDate = startDateArr[matchingIndexes[0]];
                const matchShiftType = shiftTypeArr[matchingIndexes[0]];

                // If there is only one matching arrangement and the Shift_Type is not Full Day,
                // there are only two options: AM and PM
                // Add the opposite Shift_Type to the array
                if (matchShiftType !== "Full Day") {
                  filtered.push({
                    ...arrangement,
                    Start_Date: matchStartDate,
                    Shift_Type: matchShiftType === "AM" ? "PM" : "AM",
                  });
                }
              }
            }
          }
        } else {
          // No Start_Date matches the selected date
          filtered.push({
            ...arrangement,
            Start_Date: formattedQueryDate,
            Shift_Type: null,
          });
        }
      } else {
        // Start_Date is null
        filtered.push(arrangement);
      }
    });
    setFilteredArrangements(filtered);
  } else if (selectedTab === "Work-From-Home") {
    const filtered = [];

    teamArrangements.forEach((arrangement) => {
      const startDates = arrangement.Start_Date;
      const shiftTypes = arrangement.Shift_Type;

      if (startDates) {
        const startDateArr = startDates.split(",");
        const shiftTypeArr = shiftTypes.split(",");

        for (let i = 0; i < startDateArr.length; i++) {
          const startDate = startDateArr[i];
          const shiftType = shiftTypeArr[i];

          if (startDate === formattedQueryDate) {
            filtered.push({
              ...arrangement,
              Start_Date: startDate,
              Shift_Type: shiftType,
            });
          }
        }
      }
    });
    setFilteredArrangements(filtered);
  } else {
    const filtered = [];
    setFilteredArrangements(filtered);
  }
}
