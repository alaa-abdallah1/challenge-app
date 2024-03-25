import React, { useEffect } from "react";
import { Button } from "../atoms";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
  className?: string;
  nextClassName?: string;
  prevClassName?: string;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  className,
  nextClassName,
  prevClassName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    // Set the new page in the query parameters
    setSearchParams({ page: newPage.toString() });
    onPageChange && onPageChange(newPage);
  };

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePrevious = () => handlePageChange(Math.max(1, currentPage - 1));
  const handleNext = () =>
    handlePageChange(Math.min(totalPages, currentPage + 1));
  const isPageCountVisible = !isNaN(currentPage) || !isNaN(totalPages);

  useEffect(() => {
    if (currentPage > totalPages || currentPage < 1 || isNaN(currentPage)) {
      handlePageChange(1);
    }
  }, [totalPages]);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        size="small"
        btnType="primary"
        isDisabled={currentPage === 1}
        onClick={() => handlePrevious()}
        className={`max-w-max ${
          currentPage === 1 && "cursor-not-allowed opacity-50"
        } ${prevClassName}`}
      >
        Previous
      </Button>

      {isPageCountVisible && (
        <span className="text-sm font-medium font-mono hidden xs:flex">
          Page {currentPage} of {totalPages}
        </span>
      )}

      <Button
        size="small"
        btnType="primary"
        onClick={() => handleNext()}
        isDisabled={currentPage === totalPages}
        className={`max-w-max ${
          currentPage === totalPages && "cursor-not-allowed opacity-50"
        } ${nextClassName}`}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
