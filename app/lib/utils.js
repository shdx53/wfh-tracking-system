import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateToShortString(date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short", // e.g., Mon
    month: "short", // e.g., Sep
    day: "2-digit", // e.g., 16
    year: "numeric", // e.g., 2024
  });

  return formattedDate;
}

export function formatDateToISO(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Get the full year (YYYY)
  const year = date.getFullYear();

  // Get the month (MM) and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0");

  // Get the day (DD) and pad with zero if needed
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  // Return the formatted date
  return formattedDate;
}

export function normalizeDate(date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time

  return newDate;
}

export function sortArrangementsByShiftType(arrangements) {
  const order = ["AM", "PM", "Full Day", null];

  const sortedArrangements = arrangements.sort((a, b) => {
    return order.indexOf(a.Shift_Type) - order.indexOf(b.Shift_Type);
  });

  return sortedArrangements;
}

export function getEarliestDate(dateString) {
  const dateArray = dateString.split(",");

  return dateArray.reduce((earliest, current) => {
    return new Date(current) < new Date(earliest) ? current : earliest;
  });
}

export function sortArrangementsByStartDate(arrangements) {
  const sortedArrangements = arrangements.sort((a, b) => {
    const earliestA = getEarliestDate(a.Start_Date);
    const earliestB = getEarliestDate(b.Start_Date);
    return new Date(earliestA) - new Date(earliestB);
  });

  return sortedArrangements;
}
