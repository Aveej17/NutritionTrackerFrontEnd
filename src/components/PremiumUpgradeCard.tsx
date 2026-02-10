interface PremiumUpgradeCardProps {
  title?: string;
  message?: string;
  onUpgrade: () => void;
}

export function PremiumUpgradeCard({
  title = 'Premium Feature 🔒',
  message = 'Upgrade to unlock this feature and enjoy unlimited access.',
  onUpgrade,
}: PremiumUpgradeCardProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 border border-dashed rounded-xl bg-muted/30">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center mb-6">
        {message}
      </p>
      <button
        onClick={onUpgrade}
        className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
      >
        Upgrade Now
      </button>
    </div>
  );
}
