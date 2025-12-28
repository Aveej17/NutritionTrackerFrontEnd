import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Plus, Upload, Sparkles } from 'lucide-react';
import { FoodEntry } from '@/types/nutrition';
import { toast } from '@/hooks/use-toast';
import api from '@/api';

export function AddFoodDialog() {
  const [open, setOpen] = useState(false);
  const [mealType, setMealType] = useState<FoodEntry['mealType']>('snack');
  const [image, setImage] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast({
        title: 'Image required',
        description: 'Please upload a food image',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('notes', notes);
      formData.append('mealType', mealType.trim().toLowerCase());

      await api.post('/api/foods/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      ['foods', 'today-totals'].forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key] })
        );

      toast({
        title: 'Food uploaded!',
        description: 'Analyzing nutrition details…',
      });

      setOpen(false);
      setImage(null);
      setNotes('');
      setMealType('snack');
    } catch {
      toast({
        title: 'Upload failed',
        description: 'Could not analyze the food image',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Add Food
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Log Your Food
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Eg: Chicken biryani from lunch"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Input
              placeholder="Eg: Spicy, homemade, with extra rice"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Meal Type</Label>
            <Select
              value={mealType}
              onValueChange={(v) =>
                setMealType(v as FoodEntry['mealType'])
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Food Image</Label>
            <label className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 cursor-pointer block">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {image ? image.name : 'Click to upload a food image'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                AI will identify and calculate nutrition
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files && setImage(e.target.files[0])
                }
                required
              />
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 gap-2"
            disabled={loading}
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Analyzing...' : 'Add & Analyze'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
