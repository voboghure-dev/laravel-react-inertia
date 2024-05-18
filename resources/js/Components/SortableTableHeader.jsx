import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

function SortableTableHeader({
  name,
  sortable = true,
  sort_field,
  sort_direction,
  sortChange = () => {},
  children,
}) {
  return (
    <th onClick={(e) => sortChange(name)} scope="col">
      <div className="px-6 py-3 flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-white"
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-1 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-white"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}

export default SortableTableHeader;
