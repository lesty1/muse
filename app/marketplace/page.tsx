import { GraduationCap, ShoppingBag, Star, Wand2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import AuthButton from "@/components/auth-button";
import Link from "next/link";

const lessons: any[] = [];

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold">Marketplace</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Level up your skills with lessons from pro artists and discover essential tools to enhance your workflow.
        </p>
      </div>

      <section id="lessons">
        <div className="flex items-center gap-4 mb-8">
            <GraduationCap className="w-8 h-8 text-accent"/>
            <h2 className="text-3xl font-headline font-bold">Learn from the Pros</h2>
        </div>
        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <Card key={lesson.artist} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image src={lesson.avatar} alt={lesson.artist} width={64} height={64} className="rounded-full" />
                    <div>
                      <CardTitle>{lesson.artist}</CardTitle>
                      <CardDescription>{lesson.specialty}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">{lesson.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{lesson.rating}</span>
                      <span className="text-sm text-muted-foreground">({lesson.reviews} reviews)</span>
                  </div>
                  <AuthButton>
                    <Button>View Lessons</Button>
                  </AuthButton>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="flex items-center justify-center h-64 border-2 border-dashed">
            <div className="text-center text-muted-foreground">
                <p className="mb-4">No one here yet.</p>
                <AuthButton>
                  <Button asChild>
                    <Link href="/marketplace/become-creator">
                      <PlusCircle className="mr-2" />
                      Become a Creator
                    </Link>
                  </Button>
                </AuthButton>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
