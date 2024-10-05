// Component
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Function
import { renderPaginationItems } from "@/app/lib/schedules/overall/render-pagination-items";

export default function CustomPagination({
  data,
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <>
      {data && totalPages > 1 && (
        <Pagination className="py-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${currentPage === 1 && "cursor-default opacity-60 hover:bg-transparent"}`}
                onClick={() =>
                  // Decrease the current page by 1 but ensure it doesn't go below 1
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
              />
            </PaginationItem>

            {/* Render pagination items */}
            {renderPaginationItems(currentPage, setCurrentPage, totalPages)}

            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${currentPage === totalPages && "cursor-default opacity-60 hover:bg-transparent"}`}
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    // Increase the current page by 1
                    // but ensure it doesn't exceed the total number of pages
                    Math.min(prevPage + 1, totalPages),
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
