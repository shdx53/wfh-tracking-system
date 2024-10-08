// Library
import { useEffect, useRef } from "react";

// Component
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Function
import { formatDateToISO } from "@/app/lib/utils";

// Context
import { useArrangementRequest } from "@/app/context/arrangement-request-context";
import { useArrangementRequestPage } from "@/app/context/arrangement-request-page-context";

export default function RecurringForm({
  form,
  recurringArrangements,
  isRecurringArrangementsPending,
  isRecurringArrangementsError,
}) {
  // Determine page
  const { page } = useArrangementRequestPage();

  const { selectedTab, arrangementID, startDate, requestStatus } =
    useArrangementRequest();

  const focusRef = useRef(null);

  useEffect(() => {
    // Focus on this div to prevent auto-focus on the Select field
    focusRef.current?.focus();
  }, []);

  return (
    <>
      {selectedTab === "Pending" && (
        <>
          {isRecurringArrangementsPending && (
            <div className="text-center text-sm">
              Loading arrangement requests...
            </div>
          )}

          {isRecurringArrangementsError && (
            <div className="text-center text-sm">
              Oops! Something went wrong while fetching the arrangement
              requests. Please try again later.
            </div>
          )}

          {recurringArrangements &&
            Array.isArray(recurringArrangements) &&
            recurringArrangements.map((arrangement) => {
              const arrangementID = arrangement.Arrangement_ID;
              const startDate = formatDateToISO(arrangement.Start_Date);

              return (
                <div key={arrangementID} className="grid grid-cols-2 gap-y-4">
                  <div ref={focusRef} tabIndex={-1} className="col-span-1">
                    <div>Start date</div>
                    <div className="mt-2 text-black">{startDate}</div>
                  </div>

                  {/* Action field */}
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name={`${arrangementID}Action`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-normal text-black/40">
                            Action
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue=""
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an action" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {page === "Managers and Directors" ? (
                                <>
                                  <SelectItem value="Approve">
                                    Approve
                                  </SelectItem>
                                  <SelectItem value="Reject">Reject</SelectItem>
                                </>
                              ) : (
                                <SelectItem value="Cancel">Cancel</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Reason field */}
                  {page === "Managers and Directors" && (
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`${arrangementID}Reason`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-normal">
                              Reason for decision
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Type your reason here."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </>
      )}

      {selectedTab === "Processed" && (
        <div className="grid grid-cols-2 gap-y-4">
          <div ref={focusRef} tabIndex={-1} className="col-span-1">
            <div className="text-black/40">Start date</div>
            <div className="mt-2 text-black">{startDate}</div>
          </div>

          {/* Action field */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name={`${arrangementID}Action`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-black/40">
                    Action
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="Approve"
                        disabled={requestStatus === "Approved"}
                      >
                        Approve
                      </SelectItem>
                      <SelectItem
                        value="Reject"
                        disabled={requestStatus === "Rejected"}
                      >
                        Reject
                      </SelectItem>
                      <SelectItem
                        value="Withdraw entire arrangement"
                        disabled={requestStatus === "Withdrawn"}
                      >
                        Withdraw entire arrangement
                      </SelectItem>
                      <SelectItem
                        value="Withdraw this specific arrangement only"
                        disabled={requestStatus === "Withdrawn"}
                      >
                        Withdraw this specific arrangement only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Reason field */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name={`${arrangementID}Reason`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Reason for decision
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your reason here."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </>
  );
}
