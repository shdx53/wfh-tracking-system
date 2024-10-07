export async function fetchArrangements(
  selectedDate,
  arrangementID,
  requestStatus,
  staffID,
) {
  let res;

  // Fetch arrangements by Start_Date
  if (selectedDate) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements?startDate=${selectedDate}`,
    );
  }

  // Fetch pending and recurring arrangements by Arrangement_ID
  if (arrangementID) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/pending/recurring/${arrangementID}`,
    );
  }

  // Fetch arrangements by Request_Status and StaffID
  if (requestStatus && staffID) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/${requestStatus}?staffID=${staffID}`,
    );
  }

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
