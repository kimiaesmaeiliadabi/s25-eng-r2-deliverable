"use client";

import EditSpeciesDialog from "@/components/edit-species-dialog";
import SpeciesDialog from "@/components/species-dialog";
import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({ species, sessionId }: { species: Species; sessionId: string }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}

      {/* Species Name Section */}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>

      {/* Learn More Button */}
      <Button className="mt-3 w-full bg-green-500" onClick={() => setViewDialogOpen(true)}>
        Learn More
      </Button>

      {/* Edit Button (only for the author) */}
      {species.author === sessionId && (
        <Button className="mt-2 w-full bg-yellow-500" onClick={() => setEditDialogOpen(true)}>
          Edit
        </Button>
      )}

      {/* Dialogs for Learn More and Edit */}
      <SpeciesDialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} species={species} />
      <EditSpeciesDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} species={species} />
    </div>
  );
}
