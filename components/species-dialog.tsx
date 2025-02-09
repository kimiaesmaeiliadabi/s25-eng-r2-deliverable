import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import React from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

interface SpeciesDialogProps {
  open: boolean;
  onClose: () => void;
  species: Species | null;
}

const SpeciesDialog: React.FC<SpeciesDialogProps> = ({ open, onClose, species }) => {
  if (!species) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-2xl font-bold">
          {species.common_name} <span className="italic text-gray-400">({species.scientific_name})</span>
        </DialogTitle>

        <div className="space-y-4">
          <p className="text-lg">
            <strong>Kingdom:</strong> {species.kingdom}
          </p>
          <p className="text-lg">
            <strong>Total Population:</strong> {species.total_population}
          </p>
          <p className="text-lg">
            <strong>Description:</strong> {species.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpeciesDialog;
