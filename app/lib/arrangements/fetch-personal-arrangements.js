export default async function fetchPersonalArrangements(queryKey, type) {
  const { staffID, startDate } = queryKey;

  let res;

  if (staffID && startDate) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/requests/personal/${type}?staffID=${staffID}&startDate=${startDate}`,
    );
  } else if (staffID) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/requests/personal/${type}?staffID=${staffID}`,
    );
  }

  return res.json();
}
