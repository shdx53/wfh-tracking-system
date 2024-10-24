"use client";

// Library
import { fetchEmployeePosition } from "@/app/lib/employees/fetch-employee-position";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Component
import Loading from "../loading";
import NavContent from "./nav-content";

// Context
import { LoginProvider } from "@/app/context/login/login-context";

// Util
import { overallSchedulePageAuthorizedPositions } from "@/app/lib/utils";
import { arrangementRequestsPageAuthorizedPositions } from "@/app/lib/utils";

export default function Nav({ children }) {
  /* Determine protected page logic */
  const pathname = usePathname();

  // All pages require login except the home page and login page
  const isProtectedPage = pathname !== "/" && pathname !== "/login";

  /* Get Staff_ID logic */
  const { getUser, isLoading } = useKindeBrowserClient();
  const [staffID, setStaffID] = useState(null);
  const [staffName, setStaffName] = useState(null);

  useEffect(() => {
    if (getUser()) {
      const authenticatedStaffID = getUser().username;
      const authenticatedStaffName = `${getUser().given_name} ${getUser().family_name}`;
      setStaffID(authenticatedStaffID);
      setStaffName(authenticatedStaffName);
    }
  }, [getUser]);

  /* Get employee position logic */
  const employeePositionQuery = useQuery({
    queryKey: ["employee position", { staffID }],
    queryFn: ({ queryKey }) => fetchEmployeePosition(queryKey[1].staffID),
    enabled: staffID !== null,
  });
  const employeePositionObj = employeePositionQuery.data;
  const employeePosition =
    employeePositionObj &&
    Array.isArray(employeePositionObj) &&
    employeePositionObj[0].Position;
  const isEmployeePositionPending = employeePositionQuery.isPending;
  const isEmployeePositionError = employeePositionQuery.isError;

  /* Determine whether employee is authorized logic */
  const isOverallSchedulePage = pathname === "/schedules/overall";
  const isArrangementRequestsPage = pathname === "/arrangements/requests";
  const hasAccess =
    (isOverallSchedulePage &&
      overallSchedulePageAuthorizedPositions.includes(employeePosition)) ||
    (isArrangementRequestsPage &&
      arrangementRequestsPageAuthorizedPositions.includes(employeePosition)) ||
    (!isOverallSchedulePage && !isArrangementRequestsPage);

  // Login context
  const loginData = { staffID, staffName, employeePosition };

  return (
    <>
      {/* Protected page */}
      {isProtectedPage && (
        <>
          {/* Include staffID as a condition to ensure */}
          {/* isPending is not always true if staffID is null */}

          {/* Loading state */}
          {isEmployeePositionPending && staffID && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
              <Loading />
            </div>
          )}

          {/* Error state */}
          {isEmployeePositionError && staffID && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
              Oops! Something went wrong. Please try again later.
            </div>
          )}

          {/* Not logged in state */}
          {!isLoading && !staffID && (
            // Staff is not logged in
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
              Please log in to access this page.
            </div>
          )}

          {/* Access control */}
          {!isEmployeePositionPending &&
            !isEmployeePositionError &&
            staffID &&
            (hasAccess ? (
              // Staff has access to the protected page
              <>
                <LoginProvider loginData={loginData}>
                  <NavContent />
                  {children}
                </LoginProvider>
              </>
            ) : (
              // Staff does not have access to the protected page
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
                You are not authorized to view this page.
              </div>
            ))}
        </>
      )}

      {/* Unprotected page */}
      {!isProtectedPage && (
        <>
          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
              {/* Awaiting authentication */}
              <Loading />
            </div>
          ) : (
            <LoginProvider loginData={loginData}>
              <NavContent />
              {children}
            </LoginProvider>
          )}
        </>
      )}
    </>
  );
}
