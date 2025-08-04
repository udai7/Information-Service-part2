import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ServiceCardSkeletonProps {
  count?: number;
  className?: string;
}

export function ServiceCardSkeleton({
  count = 6,
  className,
}: ServiceCardSkeletonProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className="hover:shadow-lg transition-all duration-200 animate-pulse"
        >
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
            </div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-14"></div>
            </div>
            <div className="h-9 bg-muted rounded w-full"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card
          key={i}
          className="hover:shadow-lg transition-shadow animate-pulse"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-4 w-4 bg-muted rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-muted rounded w-16 mb-2"></div>
            <div className="h-3 bg-muted rounded w-20"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ListItemSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="h-10 w-10 bg-muted rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface FormSkeletonProps {
  fields?: number;
  hasSubmitButton?: boolean;
}

export function FormSkeleton({
  fields = 5,
  hasSubmitButton = true,
}: FormSkeletonProps) {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-10 bg-muted rounded w-full"></div>
          </div>
        ))}
        {hasSubmitButton && (
          <div className="flex justify-end pt-4">
            <div className="h-10 bg-muted rounded w-24"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
