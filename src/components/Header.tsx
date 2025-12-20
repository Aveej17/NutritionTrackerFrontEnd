import { Leaf, Settings, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { logoutUser } from '@/api/userApi';
import { UserMenuCard } from './UserMenuCard';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // 🔥 Read once from localStorage
  const isSubscribed = localStorage.getItem('subscribed') === 'true';

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('subscribed');
    navigate('/login');
  };

  const handleUpgrade = () => {
    navigate('/upgrade'); // or open Razorpay directly
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                NutriTrack
              </h1>
              <p className="text-xs text-muted-foreground">
                Smart nutrition tracking
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="relative flex items-center gap-2">
            {/* 🔥 Show only for FREE users */}
            {!isSubscribed && (
              <Button
                onClick={handleUpgrade}
                className="rounded-xl flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Upgrade
              </Button>
            )}

            <Button variant="ghost" size="icon" className="rounded-xl">
              <Settings className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => setShowMenu(!showMenu)}
            >
              <User className="w-5 h-5" />
            </Button>

            {showMenu && (
              <div className="absolute right-0 top-14">
                <UserMenuCard onLogout={handleLogout} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
