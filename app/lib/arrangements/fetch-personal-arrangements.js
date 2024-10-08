export default async function fetchPersonalArrangements(
  queryKey,
  requestStatus,
) {
  const { staffID, startDate } = queryKey;

  let res;

  if (staffID && startDate && requestStatus) {
    // Fetch personal arrangements by Staff_ID, Start_Date, and Request_sTATUS
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal/${requestStatus}?staffID=${staffID}&startDate=${startDate}`,
    );
  } else if (staffID && requestStatus) {
    // Fetch personal arrangements by Staff_ID and Request_Status
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal/${requestStatus}?staffID=${staffID}`,
    );
  } else if (staffID) {
    // Fetch personal arrangements by Staff_ID
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal?staffID=${staffID}`,
    );
  }

  return res.json();
}
