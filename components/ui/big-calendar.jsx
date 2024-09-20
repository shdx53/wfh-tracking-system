"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function BigCalendar({
  className,
  classNames,
  showOutsideDays = false,
  index,
  setIndex,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-base font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex justify-between my-4 sm:mt-6 sm:mb-0",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-normal text-sm w-[120px] xl:w-[152px] 2xl:w-40 text-end px-4",
        row: "flex w-full my-4 sm:my-6 justify-between",
        cell: "w-[120px] xl:w-[152px] 2xl:w-40 lg:aspect-square xl:aspect-[5/4.8] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 border rounded-2xl",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full py-4 px-4 font-normal aria-selected:opacity-100 text-base items-start justify-end rounded-2xl relative",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-2xl",
        day_today: "bg-accent text-accent-foreground rounded-2xl",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft onClick={() => { setIndex((prevIndex) => prevIndex -1 ) }} className="h-4 w-4" />
        ),
        IconRight: ({ ...props }) => <ChevronRight onClick={() => { setIndex((prevIndex) => prevIndex + 1 ) }} className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
BigCalendar.displayName = "BigCalendar";

export { BigCalendar };
