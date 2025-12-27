import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

type UserMenuCardProps = {
  onClose: () => void;
};

export function UserMenuCard({ onClose }: UserMenuCardProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Card className="w-56 p-4 shadow-lg rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold text-sm">
            {user?.name ?? 'User'}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.email ?? ''}
          </p>
        </div>
      </div>

      <Button
        variant="destructive"
        className="w-full flex items-center gap-2"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </Card>
  );
}
