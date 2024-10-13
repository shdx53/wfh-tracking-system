export async function fetchEmployeePosition(staffID) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/employees?staffID=${staffID}`,
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
