"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

// Component
import ArrangementCard from "@/app/components/schedule/arrangement-card";
import { BigCalendar } from "@/components/ui/big-calendar";
import { Calendar } from "@/components/ui/calendar";
import fetchArrangements from "./fetch-arrangements";

function formatDate(date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short", // e.g., Mon
    month: "short", // e.g., Sep
    day: "2-digit", // e.g., 16
    year: "numeric", // e.g., 2024
  });
  return formattedDate;
}

// Filter arrangements that matches selected date
function filterArrangements(arrangements, selectedDate) {
  return arrangements.filter((arrangement) => {
    const formattedStartDate = formatDate(arrangement.Start_Date);
    return formattedStartDate === selectedDate;
  });
}

function renderArrangementCards(arrangements, selectedDate) {
  const filteredArrangements = filterArrangements(arrangements, selectedDate);
  return filteredArrangements.map((arrangement, index) => {
    const arrangementID = arrangement.Arrangement_ID;
    const shiftType = arrangement.Shift_Type;
    return (
      <ArrangementCard
        key={index}
        page="personal"
        type={shiftType === "Full Day" ? "All Day" : shiftType}
        arrangement="Work-From-Home"
      />
    );
  });
}

// Define tag base styles
const parentTagStyles = [
  "hidden",
  "absolute",
  "inset-x-4",
  "bottom-4",
  "lg:flex",
  "flex-col",
  "gap-2",
  "text-[10px]",
  "xl:text-sm",
  "text-black",
];
const tagStyles = ["xl:py-1", "px-2", "rounded-md", "border-l-8", "text-left"];

function renderArrangementTags(arrangements, formattedDate) {
  return arrangements.map((arrangement) => {
    const startDate = arrangement.Start_Date;
    const startDateObj = new Date(startDate);
    const day = String(startDateObj.getDate()); // e.g., 16
    const numericMonth = String(startDateObj.getMonth() + 1); // e.g., 09
    const stringMonth = startDateObj.toLocaleString("default", {
      month: "short",
    });
    const year = String(startDateObj.getFullYear()); // e.g., 2024

    const shiftType = arrangement.Shift_Type;
    const requestStatus = arrangement.Request_Status;

    if (formattedDate.includes(stringMonth)) {
      const buttons = document.querySelectorAll(".rdp-button.relative");
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.textContent.substring(0, 2) === day) {
          // Check if parentTag exists, else create a parentTag
          let parentTag = document.getElementById(
            `${day}-${numericMonth}-${year}`,
          );

          if (!parentTag) {
            parentTag = document.createElement("div");
            parentTag.setAttribute("id", `${day}-${numericMonth}-${year}`);
            parentTag.classList.add(...parentTagStyles);
          }

          // Create tag
          const tag = document.createElement("div");

          switch (shiftType) {
            case "AM":
              tag.classList.add(
                ...tagStyles,
                "bg-blue-100/40",
                "border-blue-700",
              );
              break;
            case "PM":
              tag.classList.add(
                ...tagStyles,
                "bg-indigo-100/40",
                "border-indigo-700",
              );
              break;
            case "Full Day":
              tag.classList.add(
                ...tagStyles,
                "bg-teal-100/40",
                "border-teal-700",
              );
              break;
          }

          tag.innerHTML = `<b>${shiftType === "Full Day" ? "All Day" : shiftType}:</b> WFH`;
          tag.style.backgroundColor = "#fafaff";

          requestStatus === "pending" && tag.classList.add("opacity-50");

          parentTag.appendChild(tag);

          // Append the parentTag to the button if it's not already appended
          !button.contains(parentTag) && button.appendChild(parentTag);

          break;
        }
      }
    }
  });
}

export default function PersonalSchedule() {
  return (
    <Suspense>
      <PersonalScheduleContent />
    </Suspense>
  );
}

