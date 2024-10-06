export async function fetchTeamArrangements(
  selectedTeam,
  staffID,
  selectedDate,
) {
  let res;

  if (selectedTeam) {
    // For HR and Senior Management
    // Fetch arrangements by team
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements?team=${selectedTeam}`,
    );
  } else if (staffID && selectedDate) {
    // For Managers and Staff
    // Fetch team arrangements by Staff_ID and Start_Date
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/arrangements/teams?staffID=${staffID}&startDate=${selectedDate}`,
    );
  }

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
