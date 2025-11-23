import { Images, MessageSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import AuthButton from "@/components/auth-button";

export default function ReferencesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Images className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">Reference Library</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          A space for artists to share and discover reference images for various art styles, subjects, poses, and more. Build your inspiration library!
        </p>
        <AuthButton>
          <Button size="lg" className="mt-6">
            <PlusCircle className="mr-2" />
            Add References
          </Button>
        </AuthButton>
      </div>

      <Separator className="my-16" />

      <div className="text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-headline font-bold">Reference Forums</h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Request specific references, share useful finds, and discuss techniques.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/references/forums">Discuss References</Link>
        </Button>
      </div>
    </div>
  );
}
