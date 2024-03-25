import React from "react";
import { DataTableHeader, DataTableProps } from "@/types";
import Pagination from "./Pagination";

const SkeletonRow: React.FC<{
  headers: DataTableHeader[];
}> = ({ headers }) => (
  <tr className="animate-pulse">
    {headers?.map((header, index) => (
      <td key={index} className="p-5 border-b border-gray-200 text-sm">
        <div
          className={`h-10 bg-gray-300 rounded ${header?.skeletonClassName}`}
        ></div>
      </td>
    ))}
  </tr>
);

export const DataTable: React.FC<DataTableProps> = ({
  data,
  headers,
  isLoading,
  onPageChange,
  totalPages = 1,
  itemsPerPage = 6,
}) => {
  const isPaginated = totalPages || data?.length;

  return (
    <div className={`space-y-6 bg-card ${isPaginated && "pb-4"}`}>
      <div className="overflow-x-auto">
        <div className="card !p-0">
          <table className="bg-card w-full leading-normal">
            <thead>
              <tr>
                {headers?.map((header) => (
                  <th
                    key={header.key}
                    className={`px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider ${header?.headerClassName}`}
                  >
                    {(header.title || header.key)?.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="data-table-body">
              {isLoading ? (
                Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
                  <SkeletonRow key={rowIndex} headers={headers} />
                ))
              ) : data?.length > 0 ? (
                data.map(
                  (item, index) =>
                    itemsPerPage >= index + 1 && (
                      <tr key={item.id}>
                        {headers?.map((header) => (
                          <td
                            key={header.key}
                            className={`px-5 py-5 border-b border-gray-200 text-sm ${header?.cellClassName}`}
                          >
                            {header.component
                              ? header.component(item)
                              : item[header.key]}
                          </td>
                        ))}
                      </tr>
                    )
                )
              ) : (
                <tr className="text-center ">
                  <td
                    className="px-5 py-16 border-b border-gray-200 font-medium"
                    colSpan={headers?.length}
                  >
                    No data to show here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isPaginated ? (
        <Pagination
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="m-4"
        />
      ) : null}
    </div>
  );
};

export default DataTable;
