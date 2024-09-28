export async function fetchTeams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
