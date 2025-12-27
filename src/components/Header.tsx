import { Leaf, Settings, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { UserMenuCard } from './UserMenuCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();
  const isSubscribed = user?.isPremium ?? false;

  const handleUpgrade = () => {
    navigate('/upgrade');
  };

  /* =======================
     Close menu on outside click & ESC
  ======================= */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showMenu]);

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
            {/* Upgrade CTA for free users */}
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
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
            >
              <User className="w-5 h-5" />
            </Button>

            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-14 z-50"
              >
                <UserMenuCard onClose={() => setShowMenu(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
