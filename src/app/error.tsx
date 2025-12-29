"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-4">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        Something went wrong!
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        {error.message ||
          "An unexpected error occurred. Please try again or contact support if the problem persists."}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
        >
          Go back home
        </Button>
      </div>
      {error.digest && (
        <p className="mt-8 text-xs text-muted-foreground">
          Error ID: <code className="font-mono">{error.digest}</code>
        </p>
      )}
    </div>
  );
}
