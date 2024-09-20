"use client";

// Library
import { useEffect, useState } from "react";

// Component
import { BigCalendar } from "@/components/ui/big-calendar";
import { Calendar } from "@/components/ui/calendar";
import ArrangementCard from "@/app/components/schedule/arrangement-card";

export default function OwnSchedule() {
  // Initialize date to current date
  const [date, setDate] = useState(new Date().toString());

  // Format date for display on the UI
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short", // e.g., Mon
    month: "short", // e.g., Sep
    day: "2-digit", // e.g., 16
    year: "numeric", // e.g., 2024
  });

  // Re-render tags when month changed
  const [index, setIndex] = useState(0);
  useEffect(() => {
    /* Add schedule to calendar */
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
    const tagStyles = [
      "xl:py-1",
      "px-2",
      "rounded-md",
      "border-l-8",
      "text-left",
    ];

    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      if (button.textContent === "9") {
        // Parent Tag
        const parentTag = document.createElement("div");
        parentTag.classList.add(...parentTagStyles);

        // AM Tag
        const amTag = document.createElement("div");
        amTag.innerHTML = "<b>AM:</b> WFH";

        amTag.classList.add(...tagStyles, "bg-blue-100/40", "border-blue-700");
        amTag.style.backgroundColor = "#fafaff";

        parentTag.appendChild(amTag);
        button.appendChild(parentTag);

        // PM Tag
        const pmTag = document.createElement("div");
        pmTag.innerHTML = "<b>PM:</b> Leave";

        pmTag.classList.add(
          ...tagStyles,
          "bg-indigo-100/40",
          "border-indigo-700",
        );
        pmTag.style.backgroundColor = "#fafaff";

        parentTag.appendChild(pmTag);
        button.appendChild(parentTag);
      } else if (button.textContent === "20") {
        // Parent Tag
        const parentTag = document.createElement("div");
        parentTag.classList.add(...parentTagStyles);

        // All Day Tag
        const allDayTag = document.createElement("div");
        allDayTag.innerHTML = "<b>All Day:</b> WFH";

        allDayTag.classList.add(
          ...tagStyles,
          "bg-teal-100/40",
          "border-teal-700",
        );
        allDayTag.style.backgroundColor = "#fafaff";

        parentTag.appendChild(allDayTag);
        button.appendChild(parentTag);
      }
    });
  }, [index]);

  return (
    <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-none">
      <header className="flex flex-col gap-3 py-8">
        <h1 className="text-2xl font-bold">My Schedule</h1>
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
        />

        <section className="my-8 flex flex-col gap-6 rounded-lg border p-6 sm:p-8 md:my-0 md:w-1/2 md:p-6 lg:hidden lg:p-8">
          <h2 className="text-xl font-semibold">
            <div>Schedule for </div>
            <div>{formattedDate}</div>
          </h2>

          <div className="flex flex-col gap-4">
            <ArrangementCard
              page="own"
              type="AM"
              arrangement="Work-From-Home"
            />
            <ArrangementCard page="own" type="PM" arrangement="Leave" />
          </div>
        </section>
      </main>
    </div>
  );
}
