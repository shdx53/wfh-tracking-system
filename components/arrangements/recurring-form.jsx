// Library
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

// Component
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";

export default function RecurringForm({ form, selectedArrangementType }) {
  const [selectedRecurringFrequency, setSelectedRecurringFrequency] =
    useState(null);

  return (
    <>
      {/* Recurring frequency field */}
      <FormField
        control={form.control}
        name="recurring-frequency"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Please select a recurring interval</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedRecurringFrequency(value);
                }}
                defaultValue={field.value}
                className="flex gap-6"
              >
                {["Weekly", "Monthly"].map((frequency) => (
                  <FormItem
                    key={frequency}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={frequency} />
                    </FormControl>
                    <FormLabel className="font-normal">{frequency}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Start date field */}
      <FormField
        control={form.control}
        name="start-date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  // Disable dates before the day after tomorrow
                  disabled={(date) => {
                    const nextDay = new Date();
                    nextDay.setDate(nextDay.getDate() + 1);
                    return date < nextDay;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedRecurringFrequency && form.getValues("start-date") && (
        <>
          {/* End date field */}
          {selectedArrangementType === "Recurring" && (
            <FormField
              control={form.control}
              name="end-date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const startDate = form.getValues("start-date");
                          const recurringFrequency = form.getValues(
                            "recurring-frequency",
                          );

                          const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
                          let minEndDate = new Date(startDate);

                          // Set minimum end date based on recurring frequency
                          if (recurringFrequency === "Weekly") {
                            minEndDate.setDate(minEndDate.getDate() + 7); // At least 1 week after
                          } else if (recurringFrequency === "Monthly") {
                            minEndDate.setMonth(minEndDate.getMonth() + 1); // At least 1 month after
                          }

                          return date < minEndDate; // Disable dates before minEndDate
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Shift type field */}
          <FormField
            control={form.control}
            name="shift-type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a shift" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                    <SelectItem value="Full Day">All Day</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Text area field */}
          <FormField
            control={form.control}
            name="apply-reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apply reason</FormLabel>
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

          {/* Submit button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </>
  );
}
