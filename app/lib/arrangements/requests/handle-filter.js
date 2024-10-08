import { formatDateToISO } from "../../utils";

export function handleFilter(
  selectedTab,
  employeeToFilter,
  startDateToFilter,
  setArrangementRequests,
  pendingArrangementRequestsCopy,
  processedArrangementRequestsCopy,
  setCurrentPage,
) {
  // Always reset to the first page
  // If users are not on the first page when they perform the filtering,
  // they may not see any request
  setCurrentPage(1);

  let arrangementRequestsCopy = [];

  // Determine the arrangement requests to filter based on the selected tab
  if (
    selectedTab === "Pending" &&
    pendingArrangementRequestsCopy &&
    Array.isArray(pendingArrangementRequestsCopy)
  ) {
    arrangementRequestsCopy = pendingArrangementRequestsCopy;
  } else if (
    selectedTab === "Processed" &&
    processedArrangementRequestsCopy &&
    Array.isArray(processedArrangementRequestsCopy)
  ) {
    arrangementRequestsCopy = processedArrangementRequestsCopy;
  }

  // Apply the filtering logic based on provided filters
  const filteredRequests = arrangementRequestsCopy.filter((request) => {
    let matchesEmployee = true;
    let matchesStartDate = true;

    // Filter by employee name if provided
    if (employeeToFilter) {
      const employee = employeeToFilter.toLowerCase();
      const fullName =
        `${request.Staff_FName} ${request.Staff_LName}`.toLowerCase();
      matchesEmployee = fullName.includes(employee);
    }

    // Filter by start date if provided
    if (startDateToFilter) {
      let startDate = request.Start_Date;

      // If it's a recurring request, get the earliest Start_Date
      if (startDate.includes(",")) {
        startDate = new Date(
          Math.min(...startDate.split(",").map((date) => new Date(date))),
        );
      }

      matchesStartDate =
        formatDateToISO(startDate) === formatDateToISO(startDateToFilter);
    }

    return matchesEmployee && matchesStartDate;
  });

  // Set the filtered requests or revert to original requests if no filters are applied
  setArrangementRequests(
    filteredRequests.length > 0 || employeeToFilter || startDateToFilter
      ? filteredRequests
      : arrangementRequestsCopy,
  );
}
