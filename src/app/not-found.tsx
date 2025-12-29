import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 rounded-full bg-muted p-4 text-muted-foreground">
        <FileQuestion className="h-10 w-10" />
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
