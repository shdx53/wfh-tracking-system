// Library
import { cn } from "@/app/lib/utils";
import { format } from "date-fns";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";

export default function AdHocForm({
  form,
  isPending,
  selectedStartDate,
  setSelectedStartDate,
  selectedDateShiftTypes,
}) {
  return (
    <>
      {/* Start date field */}
      <FormField
        control={form.control}
        name="startDate"
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
                  onSelect={(value) => {
                    field.onChange(value);
                    setSelectedStartDate(value);
                  }}
                  // Only allows selecting dates starting from the day after tomorrow
                  // and weekdays
                  disabled={(date) => {
                    const nextDay = new Date();
                    nextDay.setDate(nextDay.getDate() + 1);

                    // Check if the date is before tomorrow
                    const isBeforeTomorrow = date < nextDay;

                    // Check if the date is a weekend (Saturday or Sunday)
                    const isWeekend =
                      date.getDay() === 0 || date.getDay() === 6; // 0 = Sunday, 6 = Saturday

                    return isBeforeTomorrow || isWeekend;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedStartDate && !selectedDateShiftTypes && (
        <div className="text-center text-sm">Loading...</div>
      )}

      {selectedDateShiftTypes && (
        <>
          {/* Shift type field */}
          <FormField
            control={form.control}
            name="shiftType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // Ensure value is not null, so that the placeholder will be displayed
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a shift" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="AM"
                      disabled={
                        selectedDateShiftTypes &&
                        (selectedDateShiftTypes.includes("AM") ||
                          selectedDateShiftTypes.includes("Full Day"))
                      }
                    >
                      AM
                    </SelectItem>
                    <SelectItem
                      value="PM"
                      disabled={
                        selectedDateShiftTypes &&
                        (selectedDateShiftTypes.includes("PM") ||
                          selectedDateShiftTypes.includes("Full Day"))
                      }
                    >
                      PM
                    </SelectItem>
                    <SelectItem
                      value="Full Day"
                      disabled={
                        selectedDateShiftTypes &&
                        (selectedDateShiftTypes.includes("Full Day") ||
                          selectedDateShiftTypes.includes("AM") ||
                          selectedDateShiftTypes.includes("PM"))
                      }
                    >
                      All Day
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Text area field */}
          <FormField
            control={form.control}
            name="applyReason"
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

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </>
      )}
    </>
  );
}
