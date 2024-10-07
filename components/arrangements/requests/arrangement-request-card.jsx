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

const classStyles = {
  Approved: "bg-green-950 text-green-600",
  Pending: "bg-amber-950 text-amber-600",
  Rejected: "bg-red-950 text-red-600",
  Withdrawn: "bg-blue-950 text-blue-400",
};

export default function ArrangementRequestCard({ selectedTab, arrangement }) {
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
    const recurringIntervalArr = recurringInterval.split(",");
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

  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center gap-2 rounded-md border p-4 text-sm sm:max-w-none sm:gap-3 lg:gap-2 xl:gap-4 xl:px-8">
      <div className="col-span-5 sm:col-span-3 lg:col-span-2">{name}</div>
      <div className="col-span-3 sm:col-span-2">{arrangementType}</div>
      <div className="hidden lg:col-span-1 lg:block 2xl:col-span-2">
        {recurringInterval ? recurringInterval : "N/A"}
      </div>
      <div className="hidden sm:col-span-2 sm:block lg:col-span-2 2xl:col-span-1">
        {startDate}
      </div>
      <div className="hidden lg:col-span-2 lg:block 2xl:col-span-1">
        {endDate ? endDate : startDate}
      </div>
      <div className="hidden sm:col-span-2 sm:block lg:col-span-1">
        {shiftType}
      </div>
      <div
        className={`col-span-3 flex max-w-20 items-center justify-center rounded-md py-2 text-xs sm:col-span-2 sm:max-w-24 sm:text-sm lg:col-span-1 2xl:col-span-2 ${classStyles[requestStatus]}`}
      >
        {requestStatus}
      </div>
      <div className="col-span-1 flex justify-center">
        <Sheet>
          <SheetTrigger
            disabled={isDisabled}
            className={`${isDisabled && "opacity-40"}`}
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
