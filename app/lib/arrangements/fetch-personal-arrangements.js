export default async function fetchPersonalArrangements(queryKey, type) {
  const { staffID, startDate } = queryKey;

  let res;

  if (staffID && startDate) {
    // Fetch personal arrangements by Staff_ID and Start_Date
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal/${type}?staffID=${staffID}&startDate=${startDate}`,
    );
  } else if (staffID) {
    // Fetch personal arrangements by Staff_ID
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/personal/${type}?staffID=${staffID}`,
    );
  }

  return res.json();
}
