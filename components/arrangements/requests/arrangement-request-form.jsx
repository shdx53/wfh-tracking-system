// Library
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Component
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import AdHocForm from "./ad-hoc-form";

// Function
import { fetchArrangements } from "@/app/lib/arrangements/fetch-arrangements";
import RecurringForm from "./recurring-form";

// Schema
import { arrangementRequestsSchema } from "@/app/schemas/arrangement/requests/arrangement-requests-schema";

// Action
import { manageArrangement } from "@/app/actions/arrangements/requests/manage-arrangement";

// Context
import { useArrangementRequest } from "@/app/context/arrangement-request-context";

export default function ArrangementRequestForm({}) {
  const {
    selectedTab,
    arrangementID,
    name,
    arrangementType,
    recurringInterval,
    shiftType,
    applyReason,
    updateReason,
  } = useArrangementRequest();
  const { toast } = useToast();

  // Fetch all recurring arrangement requests
  const recurringArrangementsQuery = useQuery({
    queryKey: ["recurring arrangement requests", arrangementID],
    queryFn: () => fetchArrangements(null, arrangementID, null, null),
    enabled: selectedTab === "Pending" && arrangementType === "Recurring",
  });
  const recurringArrangements = recurringArrangementsQuery.data;
  const isRecurringArrangementsPending = recurringArrangementsQuery.isPending;
  const isRecurringArrangementsError = recurringArrangementsQuery.isError;

  /* Form logic */
  const form = useForm({
    resolver: zodResolver(arrangementRequestsSchema),
    defaultValues: {},
  });

  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data) {
    setIsPending(true);
    const result = await manageArrangement(data);

    toast({
      description: result.message,
    });

    if (result.message === "Arrangement(s) updated successfully") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setIsPending(false);
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-10 ${isPending ? "block" : "hidden"}`}
      ></div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-sm"
        >
          <div className="grid grid-cols-2 gap-y-4">
            <div className="col-span-2 sm:col-span-1">
              <div className="text-black/40">Employee</div>
              <div className="mt-2 text-black">{name}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-black/40">Arrangement type</div>
              <div className="mt-2 text-black">{arrangementType}</div>
            </div>
            {arrangementType === "Recurring" && (
              <>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-black/40">Shift</div>
                  <div className="mt-2 text-black">{shiftType}</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-black/40">Recurring interval</div>
                  <div className="mt-2 text-black">{recurringInterval}</div>
                </div>
              </>
            )}
            <div className="col-span-2">
              <div className="text-black/40">Reason for applying</div>
              <div className="mt-2 text-black">
                {applyReason ? applyReason : "nil"}
              </div>
            </div>
            {selectedTab === "Processed" && (
              <div className="col-span-2">
                <div className="text-black/40">Reason for decision</div>
                <div className="mt-2 text-black">
                  {updateReason ? updateReason : "nil"}
                </div>
              </div>
            )}
          </div>

          {arrangementType === "Ad-hoc" && <AdHocForm form={form} />}

          {arrangementType === "Recurring" && (
            <RecurringForm
              form={form}
              recurringArrangements={recurringArrangements}
              isRecurringArrangementsPending={isRecurringArrangementsPending}
              isRecurringArrangementsError={isRecurringArrangementsError}
            />
          )}

          <Button className="w-full" type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
