import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, Sparkles } from 'lucide-react';
import { FoodEntry } from '@/types/nutrition';
import { toast } from '@/hooks/use-toast';

interface AddFoodDialogProps {
  onAddFood: (entry: Omit<FoodEntry, 'id'>) => void;
}

export function AddFoodDialog({ onAddFood }: AddFoodDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState<FoodEntry['mealType']>('snack');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Please enter a food name',
        variant: 'destructive',
      });
      return;
    }

    const now = new Date();
    onAddFood({
      name: name.trim(),
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      mealType,
    });

    toast({
      title: 'Food added!',
      description: 'Your backend will analyze and add nutritional info.',
    });

    setName('');
    setMealType('snack');
    setOpen(false);
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
          <DialogTitle className="font-display text-xl">Log Your Food</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="food-name">What did you eat?</Label>
            <Input
              id="food-name"
              placeholder="e.g., Grilled chicken salad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label>Meal Type</Label>
            <Select value={mealType} onValueChange={(v) => setMealType(v as FoodEntry['mealType'])}>
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

          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Upload a photo <span className="text-foreground font-medium">(optional)</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              AI will identify and calculate nutrition
            </p>
          </div>

          <Button type="submit" className="w-full h-12 gap-2">
            <Sparkles className="w-4 h-4" />
            Add & Analyze
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
