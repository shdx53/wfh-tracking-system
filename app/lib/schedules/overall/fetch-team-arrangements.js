export async function fetchTeamArrangements(selectedTeam) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/requests?team=${selectedTeam}`,
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
