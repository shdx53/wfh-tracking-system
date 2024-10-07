// Component
import ArrangementRequestCard from "@/components/arrangements/requests/arrangement-request-card";

export default function TabContent({
  selectedTab,
  isArrangementRequestsPending,
  isArrangementRequestsError,
  currentPageArrangementRequests,
}) {
  return (
    <>
      {isArrangementRequestsPending && (
        <div className="text-center text-sm">
          Loading arrangement requests...
        </div>
      )}

      {isArrangementRequestsError && (
        <div className="text-center text-sm">
          Oops! Something went wrong while fetching the arrangement requests.
          Please try again later.
        </div>
      )}

      {currentPageArrangementRequests &&
        Array.isArray(currentPageArrangementRequests) &&
        currentPageArrangementRequests.length === 0 && (
          <div className="text-center text-sm">
            No arrangement requests found.
          </div>
        )}

      {currentPageArrangementRequests &&
        Array.isArray(currentPageArrangementRequests) &&
        currentPageArrangementRequests.map((arrangement, index) => {
          return (
            <ArrangementRequestCard
              key={index}
              selectedTab={selectedTab}
              arrangement={arrangement}
            />
          );
        })}
    </>
  );
}
