export async function fetchTeamArrangements(selectedTeam, staffID, selectedDate) {
  let res;

  // For HR and Senior Management
  if (selectedTeam && !staffID) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/requests?team=${selectedTeam}`,
    );
  }

  // For Managers and Staff
  if (!selectedTeam && staffID) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/requests/teams?staffID=${staffID}&startDate=${selectedDate}`,
    );
  }

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
