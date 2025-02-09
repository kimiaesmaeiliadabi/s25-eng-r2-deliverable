import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesList from "./species-list";

export default async function SpeciesPage() {
  // Create Supabase server client and obtain user session
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  // Fetch species from Supabase
  const { data: species, error } = await supabase.from("species").select("*").order("id", { ascending: false });

  if (error) {
    console.error("Error fetching species:", error.message);
    return <p className="text-red-500">Failed to load species.</p>;
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Species</h1>
        <AddSpeciesDialog userId={session.user.id} />
      </div>

      {/* ✅ Pass sessionId to SpeciesList so edit button works */}
      <SpeciesList species={species || []} sessionId={session.user.id} />
    </div>
  );
}
