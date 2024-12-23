"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Component
import CustomPagination from "@/components/pagination/custom-pagination";
import TabContent from "@/components/schedules/overall/tab-content";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Function
import { fetchArrangements } from "@/app/lib/arrangements/fetch-arrangements";
import { fetchTeamArrangements } from "@/app/lib/arrangements/fetch-team-arrangements";
import { filterTeamArrangements } from "@/app/lib/schedules/filter-team-arrangements";
import { fetchTeams } from "@/app/lib/schedules/overall/fetch-teams";
import { filterArrangements } from "@/app/lib/schedules/overall/filter-arrangements";
import {
  formatDateToISO,
  formatDateToShortString,
  normalizeDate,
} from "@/app/lib/utils";

export default function OverallSchedule() {
  // Initialize date to current date
  const [date, setDate] = useState(new Date());
  const normalizedDate = normalizeDate(date);

  // Format date for display on the UI
  const formattedDate = formatDateToShortString(date);

  /* Query teams logic */
  const teamsQuery = useQuery({
    queryKey: ["teams"],
    queryFn: () => fetchTeams(),
  });
  const teams = teamsQuery.data;
  const isTeamsPending = teamsQuery.isPending;
  const isTeamsError = teamsQuery.isError;

  /* Query arrangements logic */
  // Format date for querying
  const formattedSelectedDate = formatDateToISO(date);

  const [selectedTab, setSelectedTab] = useState("In-Office");
  const [filteredArrangements, setFilteredArrangements] = useState([]);

  // Fetch all arrangements for the selected date
  const arrangementsQuery = useQuery({
    queryKey: [
      "arrangements",
      { formattedSelectedDate: formattedSelectedDate },
    ],
    queryFn: ({ queryKey }) =>
      fetchArrangements(queryKey[1].formattedSelectedDate, null, null, null),
  });
  const arrangements = arrangementsQuery.data;
  const isArrangementsPending = arrangementsQuery.isPending;
  const isArrangementsError = arrangementsQuery.isError;

  useEffect(() => {
    if (arrangements && Array.isArray(arrangements) && selectedTeam === null) {
      filterArrangements(
        selectedTab,
        arrangements,
        normalizedDate,
        setFilteredArrangements,
      );
    }
  }, [selectedTab, arrangements]);

  /* Query team arrangements logic */
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Fetch all arrangements for the selected team
  const teamArrangementsQuery = useQuery({
    queryKey: ["team arrangements", { selectedTeam }],
    queryFn: () =>
      selectedTeam ? fetchTeamArrangements(selectedTeam, null, null) : null,
    // Only run the query if selectedTeam is not null
    enabled: !!selectedTeam,
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
        <h1 className="max-w-52 text-2xl font-bold sm:max-w-none">
          Overall and team schedule
        </h1>
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

            {/* In-Office tab */}
            <TabsContent value="In-Office" className="flex flex-col gap-4">
              <TabContent
                isArrangementsPending={isArrangementsPending}
                isArrangementsError={isArrangementsError}
                filteredArrangements={filteredArrangements}
                currentPageArrangements={currentPageArrangements}
              />
            </TabsContent>

            {/* Work-From-Home tab */}
            <TabsContent value="Work-From-Home" className="flex flex-col gap-4">
              <TabContent
                isArrangementsPending={isArrangementsPending}
                isArrangementsError={isArrangementsError}
                filteredArrangements={filteredArrangements}
                currentPageArrangements={currentPageArrangements}
              />
            </TabsContent>

            {/* Leave tab */}
            <TabsContent value="Leave" className="flex flex-col gap-4">
              <TabContent
                isArrangementsPending={isArrangementsPending}
                isArrangementsError={isArrangementsError}
                filteredArrangements={filteredArrangements}
                currentPageArrangements={currentPageArrangements}
              />
            </TabsContent>
          </Tabs>

          <CustomPagination
            data={filteredArrangements}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </main>
    </div>
  );
}
