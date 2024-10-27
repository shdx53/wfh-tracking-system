// Component
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogOut } from "lucide-react";
import ListItem from "./list-item";

// Context
import { useLogin } from "@/app/context/login/login-context";

// Util
import {
    arrangementRequestsPageAuthorizedPositions,
    overallSchedulePageAuthorizedPositions
} from "@/app/lib/utils";

export default function DesktopNav() {
  const { staffName, employeePosition } = useLogin();

  return (
    <div className="hidden w-full justify-between md:flex">
      <div className="flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base font-normal">
                Schedule
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-4">
                  {overallSchedulePageAuthorizedPositions.includes(
                    employeePosition,
                  ) && (
                    <ListItem
                      href="/schedules/overall"
                      title="Overall and team"
                    ></ListItem>
                  )}
                  <ListItem href="/schedules/team" title="Team"></ListItem>
                  <ListItem
                    href="/schedules/personal"
                    title="Personal"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base font-normal">
                Arrangement
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-4">
                  <ListItem
                    href="/arrangements/new"
                    title="New request"
                  ></ListItem>

                  {arrangementRequestsPageAuthorizedPositions.includes(
                    employeePosition,
                  ) && (
                    <ListItem
                      href="/arrangements/requests"
                      title="All requests"
                    ></ListItem>
                  )}

                  <ListItem
                    href="/arrangements/requests/personal"
                    title="My requests"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {staffName ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-base font-normal">
              {staffName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <LogoutLink className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginLink>Login</LoginLink>
      )}
    </div>
  );
}


