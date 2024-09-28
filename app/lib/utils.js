import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short", // e.g., Mon
    month: "short", // e.g., Sep
    day: "2-digit", // e.g., 16
    year: "numeric", // e.g., 2024
  });
  return formattedDate;
}

export function toUTCDate(date) {
  if (!date) return null; // Return null for invalid dates

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return null; // Return null for invalid date strings

  return new Date(Date.UTC(
    dateObj.getUTCFullYear(),
    dateObj.getUTCMonth(),
    dateObj.getUTCDate()
  ));
}
