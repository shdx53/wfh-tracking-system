"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Component
import CustomPagination from "@/components/pagination/custom-pagination";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Function
import fetchPersonalArrangements from "@/app/lib/arrangements/fetch-personal-arrangements";
import { handleFilter } from "@/app/lib/arrangements/requests/handle-filter";
import { sortArrangementsByStartDate } from "@/app/lib/utils";
import TabContent from "@/components/arrangements/requests/tab-content";

// Context
import { ArrangementRequestPageProvider } from "@/app/context/arrangements/requests/arrangement-request-page-context";
import { useLogin } from "@/app/context/login/login-context";

export default function PersonalArrangementRequests() {
  const page = { page: "Personal" };
  return (
    <ArrangementRequestPageProvider page={page}>
      <PersonalArrangementRequestsContent />
    </ArrangementRequestPageProvider>
  );
}

function PersonalArrangementRequestsContent() {
  // Get staff ID
  const { staffID } = useLogin();

  const [selectedTab, setSelectedTab] = useState("Pending");
  let [arrangementRequests, setArrangementRequests] = useState([]);
  const [pendingArrangementRequestsCopy, setPendingArrangementRequestsCopy] =
    useState([]);
  const [
    processedArrangementRequestsCopy,
    setProcessedArrangementRequestsCopy,
  ] = useState([]);

  /* Query personal arrangement requests logic */
  const personalArrangementRequestsQuery = useQuery({
    queryKey: ["personal arrangement requests", { staffID }],
    queryFn: ({ queryKey }) => fetchPersonalArrangements(queryKey[1], null),
  });
  const personalArrangementRequests = personalArrangementRequestsQuery.data;
  const isPersonalArrangementRequestsPending =
    personalArrangementRequestsQuery.isPending;
  const isPersonalArrangementRequestsError =
    personalArrangementRequestsQuery.isError;

  // Filter requests into pending and processed categories
  useEffect(() => {
    if (
      personalArrangementRequests &&
      Array.isArray(personalArrangementRequests)
    ) {
      const pendingArrangementRequests = personalArrangementRequests.filter(
        (request) => {
          return request.Request_Status.includes("pending");
        },
      );
      setPendingArrangementRequestsCopy(pendingArrangementRequests);

      const processedArrangementRequests = personalArrangementRequests
        .flatMap((request) => {
          if (!request.Request_Status.includes("pending")) {
            // Recurring request
            if (request.Recurring_Interval) {
              const arrangementIDs = request.Arrangement_ID.split(",");
              const requestStatuses = request.Request_Status.split(",");
              const appliedDatetimes = request.Applied_Datetime.split(",");
              const startDates = request.Start_Date.split(",");
              const recurringIntervals = request.Recurring_Interval.split(",");
              const endDates = request.End_Date.split(",");
              const shiftTypes = request.Shift_Type.split(",");

              return arrangementIDs.map((id, index) => ({
                Arrangement_ID: id,
                Request_Status: requestStatuses[index],
                Applied_Datetime: appliedDatetimes[index],
                Start_Date: startDates[index],
                Recurring_Interval: recurringIntervals[index],
                End_Date: endDates[index],
                Apply_Reason: request.Apply_Reason,
                Update_Reason: request.Update_Reason,
                Shift_Type: shiftTypes[index],
              }));
            } else {
              return request;
            }
          }
        })
        .filter(Boolean)
        .map((request) =>
          Object.fromEntries(
            Object.entries(request).filter(([_, value]) => value !== undefined),
          ),
        );
      setProcessedArrangementRequestsCopy(processedArrangementRequests);
    }
  }, [personalArrangementRequests]);

  useEffect(() => {
    if (selectedTab === "Pending" && pendingArrangementRequestsCopy) {
      setArrangementRequests(pendingArrangementRequestsCopy);
    } else if (
      selectedTab === "Processed" &&
      processedArrangementRequestsCopy
    ) {
      setArrangementRequests(processedArrangementRequestsCopy);
    }
  }, [
    selectedTab,
    pendingArrangementRequestsCopy,
    processedArrangementRequestsCopy,
  ]);

  // Sort arrangement requests by Start_Date
  if (arrangementRequests.length > 0) {
    arrangementRequests = sortArrangementsByStartDate(arrangementRequests);
  }

  /* Filtering logic */
  const [startDateToFilter, setStartDateToFilter] = useState(null);

  /* Pagination logic */
  const arrangementRequestsPerPage = 10;
  const totalArrangementRequests =
    arrangementRequests && arrangementRequests.length;
  const totalPages = Math.ceil(
    totalArrangementRequests / arrangementRequestsPerPage,
  );

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * arrangementRequestsPerPage;
  const endIndex = startIndex + arrangementRequestsPerPage;
  const currentPageArrangementRequests = arrangementRequests.slice(
    startIndex,
    endIndex,
  );

  return (
    <div className="space-y-3">
      <h1 className="max-w-52 text-2xl font-bold sm:max-w-none">
        My arrangement requests
      </h1>
      <Tabs defaultValue="Pending">
        <TabsList className="">
          <TabsTrigger
            id="pending-tab-trigger"
            value="Pending"
            onClick={() => setSelectedTab("Pending")}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            id="processed-tab-trigger"
            value="Processed"
            onClick={() => setSelectedTab("Processed")}
          >
            Processed
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2 pt-4 sm:justify-end">
          <Input
            id="start-date-input"
            type="text"
            placeholder="Start date (YYYY-MM-DD)"
            className="w-3/4 max-w-52"
            onChange={(event) => setStartDateToFilter(event.target.value)}
          />
          <Search
            id="search-icn"
            strokeWidth={0.5}
            className="cursor-pointer"
            onClick={() =>
              handleFilter(
                selectedTab,
                null,
                startDateToFilter,
                setArrangementRequests,
                pendingArrangementRequestsCopy,
                processedArrangementRequestsCopy,
                setCurrentPage,
              )
            }
          />
        </div>

        <div className="mx-auto mb-4 mt-8 grid max-w-sm grid-cols-12 gap-2 rounded-md bg-secondary p-4 text-sm text-black/40 sm:max-w-none sm:gap-4 lg:grid-cols-11">
          <div className="col-span-3 sm:col-span-2">Type</div>
          <div className="hidden sm:col-span-2 sm:block">
            Recurring Frequency
          </div>
          <div className="col-span-4 sm:col-span-2">Start Date</div>
          <div className="hidden sm:col-span-2 sm:block">End Date</div>
          <div className="hidden sm:col-span-1 sm:block">Shift</div>
          <div className="col-span-4 sm:col-span-2 lg:col-span-1">Status</div>
        </div>

        {/* Pending tab */}
        <TabsContent value="Pending" className="space-y-4">
          <TabContent
            selectedTab={selectedTab}
            isArrangementRequestsPending={isPersonalArrangementRequestsPending}
            isArrangementRequestsError={isPersonalArrangementRequestsError}
            currentPageArrangementRequests={currentPageArrangementRequests}
          />
        </TabsContent>

        {/* Processed tab */}
        <TabsContent value="Processed" className="space-y-4">
          <TabContent
            selectedTab={selectedTab}
            isArrangementRequestsPending={isPersonalArrangementRequestsPending}
            isArrangementRequestsError={isPersonalArrangementRequestsError}
            currentPageArrangementRequests={currentPageArrangementRequests}
          />
        </TabsContent>
      </Tabs>

      <div className="pb-12">
        <CustomPagination
          data={arrangementRequests}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
