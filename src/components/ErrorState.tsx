import { WifiOff, AlertTriangle, RefreshCcw } from "lucide-react";
import { FC } from "react";

type ErrorStateVariant = "error" | "offline";

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: ErrorStateVariant;
}

export const ErrorState: FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We couldn’t load the data. Please try again.",
  actionLabel = "Retry",
  onAction,
  variant = "error",
}) => {
  const Icon = variant === "offline" ? WifiOff : AlertTriangle;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-card">
        <Icon className="mx-auto mb-4 h-10 w-10 text-destructive" />

        <h2 className="mb-2 text-xl font-semibold">
          {title}
        </h2>

        <p className="mb-6 text-sm text-muted-foreground">
          {message}
        </p>

        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <RefreshCcw className="h-4 w-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

