import AuthButton from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PlusCircle } from "lucide-react";

export default function ForumsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <MessageSquare className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">Community Forums</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          A place to connect, share, and learn with other artists.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Threads</CardTitle>
          <CardDescription>
            Start a new conversation or join an existing one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No forums yet.</p>
            <AuthButton>
              <Button>
                <PlusCircle className="mr-2" />
                Create a Forum to Get Started
              </Button>
            </AuthButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
