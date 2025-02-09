import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to update a species
export const updateSpecies = async (id: number, updatedData: any) => {
  const { error } = await supabase.from("species").update(updatedData).eq("id", id);

  if (error) {
    console.error("Error updating species:", error);
    throw error;
  }
};
