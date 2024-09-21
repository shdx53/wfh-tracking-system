"use client";

// Library
import { useState } from "react";

// Component
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArrangementCard from "@/components/schedule/arrangement-card";

export default function OverallSchedule() {
  // Initialize date to current date
  const [date, setDate] = useState(new Date().toString());

  // Format date for display on the UI
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short", // e.g., Mon
    month: "short", // e.g., Sep
    day: "2-digit", // e.g., 16
    year: "numeric", // e.g., 2024
  });

  function renderTabContent() {
    return (
      <>
        {/* Employee Count */}
        <div className="flex flex-col gap-1 pb-4 pt-12">
          <div>Employee Count</div>
          <div className="text-3xl font-medium">10</div>
        </div>

        {/* Arrangements */}
        <ArrangementCard page="overall" type="AM" status="approved" />
        <ArrangementCard page="overall" type="PM" status="approved" />
        <ArrangementCard page="overall" type="All Day" status="approved" />
      </>
    );
  }

  return (
    <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-none">
      <header className="flex flex-col gap-3 py-8">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Team1">Team1</SelectItem>
              <SelectItem value="Team2">Team2</SelectItem>
              <SelectItem value="Team3">Team3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="items-start md:flex md:gap-4 lg:gap-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border p-6 sm:p-8 md:w-1/2 md:p-6 lg:p-8"
        />

        <section className="my-8 rounded-lg border p-6 sm:p-8 md:my-0 md:w-1/2 md:p-6 lg:p-8">
          <h2 className="text-xl font-semibold">
            <div>Schedule for </div>
            <div>{formattedDate}</div>
          </h2>

          <Tabs defaultValue="In-Office" className="pt-4">
            <TabsList className="">
              <TabsTrigger value="In-Office">In-Office</TabsTrigger>
              <TabsTrigger value="Work-From-Home" className="sm:hidden">
                WFH
              </TabsTrigger>
              <TabsTrigger value="Work-From-Home" className="hidden sm:block">
                Work-From-Home
              </TabsTrigger>
              <TabsTrigger value="Leave">Leave</TabsTrigger>
            </TabsList>

            {/* In-Office Tab */}
            <TabsContent value="In-Office" className="flex flex-col gap-4">
              {renderTabContent()}
            </TabsContent>

            {/* Work-From-Home Tab */}
            <TabsContent value="Work-From-Home" className="flex flex-col gap-4">
              {renderTabContent()}
            </TabsContent>

            {/* Leave Tab */}
            <TabsContent value="Leave" className="flex flex-col gap-4">
              {renderTabContent()}
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
