"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Component
import TabContent from "@/components/schedules/overall/tab-content";
import { Calendar } from "@/components/ui/calendar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Function
import { fetchTeamArrangements } from "@/app/lib/arrangements/fetch-team-arrangements";
import { filterTeamArrangements } from "@/app/lib/schedules/filter-team-arrangements";
import { renderPaginationItems } from "@/app/lib/schedules/overall/render-pagination-items";
import { formatDateToISO, formatDateToShortString } from "@/app/lib/utils";

export default function TeamSchedule() {
  // Get staff ID from query params
  const searchParams = useSearchParams();
  const staffID = searchParams.get("staffID");

  // Initialize date to current date
  const [date, setDate] = useState(new Date());

  // Format date for display on the UI
  const formattedDate = formatDateToShortString(date);

  /* Query team arrangements logic */
  // Formatted date
  const formattedSelectedDate = formatDateToISO(date);

  const [selectedTab, setSelectedTab] = useState("In-Office");
  const [filteredArrangements, setFilteredArrangements] = useState([]);

  // Fetch all team arrangements for the selected date
  const teamArrangementsQuery = useQuery({
    queryKey: ["team arrangements", { staffID, formattedSelectedDate }],
    queryFn: ({ queryKey }) =>
      fetchTeamArrangements(
        null,
        queryKey[1].staffID,
        queryKey[1].formattedSelectedDate,
      ), // TO BE CHANGED
  });
  const teamArrangements = teamArrangementsQuery.data;
  const isTeamArrangementsPending = teamArrangementsQuery.isPending;
  const isTeamArrangementsError = teamArrangementsQuery.isError;

  useEffect(() => {
    if (teamArrangements && Array.isArray(teamArrangements)) {
      filterTeamArrangements(
        selectedTab,
        teamArrangements,
        formattedSelectedDate,
        setFilteredArrangements,
      );
    }
  }, [date, selectedTab, teamArrangements]);

  /* Pagination logic */
  const arrangementsPerPage = 10;
  const totalArrangements = filteredArrangements.length;
  const totalPages = Math.ceil(totalArrangements / arrangementsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * arrangementsPerPage;
  const endIndex = startIndex + arrangementsPerPage;
  const currentPageArrangements = filteredArrangements.slice(
    startIndex,
    endIndex,
  );

  return (
    <Suspense>
      <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-none">
        <header className="flex flex-col gap-3 py-8">
          <h1 className="text-2xl font-bold">Schedule</h1>
        </header>

        <main className="items-start md:flex md:gap-4 lg:gap-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border p-6 sm:p-8 md:w-1/2 md:p-6 lg:p-8"
          />

          <section className="my-8 rounded-lg border p-6 sm:p-8 md:my-0 md:w-1/2 md:p-6 lg:p-8">
            <h2 className="text-xl font-semibold">
              <div>Schedule for </div>
              <div>{formattedDate}</div>
            </h2>

            <Tabs defaultValue="In-Office" className="pt-4">
              <TabsList className="">
                <TabsTrigger
                  value="In-Office"
                  onClick={() => setSelectedTab("In-Office")}
                >
                  In-Office
                </TabsTrigger>
                <TabsTrigger
                  value="Work-From-Home"
                  className="sm:hidden"
                  onClick={() => setSelectedTab("Work-From-Home")}
                >
                  WFH
                </TabsTrigger>
                <TabsTrigger
                  value="Work-From-Home"
                  className="hidden sm:block"
                  onClick={() => setSelectedTab("Work-From-Home")}
                >
                  Work-From-Home
                </TabsTrigger>
                <TabsTrigger
                  value="Leave"
                  onClick={() => setSelectedTab("Leave")}
                >
                  Leave
                </TabsTrigger>
              </TabsList>

              {/* In-Office Tab */}
              <TabsContent value="In-Office" className="flex flex-col gap-4">
                <TabContent
                  isArrangementsPending={isTeamArrangementsPending}
                  isArrangementsError={isTeamArrangementsError}
                  filteredArrangements={filteredArrangements}
                  currentPageArrangements={currentPageArrangements}
                />
              </TabsContent>

              {/* Work-From-Home Tab */}
              <TabsContent
                value="Work-From-Home"
                className="flex flex-col gap-4"
              >
                <TabContent
                  isArrangementsPending={isTeamArrangementsPending}
                  isArrangementsError={isTeamArrangementsError}
                  filteredArrangements={filteredArrangements}
                  currentPageArrangements={currentPageArrangements}
                />
              </TabsContent>

              {/* Leave Tab */}
              <TabsContent value="Leave" className="flex flex-col gap-4">
                <TabContent
                  isArrangementsPending={isTeamArrangementsPending}
                  isArrangementsError={isTeamArrangementsError}
                  filteredArrangements={filteredArrangements}
                  currentPageArrangements={currentPageArrangements}
                />
              </TabsContent>
            </Tabs>

            {filteredArrangements && totalPages > 0 && (
              <Pagination className="pt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={`cursor-pointer ${currentPage === 1 && "cursor-default opacity-60 hover:bg-transparent"}`}
                      onClick={() =>
                        // Decrease the current page by 1 but ensure it doesn't go below 1
                        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                      }
                    />
                  </PaginationItem>

                  {/* Render pagination items */}
                  {renderPaginationItems(
                    currentPage,
                    setCurrentPage,
                    totalPages,
                  )}

                  <PaginationItem>
                    <PaginationNext
                      className={`cursor-pointer ${currentPage === totalPages && "cursor-default opacity-60 hover:bg-transparent"}`}
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          // Increase the current page by 1
                          // but ensure it doesn't exceed the total number of pages
                          Math.min(prevPage + 1, totalPages),
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </section>
        </main>
      </div>
    </Suspense>
  );
}
