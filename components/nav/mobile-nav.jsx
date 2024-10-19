"use client";

// Library
import { useState } from "react";

// Component
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowUpRight, LogOut, Menu } from "lucide-react";

// Context
import { useLogin } from "@/app/context/login/login-context";

// Util
import { renderLinkButton } from "@/app/lib/nav/render-link-button";
import {
  arrangementRequestsPageAuthorizedPositions,
  overallSchedulePageAuthorizedPositions,
} from "@/app/lib/utils";

export default function MobileNav() {
  const { staffName, employeePosition } = useLogin();

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-4 pt-12">
        {staffName ? (
          <div className="space-y-6">
            <SheetHeader className="px-4 text-left">
              <SheetTitle className="text-base">{staffName}</SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>
            <div className="space-y-1">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="schedule">
                  <AccordionTrigger className="px-4 py-2 text-sm">
                    Schedule
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-0">
                    {overallSchedulePageAuthorizedPositions.includes(
                      employeePosition,
                    ) &&
                      renderLinkButton({
                        href: "/schedules/overall",
                        label: "Overall and team",
                        onClick: () => setOpen(false),
                      })}

                    {renderLinkButton({
                      href: "/schedules/team",
                      label: "Team",
                      onClick: () => setOpen(false),
                    })}

                    {renderLinkButton({
                      href: "/schedules/personal",
                      label: "Personal",
                      onClick: () => setOpen(false),
                    })}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="arrangement">
                  <AccordionTrigger className="px-4 py-2 text-sm">
                    Arrangement
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-0">
                    {renderLinkButton({
                      href: "/arrangements/new",
                      label: "New request",
                      onClick: () => setOpen(false),
                    })}

                    {arrangementRequestsPageAuthorizedPositions.includes(
                      employeePosition,
                    ) &&
                      renderLinkButton({
                        href: "/arrangements/requests",
                        label: "All requests",
                        onClick: () => setOpen(false),
                      })}

                    {renderLinkButton({
                      href: "/arrangements/requests/personal",
                      label: "My requests",
                      onClick: () => setOpen(false),
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <SheetFooter>
              <LogoutLink className="flex w-full items-center justify-center">
                <Button className="mx-4 w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </LogoutLink>
            </SheetFooter>
          </div>
        ) : (
          <div className="space-y-4 px-4">
            <SheetHeader className="space-y-0">
              <SheetTitle></SheetTitle>
              <SheetDescription className="text-center">
                Please log in to continue.
              </SheetDescription>
            </SheetHeader>

            <SheetFooter>
              <LoginLink className="flex w-full items-center justify-center">
                <Button className="w-full font-normal">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Log in
                </Button>
              </LoginLink>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
