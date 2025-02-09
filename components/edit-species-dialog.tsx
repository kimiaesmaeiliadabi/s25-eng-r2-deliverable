import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Database } from "@/lib/schema";
import { updateSpecies } from "@/lib/supabase";
import React, { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

interface EditSpeciesDialogProps {
  open: boolean;
  onClose: () => void;
  species: Species;
}

const EditSpeciesDialog: React.FC<EditSpeciesDialogProps> = ({ open, onClose, species }) => {
  const [formData, setFormData] = useState({
    common_name: species.common_name ?? "",
    scientific_name: species.scientific_name ?? "",
    total_population: species.total_population ?? "",
    kingdom: species.kingdom ?? "",
    description: species.description ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateSpecies(species.id, formData);
      onClose();
    } catch (error) {
      console.error("Error updating species:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Edit Species</DialogTitle>

        <label>Common Name:</label>
        <Input name="common_name" value={formData.common_name} onChange={handleChange} />

        <label>Scientific Name:</label>
        <Input name="scientific_name" value={formData.scientific_name} onChange={handleChange} />

        <label>Total Population:</label>
        <Input
          name="total_population"
          type="number"
          value={formData.total_population ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, total_population: e.target.value ? Number(e.target.value) : null })
          }
        />

        <label>Kingdom:</label>
        <Input name="kingdom" value={formData.kingdom} onChange={handleChange} />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description ?? ""}
          onChange={handleChange}
          className="h-32 w-full resize-none rounded-md border p-2"
        />

        <Button
          className="mt-4 bg-green-500"
          onClick={() => {
            handleSubmit().catch(console.error);
          }}
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditSpeciesDialog;