function PersonalScheduleContent() {
  // Get staff ID from query params
  const searchParams = useSearchParams();
  const staffID = searchParams.get("staffID");

  // Initialize date to current date
  const [date, setDate] = useState(new Date().toString());

  // Format date for display on the UI
  const formattedDate = formatDate(date);

  // Fetch approved arrangements
  const approvedArrangementsQuery = useQuery({
    queryKey: ["approved arrangements", { staffID: staffID }],
    queryFn: ({ queryKey }) => fetchArrangements(queryKey[1], "approved"),
  });
  const approvedArrangements = approvedArrangementsQuery.data;
  const isApprovedArrangementsPending = approvedArrangementsQuery.isPending;
  const isApprovedArrangementsError = approvedArrangementsQuery.isError;

  // Fetch pending arrangements
  const pendingArrangementsQuery = useQuery({
    queryKey: ["pending arrangements", { staffID: staffID }],
    queryFn: ({ queryKey }) => fetchArrangements(queryKey[1], "pending"),
  });
  let pendingArrangements = pendingArrangementsQuery.data;
  const isPendingArrangementsPending = pendingArrangementsQuery.isPending;
  const isPendingArrangementsError = pendingArrangementsQuery.isError;

  // Add Request_Status field to differentiate approved arrangements
  // from pending arrangemeents if pendingArrangements is not undefined
  pendingArrangements =
    pendingArrangements &&
    pendingArrangements.map((arrangement) => {
      return {
        ...arrangement,
        Request_Status: "pending",
      };
    });

  // Combine approvedArrangements and pendingArrangements if neither is undefined
  const arrangements = approvedArrangements &&
    pendingArrangements && [...approvedArrangements, ...pendingArrangements];

  // Render arrangement cards if arrangements is not undefined
  const arrangementCards = arrangements
    ? renderArrangementCards(arrangements, formattedDate)
    : null;

  // Prevents arrangement tags from re-rendering
  const hasArrangementTagsRenderedOnce = useRef(false);
  if (arrangements && !hasArrangementTagsRenderedOnce.current) {
    renderArrangementTags(arrangements, formattedDate);
    hasArrangementTagsRenderedOnce.current = true;
  }

  // Re-render tags when month changed
  const [index, setIndex] = useState(0);
  useEffect(() => {
    arrangements && renderArrangementTags(arrangements, formattedDate);
  }, [index]);

  return (
    <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-none">
      <header className="flex flex-col gap-3 py-8">
        <h1 className="text-2xl font-bold">My Schedule</h1>
        <div className="text-sm text-black/50">
          <span className="italic">Note:</span>
          <span>
            {" "}
            If you have pending Work-From-Home requests, they will appear greyed
            out.
          </span>
        </div>
      </header>

      <main className="items-start md:flex md:gap-4 lg:gap-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border p-6 sm:p-8 md:w-1/2 md:p-6 lg:hidden lg:p-8"
        />
        {/* >= 1024px */}
        <BigCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="hidden w-full rounded-lg lg:block"
          index={index}
          setIndex={setIndex}
          date={date}
          setDate={setDate}
        />

        <section className="my-8 flex flex-col gap-6 rounded-lg border p-6 sm:p-8 md:my-0 md:w-1/2 md:p-6 lg:hidden lg:p-8">
          <h2 className="text-xl font-semibold">
            <div>Schedule for </div>
            <div>{formattedDate}</div>
          </h2>

          <div className="flex flex-col gap-4">
            {(isApprovedArrangementsPending ||
              isPendingArrangementsPending) && (
              <div>Loading arrangements...</div>
            )}
            {(isApprovedArrangementsError || isPendingArrangementsError) && (
              <div>
                Oops! Something went wrong while fetching your arrangements.
                Please try again later.
              </div>
            )}
            {arrangementCards && arrangementCards.length > 0
              ? arrangementCards
              : !isApprovedArrangementsPending &&
                !isPendingArrangementsPending &&
                !isApprovedArrangementsError &&
                !isPendingArrangementsError && (
                  <div>No arrangements found for the selected date.</div>
                )}
          </div>
        </section>
      </main>
    </div>
  );
}
