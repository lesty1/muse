import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function BecomeCreatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
      <h1 className="text-5xl font-headline font-bold mb-4">You're In!</h1>
      <p className="text-2xl text-muted-foreground max-w-lg mb-8">
        Ready to share your knowledge and passion with the Muse community?
      </p>
      <Button asChild size="lg">
        <Link href="#">
          Start here for free!!
        </Link>
      </Button>
    </div>
  );
}
