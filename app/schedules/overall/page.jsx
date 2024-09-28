"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Component
import { Calendar } from "@/components/ui/calendar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Function
import { fetchTeams } from "@/app/lib/schedules/overall/fetch-teams";
import { fetchTeamArrangements } from "@/app/lib/schedules/overall/fetch-team-arrangements";
import { fetchArrangements } from "@/app/lib/schedules/overall/fetch-arrangements";
import { renderPaginationItems } from "@/app/lib/schedules/overall/render-pagination-items";
import { renderTabContent } from "@/app/lib/schedules/overall/render-tab-content";
import { formatDate } from "@/app/lib/utils";
import { toUTCDate } from "@/app/lib/utils";

export default function OverallSchedule() {
  // Initialize date to current date
  const [date, setDate] = useState(new Date().toString());

  // Format date for display on the UI
  const formattedDate = formatDate(date);

  /* Query teams logic */
  const teamsQuery = useQuery({
    queryKey: ["teams"],
    queryFn: () => fetchTeams(),
  });
  const teams = teamsQuery.data;
  const isTeamsPending = teamsQuery.isPending;
  const isTeamsError = teamsQuery.isError;

  /* Query arrangements logic */
  /* Format date for querying */
  const dateObj = new Date(date);
  const dateObjUTC = toUTCDate(dateObj);

  // Get day and pad with leading zero if needed
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Get month (0-indexed) and pad with leading zero
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");

  // Get last two digits of year
  const year = String(dateObj.getFullYear());

  // Formatted date
  const formattedQueryDate = `${year}-${month}-${day}`;

  const [selectedTab, setSelectedTab] = useState("In-Office");
  const [filteredArrangements, setFilteredArrangements] = useState([]);

  // Fetch all arrangements for the selected date
  const arrangementsQuery = useQuery({
    queryKey: ["arrangements", { formattedQueryDate: formattedQueryDate }],
    queryFn: ({ queryKey }) =>
      fetchArrangements(queryKey[1].formattedQueryDate),
  });
  const arrangements = arrangementsQuery.data;
  const isArrangementsPending = arrangementsQuery.isPending;
  const isArrangementsError = arrangementsQuery.isError;

  useEffect(() => {
    if (arrangements && Array.isArray(arrangements) && selectedTeam === null) {
      if (selectedTab === "In-Office") {
        const filtered = [];

        arrangements.forEach((arrangement) => {
          const startDate = arrangement.Start_Date;

          if (startDate) {
            const startDateObjUTC = toUTCDate(startDate);

            if (startDateObjUTC.getTime() === dateObjUTC.getTime()) {
              const staffID = arrangement.Staff_ID;

              // Find all records with the same Staff_ID and matching Start_Date
              const matches = arrangements.filter((arr) => {
                const matchDateObjUTC = toUTCDate(arr.Start_Date);
                return (
                  arr.Staff_ID === staffID &&
                  matchDateObjUTC.getTime() === startDateObjUTC.getTime()
                );
              });

              if (matches.length === 1) {
                const matchShiftType = matches[0].Shift_Type;

                // If there is only one matching arrangement and the Shift_Type is not Full Day,
                // there are only two options: AM and PM
                // Add the opposite Shift_Type to the array
                if (matchShiftType !== "Full Day") {
                  filtered.push({
                    ...arrangement,
                    Shift_Type: matchShiftType === "AM" ? "PM" : "AM",
                  });
                }
              }
            } else {
              // Check if the time values of startDateObj and dateObj are not equal
              filtered.push(arrangement);
            }
          } else {
            // Start_Date is null
            filtered.push(arrangement);
          }
        });
        setFilteredArrangements(filtered);
      } else if (selectedTab === "Work-From-Home") {
        console.log("Arrangements: ", arrangements);
        console.log("dateObjUTC: ", dateObjUTC);
        const filtered = arrangements.filter((arrangement) => {
          const startDate = arrangement.Start_Date;

          if (startDate) {
            const startDateObjUTC = toUTCDate(startDate);

            console.log(startDateObjUTC);

            // Return true if the arrangement date matches the selected date
            if (startDateObjUTC.getTime() === dateObjUTC.getTime()) {
              return true;
            }
          }
        });
        console.log("Filtered: ", filtered);
        setFilteredArrangements(filtered);
      } else {
        const filtered = [];
        setFilteredArrangements(filtered);
      }
    }
  }, [selectedTab, arrangements]);

  /* Query team arrangements logic */
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Use useQuery outside of the condition
  const teamArrangementsQuery = useQuery({
    queryKey: ["team arrangements", { selectedTeam }],
    queryFn: () => (selectedTeam ? fetchTeamArrangements(selectedTeam) : null),
    // Only run the query if selectedTeam is not null
    enabled: !!selectedTeam,
  });
  const teamArrangements = teamArrangementsQuery.data;

  useEffect(() => {
    if (teamArrangements && Array.isArray(teamArrangements)) {
      // console.log(teamArrangements);
      if (selectedTab === "In-Office") {
        const filtered = [];

        teamArrangements.forEach((arrangement) => {
          const startDates = arrangement.Start_Date;
          const shiftTypes = arrangement.Shift_Type;

          if (startDates) {
            const startDateArr = startDates.split(",");
            const shiftTypeArr = shiftTypes.split(",");

            if (startDateArr.includes(formattedQueryDate)) {
              const matchingStartDates = [];

              for (let i = 0; i < startDateArr.length; i++) {
                const startDate = startDateArr[i];
                // Skip checking if the Start_Date has already been checked
                if (
                  startDate === formattedQueryDate &&
                  !matchingStartDates.includes(startDate)
                ) {
                  // Find all indexes with the same Start_Date
                  const matchingIndexes = [];
                  startDateArr.forEach((date, index) => {
                    if (date === startDate) {
                      matchingIndexes.push(index);
                      matchingStartDates.push(date);
                    }
                  });

                  if (matchingIndexes.length === 1) {
                    const matchStartDate = startDateArr[matchingIndexes[0]];
                    const matchShiftType = shiftTypeArr[matchingIndexes[0]];

                    // If there is only one matching arrangement and the Shift_Type is not Full Day,
                    // there are only two options: AM and PM
                    // Add the opposite Shift_Type to the array
                    if (matchShiftType !== "Full Day") {
                      filtered.push({
                        ...arrangement,
                        Start_Date: matchStartDate,
                        Shift_Type: matchShiftType === "AM" ? "PM" : "AM",
                      });
                    }
                  }
                }
              }
            } else {
              // No Start_Date matches the selected date
              filtered.push({
                ...arrangement,
                Start_Date: formattedQueryDate,
                Shift_Type: null,
              });
            }
          } else {
            // Start_Date is null
            filtered.push(arrangement);
          }
        });
        setFilteredArrangements(filtered);
      } else if (selectedTab === "Work-From-Home") {
        const filtered = [];

        teamArrangements.forEach((arrangement) => {
          const startDates = arrangement.Start_Date;
          const shiftTypes = arrangement.Shift_Type;

          if (startDates) {
            const startDateArr = startDates.split(",");
            const shiftTypeArr = shiftTypes.split(",");

            for (let i = 0; i < startDateArr.length; i++) {
              const startDate = startDateArr[i];
              const shiftType = shiftTypeArr[i];

              if (startDate === formattedQueryDate) {
                filtered.push({
                  ...arrangement,
                  Start_Date: startDate,
                  Shift_Type: shiftType,
                });
              }
            }
          }
        });
        setFilteredArrangements(filtered);
      } else {
        const filtered = [];
        setFilteredArrangements(filtered);
      }
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
        <div className="flex gap-4">
          <Select onValueChange={(value) => setSelectedTeam(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              {isTeamsPending && (
                <SelectItem value="Loading teams...">
                  Loading teams...
                </SelectItem>
              )}

              {isTeamsError && (
                <SelectItem value="Error fetching teams">
                  Error fetching teams
                </SelectItem>
              )}

              {!isTeamsPending &&
                !isTeamsError &&
                teams.map((team, index) => {
                  const name = team.Position;
                  return (
                    <SelectItem key={index} value={`${name}`}>
                      {name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
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
              {renderTabContent(
                isArrangementsPending,
                isArrangementsError,
                filteredArrangements,
                currentPageArrangements,
              )}
            </TabsContent>

            {/* Work-From-Home Tab */}
            <TabsContent value="Work-From-Home" className="flex flex-col gap-4">
              {renderTabContent(
                isArrangementsPending,
                isArrangementsError,
                filteredArrangements,
                currentPageArrangements,
              )}
            </TabsContent>

            {/* Leave Tab */}
            <TabsContent value="Leave" className="flex flex-col gap-4">
              {renderTabContent(
                isArrangementsPending,
                isArrangementsError,
                filteredArrangements,
                currentPageArrangements,
              )}
            </TabsContent>
          </Tabs>

          {totalPages > 0 && (
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
