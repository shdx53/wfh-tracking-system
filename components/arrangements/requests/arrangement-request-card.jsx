// Library
import { useEffect, useState } from "react";

// Component
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowUpRight } from "lucide-react";
import ArrangementRequestForm from "./arrangement-request-form";

// Library
import { formatDateToISO } from "@/app/lib/utils";
import { ArrangementRequestProvider } from "@/app/context/arrangement-request-context";
import { useArrangementRequestPage } from "@/app/context/arrangement-request-page-context";

const requestStatusStyles = {
  Approved: "bg-green-950 text-green-600",
  Pending: "bg-amber-950 text-amber-600",
  Rejected: "bg-red-950 text-red-600",
  Withdrawn: "bg-blue-950 text-blue-400",
};

// Define table styles for
// Managers and Directors Arrangement Requests page and
// Personal Arrangement Requests page
const managersAndDirectorsTableStyles = {
  grid: "mx-auto grid max-w-md grid-cols-11 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:gap-4 lg:grid-cols-12 xl:grid-cols-8",
  arrangementType: "col-span-3 sm:col-span-2 xl:col-span-1",
  recurringInterval: "hidden lg:col-span-1 lg:block",
  startDate: "hidden sm:col-span-2 sm:block lg:col-span-2 xl:col-span-1",
  endDate: "hidden lg:col-span-2 lg:block xl:col-span-1",
  shiftType: "hidden sm:col-span-2 sm:block lg:col-span-1",
  requestStatus:
    "col-span-3 flex items-center justify-center rounded-md py-2 text-xs sm:col-span-2 sm:text-sm lg:col-span-1",
};

const personalTableStypes = {
  grid: "mx-auto grid max-w-sm grid-cols-12 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:gap-4 lg:grid-cols-11",
  arrangementType: "col-span-3 sm:col-span-2",
  recurringInterval: "hidden sm:col-span-2 sm:block",
  startDate: "col-span-4 sm:col-span-2",
  endDate: "hidden sm:col-span-2 sm:block",
  shiftType: "hidden sm:col-span-1 sm:block",
  requestStatus:
    "col-span-4 flex items-center justify-center rounded-md py-2 text-xs sm:col-span-2 sm:text-sm lg:col-span-1",
};

export default function ArrangementRequestCard({ selectedTab, arrangement }) {
  // Determine page
  const { page } = useArrangementRequestPage();

  // Determine table styles
  const tableStyles =
    page === "Managers and Directors"
      ? managersAndDirectorsTableStyles
      : personalTableStypes;

  /* Display logic */
  const firstName = arrangement.Staff_FName;
  const lastName = arrangement.Staff_LName;
  const name = `${firstName} ${lastName}`;

  let recurringInterval = arrangement.Recurring_Interval;
  const arrangementType = recurringInterval === null ? "Ad-hoc" : "Recurring";

  let arrangementID = arrangement.Arrangement_ID;
  let startDate = arrangement.Start_Date;

  // Only required if selectedTab is Pending and arrangementType is Recurring
  let endDate;
  if (selectedTab === "Pending" && arrangementType === "Recurring") {
    endDate = arrangement.End_Date;
  }

  let shiftType = arrangement.Shift_Type;
  let applyReason = arrangement.Apply_Reason;
  let updateReason = arrangement.Update_Reason;
  let requestStatus = arrangement.Request_Status;

  if (startDate.includes(",")) {
    const recurringIntervalArr =
      Array.isArray(recurringInterval) && recurringInterval.split(",");
    recurringInterval = recurringIntervalArr[0];

    const startDateArr = startDate.split(",");

    // Find the earliest Start_Date
    startDate = startDateArr.reduce((earliest, current) => {
      return new Date(current) < new Date(earliest) ? current : earliest;
    });

    // Only required if selectedTab is Pending and arrangementType is Recurring
    if (selectedTab === "Pending" && arrangementType === "Recurring") {
      const endDateArr = endDate.split(",");

      // Find the latest End_Date
      endDate = endDateArr.reduce((earliest, current) => {
        return new Date(current) > new Date(earliest) ? current : earliest;
      });
    }

    // Find the index of the earliest Start_Date in startDateArr
    const earliestStartDateIndex = startDateArr.indexOf(startDate);

    const arrangementIDArr = arrangementID.split(",");
    arrangementID = arrangementIDArr[earliestStartDateIndex];

    const shiftTypeArr = shiftType.split(",");
    shiftType = shiftTypeArr[0];

    if (applyReason !== null) {
      const applyReasonArr = applyReason.split(",");
      applyReason = applyReasonArr[0];
    }

    if (updateReason !== null) {
      const updateReasonArr = updateReason.split(",");
      updateReason = updateReasonArr[0];
    }

    const requestStatusArr = requestStatus.split(",");
    requestStatus = requestStatusArr[0];
  }

  // Format date as YYYY-MM-DD
  startDate = formatDateToISO(startDate);
  // Only required if selectedTab is Pending and arrangementType is Recurring
  if (selectedTab === "Pending" && arrangementType === "Recurring") {
    endDate = formatDateToISO(endDate);
  }

  // Capitalize first letter
  if (recurringInterval) {
    recurringInterval =
      recurringInterval.charAt(0).toUpperCase() + recurringInterval.slice(1);
  }
  requestStatus =
    requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1);

  /* Context logic */
  const arrangementProps = {
    selectedTab,
    arrangementID,
    name,
    arrangementType,
    recurringInterval,
    startDate,
    shiftType,
    applyReason,
    updateReason,
    requestStatus,
  };
  /* <SheetTrigger> disabled state logic */
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (selectedTab === "Pending") {
      setIsDisabled(false);
    } else if (selectedTab === "Processed") {
      const currentDate = new Date();
      const startDateObj = new Date(startDate);

      // Check if startDate is less than currentDate or within 24 hours
      const isStartDateInvalid =
        startDateObj < currentDate ||
        startDateObj - currentDate <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      setIsDisabled(isStartDateInvalid);
    }
  }, [startDate]);

  console.log();

  return (
    <div className={`${tableStyles.grid}`}>
      {page === "Managers and Directors" && (
        <div className="col-span-3 sm:col-span-2 xl:col-span-1">{name}</div>
      )}
      <div className={`${tableStyles.arrangementType}`}>{arrangementType}</div>
      <div className={`${tableStyles.recurringInterval}`}>
        {recurringInterval ? recurringInterval : "N/A"}
      </div>
      <div className={`${tableStyles.startDate}`}>{startDate}</div>
      <div className={`${tableStyles.endDate}`}>
        {endDate ? endDate : startDate}
      </div>
      <div className={`${tableStyles.shiftType}`}>{shiftType}</div>
      <div
        className={`${tableStyles.requestStatus} ${requestStatusStyles[requestStatus]}`}
      >
        {requestStatus}
      </div>
      <div className="col-span-1 flex justify-center">
        <Sheet>
          <SheetTrigger
            className={`${(isDisabled || (page === "Personal" && selectedTab === "Processed")) && "hidden"}`}
          >
            <ArrowUpRight strokeWidth={1} />
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader className="gap-2 pt-4 text-left">
              <SheetTitle>Request Details</SheetTitle>
              {/* Did not comment to hide warning */}
              <SheetDescription></SheetDescription>
              {/* Couldn't go under SheetDescription component because */}
              {/* <form> cannot be a descentdant of <p> */}
              <ArrangementRequestProvider arrangementProps={arrangementProps}>
                <ArrangementRequestForm />
              </ArrangementRequestProvider>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
