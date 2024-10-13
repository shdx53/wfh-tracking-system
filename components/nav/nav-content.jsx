// Library
import { usePathname } from "next/navigation";

// Component
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut } from "lucide-react";

export default function NavContent({ staffName }) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/login" && (
        <nav className="flex items-center justify-between py-8">
          Nav placeholder
          {staffName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base font-normal">
                  {staffName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LogoutLink className="flex">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginLink>Login</LoginLink>
          )}
        </nav>
      )}
    </>
  );
}
