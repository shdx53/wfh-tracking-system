"use client";

// Library
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import AdHocForm from "./ad-hoc-form";
import RecurringForm from "./recurring-form";

// Function
import fetchPersonalArrangements from "@/app/lib/arrangements/fetch-personal-arrangements";
import { formatDateToISO } from "@/app/lib/utils";

// Schema
import { getSchema } from "@/app/schemas/arrangement/new/new-arrangement-schema";

// Action
import { newArrangement } from "@/app/actions/arrangements/new/new-arrangement";

export default function ArrangementForm() {
  // Get staff ID from query params (TO BE REMOVED)
  const searchParams = useSearchParams();
  const staffID = searchParams.get("staffID");

  const router = useRouter();
  const { toast } = useToast();

  const [selectedArrangementType, setSelectedArrangementType] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  /* Disable Start_Date select option(s) logic */
  // Format selected date for querying
  const formattedSelectedDate = formatDateToISO(selectedStartDate);

  // Fetch approved arrangements for the selected date
  const approvedArrangementsQuery = useQuery({
    queryKey: [
      "approved arrangements",
      { staffID: staffID, startDate: formattedSelectedDate },
    ],
    queryFn: ({ queryKey }) =>
      fetchPersonalArrangements(queryKey[1], "approved"),
    // Only run the query if selectedStartDate is not null
    enabled: !!selectedStartDate,
  });
  const approvedArrangements = approvedArrangementsQuery.data;

  // Fetch pending arrangements for the selected date
  const pendingArrangementsQuery = useQuery({
    queryKey: [
      "pending arrangements",
      { staffID: staffID, startDate: formattedSelectedDate },
    ],
    queryFn: ({ queryKey }) =>
      fetchPersonalArrangements(queryKey[1], "pending"),
    // Only run the query if selectedStartDate is not null
    enabled: !!selectedStartDate,
  });
  const pendingArrangements = pendingArrangementsQuery.data;

  // Combine approvedArrangements and pendingArrangements if neither is undefined and is an array
  const arrangements = approvedArrangements &&
    Array.isArray(approvedArrangements) &&
    pendingArrangements &&
    Array.isArray(pendingArrangements) && [
      ...approvedArrangements,
      ...pendingArrangements,
    ];

  const selectedDateShiftTypes =
    arrangements && arrangements.map((arrangement) => arrangement.Shift_Type);

  /* Form logic */
  const form = useForm({
    // Dynamically get the schema based on the arrangement type
    resolver: zodResolver(getSchema(selectedArrangementType === "Recurring")),
    defaultValues: {
      arrangementType: null,
      startDate: null,
      endDate: null,
      shiftType: null,
      applyReason: "",
      recurringInterval: null,
    },
  });

  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data) {
    // Convert startDate and endDate to UTC using Date.UTC
    const startDateUTC = data.startDate
      ? new Date(
          Date.UTC(
            data.startDate.getFullYear(),
            data.startDate.getMonth(),
            data.startDate.getDate(),
          ),
        )
      : null;
    const endDateUTC = data.endDate
      ? new Date(
          Date.UTC(
            data.endDate.getFullYear(),
            data.endDate.getMonth(),
            data.endDate.getDate(),
          ),
        )
      : null;
    const updatedDate = {
      ...data,
      startDate: startDateUTC,
      endDate: endDateUTC,
      staffID,
    };

    setIsPending(true);
    const result = await newArrangement(updatedDate);
    setIsPending(false);

    toast({
      description: result.message,
    });

    if (result.message === "Arrangement(s) added successfully") {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Arrangement type field */}
        <FormField
          control={form.control}
          name="arrangementType"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Please select an arrangement type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedArrangementType(value);

                    // Get the current values from the form
                    const currentValues = form.getValues();

                    // Reset dates to keep only the first one
                    form.reset({
                      ...currentValues, // Retain other field values
                      endDate: null,
                      recurringInterval: null,
                    });
                  }}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Ad-hoc" />
                    </FormControl>
                    <FormLabel className="font-normal">Ad-hoc</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Recurring" />
                    </FormControl>
                    <FormLabel className="font-normal">Recurring</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedArrangementType === "Ad-hoc" && (
          <AdHocForm
            form={form}
            isPending={isPending}
            selectedStartDate={selectedStartDate}
            setSelectedStartDate={setSelectedStartDate}
            selectedDateShiftTypes={selectedDateShiftTypes}
          />
        )}
        {selectedArrangementType === "Recurring" && (
          <RecurringForm
            form={form}
            selectedArrangementType={selectedArrangementType}
            isPending={isPending}
            selectedStartDate={selectedStartDate}
            setSelectedStartDate={setSelectedStartDate}
            selectedDateShiftTypes={selectedDateShiftTypes}
          />
        )}
      </form>
    </Form>
  );
}
