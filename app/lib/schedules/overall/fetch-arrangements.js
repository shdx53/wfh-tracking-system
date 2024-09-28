export default async function fetchArrangements(selectedDate) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/requests?startDate=${selectedDate}`,
  );

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  
  return res.json();
}
