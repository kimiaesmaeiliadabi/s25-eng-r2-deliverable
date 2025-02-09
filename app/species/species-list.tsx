"use client";

import { Input } from "@/components/ui/input";
import type { Database } from "@/lib/schema";
import { useState } from "react";
import SpeciesCard from "./species-card";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesList({ species, sessionId }: { species: Species[]; sessionId: string }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter species based on search query (case-insensitive)
  const filteredSpecies = species.filter((s) =>
    [s.scientific_name, s.common_name, s.description]
      .filter(Boolean) // Ignore null values
      .some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Species List</h2>
        <Input
          type="text"
          placeholder="Search species..."
          className="w-72 rounded border p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredSpecies.length > 0 ? (
          filteredSpecies.map((species) => <SpeciesCard key={species.id} species={species} sessionId={sessionId} />)
        ) : (
          <p className="text-gray-500">No matching species found.</p>
        )}
      </div>
    </div>
  );
}
