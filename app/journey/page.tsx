import { BookOpen, MessageSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import AuthButton from "@/components/auth-button";

export default function JourneyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">Your Learning Journey</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Document your personal learning progress with posts, track your improvements, and look back on how far you've come.
        </p>
        <AuthButton>
          <Button size="lg" className="mt-6">
            <PlusCircle className="mr-2" />
            Start Your Journey
          </Button>
        </AuthButton>
      </div>

      <Separator className="my-16" />

      <div className="text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-headline font-bold">Journey Forums</h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Share your progress, ask for guidance, and learn from the journeys of others.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/journey/forums">Discuss Journeys</Link>
        </Button>
      </div>
    </div>
  );
}
