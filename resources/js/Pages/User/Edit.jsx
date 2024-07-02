import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, user, roles }) {
  const { data, setData, put, errors, reset } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    user_role: user.roles || ""
  });

  const onSubmit = (e) => {
    e.preventDefault();

    put(route("user.update", user.id));
  };

  const resetForm = (e) => {
    setData({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit User "{user.name}"
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel htmlFor="user_name" value="User Name" />
                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_eusermail" value="User Email" />
                <TextInput
                  id="user_email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_password" value="User Password" />
                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="User Confirm Password"
                />
                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />
                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_role" value="Role" />
                <SelectInput
                  id="user_role"
                  name="user_role"
                  className="mt-1 block w-full"
                  value={data.user_role}
                  onChange={(e) => setData("user_role", e.target.value)}
                >
                  {roles.map((role) => (
                    <option value={role.name} key={role.id}>
                      {role.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.user_role} className="mt-2" />
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
                  onClick={(e) => resetForm()}
                  className="bg-red-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-500"
                >
                  Reset
                </button>
                <Link
                  href={route("user.index")}
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
