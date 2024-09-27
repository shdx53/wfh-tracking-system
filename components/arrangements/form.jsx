"use client";

// Library
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

// Schema
import { getSchema } from "@/app/schemas/arrangement/base-schema";

// Action
import { newArrangement } from "@/app/actions/newArrangement";

export default function ArrangementForm() {
  const [selectedArrangementType, setSelectedArrangementType] = useState(null);

  const form = useForm({
    // Dynamically get the schema based on the arrangement type
    resolver: zodResolver(getSchema(selectedArrangementType === "Recurring")),
    defaultValues: {
      arrangementType: null,
      startDate: null,
      endDate: null,
      shiftType: null,
      applyReason: "",
      recurringFrequency: null,
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data) {
    const staffID = 9999; // Hardcoded. To be changed.
    const updatedDate = {
      ...data,
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
                      recurringFrequency: null,
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
          <AdHocForm form={form} isPending={isPending} />
        )}
        {selectedArrangementType === "Recurring" && (
          <RecurringForm
            form={form}
            selectedArrangementType={selectedArrangementType}
            isPending={isPending}
          />
        )}
      </form>
    </Form>
  );
}
