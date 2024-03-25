import { ReactNode } from "react";

export interface DataTableProps {
  data: any[];
  totalPages?: number;
  isLoading?: boolean;
  itemsPerPage?: number;
  headers: DataTableHeader[];
  onPageChange?: (page: number) => void;
}

export interface DataTableHeader {
  key: string;
  title?: string;
  cellClassName?: string;
  headerClassName?: string;
  skeletonClassName?: string;
  component?: (data: any) => ReactNode;
}
