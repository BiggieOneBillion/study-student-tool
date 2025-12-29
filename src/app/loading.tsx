import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="animate-pulse text-lg font-medium text-foreground">
          Loading your study materials...
        </h3>
        <p className="text-sm text-muted-foreground">
          Just a moment while we get things ready.
        </p>
      </div>
    </div>
  );
}
