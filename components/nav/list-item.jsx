// Library
import * as React from "react";

// Component
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

// Util
import { cn } from "@/app/lib/utils";

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 text-sm font-normal leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export default ListItem;
