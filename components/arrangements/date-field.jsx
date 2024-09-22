// Library
import { cn } from "@/lib/utils";
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
import { CalendarIcon, Minus, Plus } from "lucide-react";

export default function DateField({
  index,
  form,
  field,
  fieldsLength,
  appendField,
  removeField,
  selectedArrangementType,
}) {
  const dateFieldName = `dates.${index}.date`;
  const shiftFieldName = `dates.${index}.shiftType`;

  // Get the current date value
  const currentDateValue = form.getValues(dateFieldName);

  // Get current field values
  const currentFields = form.getValues("dates");

  return (
    <div className="flex flex-col gap-2">
      {/* Date field */}
      <FormField
        control={field.control}
        name={dateFieldName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center justify-between">
              <FormLabel>Date {index + 1}</FormLabel>
              {selectedArrangementType === "Ad-hoc" && (
                <div className="flex items-center gap-2">
                  {/* Add date fields */}
                  <Button
                    variant="secondary"
                    className="h-7 w-7 p-[6px] text-xs"
                    type="button"
                    onClick={() =>
                      appendField({ date: undefined, shiftType: undefined })
                    }
                    // Disable if any field lacks date or shift type
                    disabled={
                      !currentFields.every(
                        (field) => field.date && field.shiftType,
                      )
                    }
                  >
                    <Plus />
                  </Button>

                  {/* Remove date fields */}
                  <Button
                    variant="secondary"
                    className="h-7 w-7 p-[6px] text-xs"
                    type="button"
                    onClick={() => removeField(index)}
                    // Disable if there is only one date field
                    disabled={fieldsLength === 1}
                  >
                    <Minus />
                  </Button>
                </div>
              )}
            </div>
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

      {/* Shift type field */}
      {currentDateValue && (
        <FormField
          control={form.control}
          name={shiftFieldName}
          render={({ field }) => {
            const sameDateShiftTypes = form
              .getValues("dates")
              .filter(
                (dateObj, i) =>
                  // Ensures that the current date field is excluded from the filtering
                  i !== index &&
                  // Ensures that the date is defined
                  dateObj.date &&
                  // Checks if the date matches the currentDateValue
                  dateObj.date.getTime() === currentDateValue.getTime(),
              )
              .map((dateObj) => dateObj.shiftType);

            return (
              <FormItem>
                <FormLabel>Shift Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a shift type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="AM"
                      // Disable this option if another date field with the same date has already selected "AM"
                      disabled={sameDateShiftTypes.includes("AM")}
                    >
                      AM
                    </SelectItem>
                    <SelectItem
                      value="PM"
                      // Disable this option if another date field with the same date has already selected "PM"
                      disabled={sameDateShiftTypes.includes("PM")}
                    >
                      PM
                    </SelectItem>
                    <SelectItem
                      value="Full Day"
                      // Disable this option if another date field with the same date has already selected "Full Day"
                      disabled={sameDateShiftTypes.includes("Full Day")}
                    >
                      All Day
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      )}
    </div>
  );
}
