import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateGoals } from "@/hooks/useDailyGoals";

export function ConfigureGoalsDialog({ open, onClose, goals }) {
  const [form, setForm] = useState(goals);
  const { mutate, isLoading } = useUpdateGoals();

  // 🔁 Reset form every time dialog opens
  useEffect(() => {
    if (open) {
      setForm(goals);
    }
  }, [open, goals]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSave = () => {
    mutate(form, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Your Goals</DialogTitle>
          <DialogDescription>
            Set daily nutrition targets that match your lifestyle.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="calories">Calories (kcal)</Label>
            <Input
              id="calories"
              name="calories"
              type="number"
              placeholder="Calories"
              value={form.calories}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              name="protein"
              type="number"
              placeholder="Protein (g)"
              value={form.protein}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="carbs">Carbs (g)</Label>
            <Input
              id="carbs"
              name="carbs"
              type="number"
              placeholder="Carbs (g)"
              value={form.carbs}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="fat">Fat (g)</Label>
            <Input
              id="fat"
              name="fat"
              type="number"
              placeholder="Fat (g)"
              value={form.fat}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving…" : "Save Goals"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
