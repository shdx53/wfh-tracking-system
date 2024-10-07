"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Component
import CustomPagination from "@/components/pagination/custom-pagination";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Function
import { fetchArrangements } from "@/app/lib/arrangements/fetch-arrangements";
import { sortArrangementsByStartDate } from "@/app/lib/utils";
import TabContent from "@/components/arrangements/requests/tab-content";

function handleFilter(
  selectedTab,
  employeeToFilter,
  setArrangementRequests,
  pendingArrangementRequestsCopy,
  processedArrangementRequestsCopy,
  setCurrentPage,
) {
  // Always reset to the first page
  // If users are not on the first page when they perform the filtering,
  // they may not see any request
  setCurrentPage(1);

  if (employeeToFilter) {
    const employee = employeeToFilter.toLowerCase();

    let arrangementRequestsCopy = [];

    if (
      selectedTab === "Pending" &&
      pendingArrangementRequestsCopy &&
      Array.isArray(pendingArrangementRequestsCopy)
    ) {
      arrangementRequestsCopy = pendingArrangementRequestsCopy;
    } else if (
      selectedTab === "Processed" &&
      processedArrangementRequestsCopy &&
      Array.isArray(processedArrangementRequestsCopy)
    ) {
      arrangementRequestsCopy = processedArrangementRequestsCopy;
    }

    const filteredRequests = arrangementRequestsCopy.filter((request) => {
      const fullName =
        `${request.Staff_FName} ${request.Staff_LName}`.toLowerCase();
      return fullName.includes(employee);
    });

    setArrangementRequests(filteredRequests);
  } else {
    // Return to original requests
    if (selectedTab === "Pending") {
      setArrangementRequests(pendingArrangementRequestsCopy);
    } else {
      setArrangementRequests(processedArrangementRequestsCopy);
    }
  }
}

export default function ArrangementRequests() {
  return (
    <Suspense>
      <ArrangementRequestsContent />
    </Suspense>
  );
}

function ArrangementRequestsContent() {
  // Get staff ID from query params
  const searchParams = useSearchParams();
  const staffID = searchParams.get("staffID");

  const [selectedTab, setSelectedTab] = useState("Pending");
  let [arrangementRequests, setArrangementRequests] = useState(null);
  const [pendingArrangementRequestsCopy, setPendingArrangementRequestsCopy] =
    useState(null);
  const [
    processedArrangementRequestsCopy,
    setProcessedArrangementRequestsCopy,
  ] = useState(null);

  /* Query arrangement requests logic */
  // Fetch all pending arrangement requests
  const pendingArrangementsQuery = useQuery({
    queryKey: ["pending arrangement requests", { staffID }],
    queryFn: ({ queryKey }) =>
      fetchArrangements(null, null, "pending", queryKey[1].staffID),
    enabled: selectedTab === "Pending",
  });
  let pendingArrangements = pendingArrangementsQuery.data;
  const isPendingArrangementRequestsPending =
    pendingArrangementsQuery.isPending;
  const isPendingArrangementRequestsError = pendingArrangementsQuery.isError;

  // Fetch all processed arrangement requests
  const processedArrangementsQuery = useQuery({
    queryKey: ["processed arrangement requests", { staffID }],
    queryFn: ({ queryKey }) =>
      fetchArrangements(null, null, "processed", queryKey[1].staffID),
    enabled: selectedTab === "Processed",
  });
  const processedArrangements = processedArrangementsQuery.data;
  const isProcessedArrangementRequestsPending =
    processedArrangementsQuery.isPending;
  const isProcessedArrangementRequestsError =
    processedArrangementsQuery.isError;

  useEffect(() => {
    if (
      selectedTab === "Pending" &&
      pendingArrangements &&
      Array.isArray(pendingArrangements)
    ) {
      setArrangementRequests(pendingArrangements);
      setPendingArrangementRequestsCopy(pendingArrangements);
    } else if (
      selectedTab === "Processed" &&
      processedArrangements &&
      Array.isArray(processedArrangements)
    ) {
      setArrangementRequests(processedArrangements);
      setProcessedArrangementRequestsCopy(processedArrangements);
    } else {
      setArrangementRequests(null);
    }
  }, [selectedTab, pendingArrangements, processedArrangements]);

  // Sort arrangement requests by Start_Date
  if (arrangementRequests && Array.isArray(arrangementRequests)) {
    arrangementRequests = sortArrangementsByStartDate(arrangementRequests);
  }

  /* Filtering logic */
  const [employeeToFilter, setEmployeeToFilter] = useState(null);

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
  const currentPageArrangementRequests =
    arrangementRequests && arrangementRequests.slice(startIndex, endIndex);

  return (
    <div className="space-y-3">
      <h1 className="max-w-min text-2xl font-bold sm:max-w-none">
        Arrangement Requests
      </h1>
      <Tabs defaultValue="Pending">
        <TabsList className="">
          <TabsTrigger
            value="Pending"
            onClick={() => setSelectedTab("Pending")}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="Processed"
            onClick={() => setSelectedTab("Processed")}
          >
            Processed
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-end gap-2 pt-4">
          <Input
            type="text"
            placeholder="Search employee"
            className="w-3/4 max-w-56"
            onChange={(event) => setEmployeeToFilter(event.target.value)}
          />
          <Search
            strokeWidth={0.5}
            className="cursor-pointer"
            onClick={() =>
              handleFilter(
                selectedTab,
                employeeToFilter,
                setArrangementRequests,
                pendingArrangementRequestsCopy,
                processedArrangementRequestsCopy,
                setCurrentPage,
              )
            }
          />
        </div>

        <div className="mx-auto mb-4 mt-8 grid max-w-md grid-cols-12 gap-2 rounded-md bg-secondary p-4 text-sm text-black/40 sm:max-w-none sm:gap-3 lg:gap-2 xl:gap-4 xl:px-8">
          <div className="col-span-5 sm:col-span-3 lg:col-span-2">Employee</div>
          <div className="col-span-3 sm:col-span-2">Type</div>
          <div className="hidden lg:col-span-1 lg:block 2xl:col-span-2">
            Recurring Frequency
          </div>
          <div className="hidden sm:col-span-2 sm:block 2xl:col-span-1">
            Start Date
          </div>
          <div className="hidden lg:col-span-2 lg:block 2xl:col-span-1">
            End Date
          </div>
          <div className="hidden sm:col-span-2 sm:block lg:col-span-1">
            Shift Type
          </div>
          <div className="col-span-3 sm:col-span-2 lg:col-span-1 2xl:col-span-2">
            Status
          </div>
        </div>

        {/* Pending tab */}
        <TabsContent value="Pending" className="space-y-4">
          <TabContent
            selectedTab={selectedTab}
            isArrangementRequestsPending={isPendingArrangementRequestsPending}
            isArrangementRequestsError={isPendingArrangementRequestsError}
            currentPageArrangementRequests={currentPageArrangementRequests}
          />
        </TabsContent>

        {/* Processed tab */}
        <TabsContent value="Processed" className="space-y-4">
          <TabContent
            selectedTab={selectedTab}
            isArrangementRequestsPending={isProcessedArrangementRequestsPending}
            isArrangementRequestsError={isProcessedArrangementRequestsError}
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
