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
import { ArrangementRequestPageProvider } from "@/app/context/arrangements/requests/arrangement-request-page-context";
import { fetchArrangements } from "@/app/lib/arrangements/fetch-arrangements";
import { handleFilter } from "@/app/lib/arrangements/requests/handle-filter";
import { sortArrangementsByStartDate } from "@/app/lib/utils";
import TabContent from "@/components/arrangements/requests/tab-content";

export default function ArrangementRequests() {
  const page = { page: "Managers and Directors" };
  return (
    <Suspense>
      <ArrangementRequestPageProvider page={page}>
        <ArrangementRequestsContent />
      </ArrangementRequestPageProvider>
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
  const pendingArrangementRequestsQuery = useQuery({
    queryKey: ["pending arrangement requests", { staffID }],
    queryFn: ({ queryKey }) =>
      fetchArrangements(null, null, "pending", queryKey[1].staffID),
    enabled: selectedTab === "Pending",
  });
  let pendingArrangementRequests = pendingArrangementRequestsQuery.data;
  const isPendingArrangementRequestsPending =
    pendingArrangementRequestsQuery.isPending;
  const isPendingArrangementRequestsError =
    pendingArrangementRequestsQuery.isError;

  // Fetch all processed arrangement requests
  const processedArrangementRequestsQuery = useQuery({
    queryKey: ["processed arrangement requests", { staffID }],
    queryFn: ({ queryKey }) =>
      fetchArrangements(null, null, "processed", queryKey[1].staffID),
    enabled: selectedTab === "Processed",
  });
  const processedArrangementRequests = processedArrangementRequestsQuery.data;
  const isProcessedArrangementRequestsPending =
    processedArrangementRequestsQuery.isPending;
  const isProcessedArrangementRequestsError =
    processedArrangementRequestsQuery.isError;

  useEffect(() => {
    if (
      selectedTab === "Pending" &&
      pendingArrangementRequests &&
      Array.isArray(pendingArrangementRequests)
    ) {
      setArrangementRequests(pendingArrangementRequests);
      setPendingArrangementRequestsCopy(pendingArrangementRequests);
    } else if (
      selectedTab === "Processed" &&
      processedArrangementRequests &&
      Array.isArray(processedArrangementRequests)
    ) {
      setArrangementRequests(processedArrangementRequests);
      setProcessedArrangementRequestsCopy(processedArrangementRequests);
    } else {
      setArrangementRequests(null);
    }
  }, [selectedTab, pendingArrangementRequests, processedArrangementRequests]);

  // Sort arrangement requests by Start_Date
  if (arrangementRequests && Array.isArray(arrangementRequests)) {
    arrangementRequests = sortArrangementsByStartDate(arrangementRequests);
  }

  /* Filtering logic */
  const [employeeToFilter, setEmployeeToFilter] = useState(null);
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

        <div className="flex items-center gap-2 pt-4 sm:justify-end">
          <Input
            type="text"
            placeholder="Employee"
            className="w-3/4 max-w-52"
            onChange={(event) => setEmployeeToFilter(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Start date (YYYY-MM-DD)"
            className="w-3/4 max-w-52"
            onChange={(event) => setStartDateToFilter(event.target.value)}
          />
          <Search
            strokeWidth={0.5}
            className="cursor-pointer"
            onClick={() =>
              handleFilter(
                selectedTab,
                employeeToFilter,
                startDateToFilter,
                setArrangementRequests,
                pendingArrangementRequestsCopy,
                processedArrangementRequestsCopy,
                setCurrentPage,
              )
            }
          />
        </div>

        <div className="mx-auto mb-4 mt-8 grid max-w-md grid-cols-11 gap-2 rounded-md bg-secondary p-4 text-sm text-black/40 sm:max-w-none sm:gap-4 lg:grid-cols-12 xl:grid-cols-8">
          <div className="col-span-3 sm:col-span-2 xl:col-span-1">Employee</div>
          <div className="col-span-3 sm:col-span-2 xl:col-span-1">Type</div>
          <div className="hidden lg:col-span-1 lg:block">
            Recurring Frequency
          </div>
          <div className="hidden sm:col-span-2 sm:block lg:col-span-2 xl:col-span-1">
            Start Date
          </div>
          <div className="hidden lg:col-span-2 lg:block xl:col-span-1">
            End Date
          </div>
          <div className="hidden sm:col-span-2 sm:block lg:col-span-1">
            Shift
          </div>
          <div className="col-span-3 sm:col-span-2 lg:col-span-1">Status</div>
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
