export default async function fetchArrangements(queryKey, type) {
  const { staffID } = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/requests/${type}?staffID=${staffID}`,
  );
  return res.json();
}
