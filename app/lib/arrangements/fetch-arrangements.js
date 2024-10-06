export async function fetchArrangements(selectedDate, arrangementID) {
  let res;

  // Fetch arrangements by Start_Date
  if (selectedDate) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements?startDate=${selectedDate}`,
    );
  }

  // Fetch arrangements by Arrangement_ID
  if (arrangementID) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/pending/recurring/${arrangementID}`,
    );
  }

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
