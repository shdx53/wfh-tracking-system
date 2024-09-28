"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
import { filterTeamArrangements } from "@/app/lib/schedules/filter-team-arrangements";
import { fetchTeamArrangements } from "@/app/lib/schedules/overall/fetch-team-arrangements";
import { fetchTeams } from "@/app/lib/schedules/overall/fetch-teams";
import { renderPaginationItems } from "@/app/lib/schedules/overall/render-pagination-items";
import { formatDate, normalizeDate } from "@/app/lib/utils";

export default function TeamSchedule() {
  // Initialize date to current date
  const [date, setDate] = useState(new Date());

  // Format date for display on the UI
  const formattedDate = formatDate(date);

  /* Query team arrangements logic */
  const dateObj = new Date(date);

  // Get day and pad with leading zero if needed
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Get month (0-indexed) and pad with leading zero
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");

  // Get last two digits of year
  const year = String(dateObj.getFullYear());

  // Formatted date
  const formattedSelectedDate = `${year}-${month}-${day}`;

  const [selectedTab, setSelectedTab] = useState("In-Office");
  const [filteredArrangements, setFilteredArrangements] = useState([]);

  // Fetch all team arrangements for the selected date
  const teamArrangementsQuery = useQuery({
    queryKey: ["team arrangements"],
    queryFn: () => fetchTeamArrangements("HR Team"), // Hardcoded. To be changed.
  });
  const teamArrangements = teamArrangementsQuery.data;

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
                filteredArrangements={filteredArrangements}
                currentPageArrangements={currentPageArrangements}
              />
            </TabsContent>

            {/* Work-From-Home Tab */}
            <TabsContent value="Work-From-Home" className="flex flex-col gap-4">
              <TabContent
                filteredArrangements={filteredArrangements}
                currentPageArrangements={currentPageArrangements}
              />
            </TabsContent>

            {/* Leave Tab */}
            <TabsContent value="Leave" className="flex flex-col gap-4">
              <TabContent
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
                {renderPaginationItems(currentPage, setCurrentPage, totalPages)}

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
  );
}
