import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

function Index({ auth, projects }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Due Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created By
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr
                        key={project.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {project.id}
                        </th>
                        <td className="px-6 py-4">
                          <img
                            src={project.image_path}
                            alt=""
                            style={{ width: 80 }}
                          />
                        </td>
                        <td className="px-6 py-4">{project.name}</td>
                        <td className="px-6 py-4">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4">{project.created_at}</td>
                        <td className="px-6 py-4">{project.due_date}</td>
                        <td className="px-6 py-4">{project.created_by.name}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href="{route('project.edit', project.id)}"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2"
                          >
                            Edit
                          </Link>
                          <Link
                            href="{route('project.destroy', project.id)}"
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={projects.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
