import AuthButton from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Images, PlusCircle } from "lucide-react";

export default function ReferenceForumsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Images className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">Reference Forums</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Request specific references, share useful finds, and discuss techniques.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Reference Threads</CardTitle>
          <CardDescription>
            Find and share useful resources with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No reference threads yet.</p>
            <AuthButton>
              <Button>
                <PlusCircle className="mr-2" />
                Start a New Thread
              </Button>
            </AuthButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
