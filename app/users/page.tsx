import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  // Create Supabase server client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to home if user is not logged in
  if (!session) {
    redirect("/");
  }

  // Fetch all users from Supabase
  const { data: users, error } = await supabase.from("profiles").select("id, email, display_name, biography");

  if (error) {
    console.error("Error fetching users:", error.message);
    return <p className="text-red-500">Failed to load users.</p>;
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Users</h1>
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="rounded-lg border p-4 shadow">
              <h2 className="text-xl font-semibold">{user.display_name || "Unknown User"}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-800">{user.biography || "No biography available."}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}
