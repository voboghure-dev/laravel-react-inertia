import Checkbox from "@/Components/Checkbox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({
  auth,
  role,
  permissions,
  rolePermissions,
  success,
  error,
}) {
  const { data, setData, post, errors, reset } = useForm({
    userPermission: rolePermissions || [],
  });

  const handleChecked = (e) => {
    let id = e.target.value;
    if (e.target.checked) {
      setData("userPermission", [...data.userPermission, id]);
    } else {
      setData(
        "userPermission",
        data.userPermission.filter((item) => {
          return item !== id;
        })
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("role.givePermission", role.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Add Permission To "{role.name}"
          </h2>
        </div>
      }
    >
      <Head title={`Add Permission To "${role.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="py-2 px-2 bg-emerald-500 rounded text-white mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="py-2 px-2 bg-red-500 rounded text-white mb-4">
              {error}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="grid grid-cols-4 gap-4">
                {permissions.map((permission) => (
                  <div
                    className="p-6 text-gray-900 dark:text-gray-100"
                    key={permission.id}
                  >
                    <p>
                      <Checkbox
                        id={permission.id}
                        name="permission[]"
                        value={permission.name}
                        onChange={handleChecked}
                        checked={data.userPermission.includes(permission.name)}
                      />
                      &nbsp;
                      {permission.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 gap-2 flex flex-row-reverse">
                <button
                  type="submit"
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="bg-red-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-500"
                >
                  Reset
                </button>
                <Link
                  href={route("role.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
