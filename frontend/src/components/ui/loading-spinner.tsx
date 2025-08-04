import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
  variant?: "default" | "card" | "inline" | "overlay";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export function LoadingSpinner({
  size = "md",
  className,
  text,
  variant = "default",
}: LoadingSpinnerProps) {
  const spinner = (
    <Loader2
      className={cn("animate-spin text-primary", sizeClasses[size], className)}
    />
  );

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2">
        {spinner}
        {text && (
          <span className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "overlay") {
    return (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          {spinner}
          {text && (
            <span
              className={cn("text-muted-foreground", textSizeClasses[size])}
            >
              {text}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          <div className="relative bg-background rounded-full p-4">
            <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        {text && (
          <div className="mt-6 space-y-2">
            <p
              className={cn(
                "font-medium text-foreground",
                textSizeClasses[size],
              )}
            >
              {text}
            </p>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "0.6s",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      {spinner}
      {text && (
        <span
          className={cn("mt-2 text-muted-foreground", textSizeClasses[size])}
        >
          {text}
        </span>
      )}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-muted rounded-lg p-6 space-y-4">
            <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted-foreground/15 rounded"></div>
              <div className="h-3 bg-muted-foreground/15 rounded w-5/6"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-muted-foreground/20 rounded w-16"></div>
              <div className="h-6 bg-muted-foreground/20 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
