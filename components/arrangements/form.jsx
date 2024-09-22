"use client";

// Library
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// Component
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

// Schema
import { getSchema } from "@/schema/arrangement/base-schema";

// Function
import DateField from "./date-field";

export default function ArrangementForm() {
  const [selectedArrangementType, setSelectedArrangementType] = useState(undefined);


  const form = useForm({
    // Dynamically get the schema based on the arrangement type
    resolver: zodResolver(
      getSchema(selectedArrangementType === "Recurring"),
    ),
    defaultValues: {
      "arrangement-type": undefined,
      dates: [{ date: undefined, shiftType: undefined }],
      "recurring-frequency": undefined,
      "apply-reason": undefined,
    },
  });

  // Set up a field array for managing dynamic date fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dates",
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Arrangement type field */}
        <FormField
          control={form.control}
          name="arrangement-type"
          render={({ field }) => (
            <FormItem className="space-y-3">
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
                      dates:
                        currentValues.dates.length > 0
                          ? [currentValues.dates[0]]
                          : [], // Keep the first date if it exists
                      "recurring-frequency": undefined,
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

        {selectedArrangementType && (
          <>
            {/* Date field */}
            {fields.map((field, index) => (
              <DateField
                key={index}
                index={index}
                form={form}
                field={field}
                fieldsLength={fields.length}
                appendField={append}
                removeField={remove}
                selectedArrangementType={selectedArrangementType}
              />
            ))}

            {/* Recurring frequency field */}
            {selectedArrangementType === "Recurring" && (
              <FormField
                control={form.control}
                name="recurring-frequency"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Recurring Frequency</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Weekly" />
                          </FormControl>
                          <FormLabel className="font-normal">Weekly</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Monthly" />
                          </FormControl>
                          <FormLabel className="font-normal">Monthly</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Text area field */}
            <FormField
              control={form.control}
              name="apply-reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apply Reason</FormLabel>
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

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
