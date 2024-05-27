import SortableTableHeader from "@/Components/SortableTableHeader";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, Link } from "@inertiajs/react";

const TasksTable = ({ tasks, queryParams, hideProjectColumn = false }) => {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChange = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("task.index"), queryParams);
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th colSpan={4} scope="col" className="px-6 py-3">
              <TextInput
                className="w-full"
                placeholder="Search task name"
                defaultValue={queryParams.name}
                onBlur={(e) => searchFieldChanged("name", e.target.value)}
                onKeyPress={(e) => onKeyPress("name", e)}
              />
            </th>
            <th colSpan={1} scope="col" className="px-6 py-3">
              <SelectInput
                className="w-full"
                defaultValue={queryParams.status}
                onChange={(e) => searchFieldChanged("status", e.target.value)}
              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
            </th>
            <th colSpan={4} scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <SortableTableHeader
              name="id"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              ID
            </SortableTableHeader>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            {!hideProjectColumn && (
              <th scope="col" className="px-6 py-3">
                Project Name
              </th>
            )}
            <SortableTableHeader
              name="name"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              Name
            </SortableTableHeader>
            <SortableTableHeader
              name="status"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              Status
            </SortableTableHeader>
            <SortableTableHeader
              name="created_at"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              Created Date
            </SortableTableHeader>
            <SortableTableHeader
              name="due_date"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChange={sortChange}
            >
              Due Date
            </SortableTableHeader>
            <th scope="col" className="px-6 py-3">
              Created By
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.data.map((task) => (
            <tr
              key={task.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {task.id}
              </th>
              <td className="px-6 py-4">
                <img src={task.image_path} alt="" style={{ width: 80 }} />
              </td>
              {!hideProjectColumn && (
                <td className="px-6 py-4">{task.project.name}</td>
              )}
              <td className="px-6 py-4">{task.name}</td>
              <td className="px-6 py-4">
                <span
                  className={
                    "px-2 py-1 rounded text-white " +
                    TASK_STATUS_CLASS_MAP[task.status]
                  }
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </td>
              <td className="px-6 py-4">{task.created_at}</td>
              <td className="px-6 py-4">{task.due_date}</td>
              <td className="px-6 py-4">{task.created_by.name}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href="{route('task.edit', task.id)}"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2"
                >
                  Edit
                </Link>
                <Link
                  href="{route('task.destroy', task.id)}"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={tasks.meta.links} />
    </>
  );
};

export default TasksTable;
