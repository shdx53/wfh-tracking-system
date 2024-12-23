// Component
import ArrangementRequestCard from "@/components/arrangements/requests/arrangement-request-card";
import Loading from "@/components/loading";

export default function TabContent({
  selectedTab,
  isArrangementRequestsPending,
  isArrangementRequestsError,
  currentPageArrangementRequests,
}) {
  return (
    <>
      {isArrangementRequestsPending && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {isArrangementRequestsError && (
        <div className="text-center text-sm">
          Oops! Something went wrong while fetching the arrangement requests.
          Please try again later.
        </div>
      )}

      {!isArrangementRequestsPending &&
        !isArrangementRequestsError &&
        currentPageArrangementRequests.length === 0 && (
          <div className="text-center text-sm">
            No arrangement requests found.
          </div>
        )}

      {currentPageArrangementRequests.length > 0 &&
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
