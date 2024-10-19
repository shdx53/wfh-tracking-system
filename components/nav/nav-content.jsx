// Library
import { usePathname } from "next/navigation";

// Component
import { useRouter } from "next/navigation";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";

// Context

export default function NavContent() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/login" && (
        <nav className="flex items-center justify-between py-8 md:justify-start md:gap-6">
          <div
            className="cursor-pointer text-nowrap font-bold"
            onClick={() => router.push("/")}
          >
            All-In-One
          </div>

          <DesktopNav />

          <MobileNav />
        </nav>
      )}
    </>
  );
}
