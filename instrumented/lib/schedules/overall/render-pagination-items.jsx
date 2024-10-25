// Component
import {
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from "@/components/ui/pagination";

export function renderPaginationItems(currentPage, setCurrentPage, totalPages) {
    const items = [];
    const maxPagesToShow = 3;

    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if there are not enough pages to show
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Construct pagination items
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            className={`${i === currentPage ? "font-semibold" : ""} cursor-pointer`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Add ellipses if necessary
    if (startPage > 1) {
      items.unshift(<PaginationEllipsis key="start-ellipsis" />);
    }
    if (endPage < totalPages) {
      items.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    return items;
}