"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

// Component
import fetchPersonalArrangements from "@/app/lib/arrangements/fetch-personal-arrangements";
import Loading from "@/components/loading";
import { BigCalendar } from "@/components/ui/big-calendar";
import { Calendar } from "@/components/ui/calendar";

// Function
import { formatDateToShortString } from "@/app/lib/utils";
import { renderArrangementCards } from "../../lib/schedules/personal/render-arrangement-cards";
import { renderArrangementTags } from "../../lib/schedules/personal/render-arrangement-tags";

// Context
import { useLogin } from "@/app/context/login/login-context";

export default function PersonalSchedule() {
  // Get staff ID
  const { staffID } = useLogin();

  // Initialize date to current date
  const [date, setDate] = useState(new Date());

  // Format date for display on the UI
  const formattedDate = formatDateToShortString(date);

  // Fetch approved arrangements
  const approvedArrangementsQuery = useQuery({
    queryKey: ["approved arrangements", { staffID }],
    queryFn: ({ queryKey }) =>
      fetchPersonalArrangements(queryKey[1], "approved"),
  });
  const approvedArrangements = approvedArrangementsQuery.data;
  const isApprovedArrangementsPending = approvedArrangementsQuery.isPending;
  const isApprovedArrangementsError = approvedArrangementsQuery.isError;

  // Fetch pending arrangements
  const pendingArrangementsQuery = useQuery({
    queryKey: ["pending arrangements", { staffID }],
    queryFn: ({ queryKey }) =>
      fetchPersonalArrangements(queryKey[1], "pending"),
  });
  let pendingArrangements = pendingArrangementsQuery.data;
  const isPendingArrangementsPending = pendingArrangementsQuery.isPending;
  const isPendingArrangementsError = pendingArrangementsQuery.isError;

  // Add Request_Status field to differentiate approved arrangements
  // from pending arrangemeents if pendingArrangements is not undefined
  pendingArrangements =
    pendingArrangements &&
    Array.isArray(pendingArrangements) &&
    pendingArrangements.map((arrangement) => {
      return {
        ...arrangement,
        Request_Status: "pending",
      };
    });

  // Combine approvedArrangements and pendingArrangements if neither is undefined
  const arrangements = approvedArrangements &&
    Array.isArray(approvedArrangements) &&
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
              <div className="flex justify-center">
                <Loading />
              </div>
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
