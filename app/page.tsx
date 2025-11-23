
import ArtCard from "@/components/art-card";
import type { Artwork } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Upload, MessageSquare, GalleryVertical } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AuthButton from "@/components/auth-button";
import SearchBar from "@/components/search-bar";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function Home() {
  const artworks: Artwork[] = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-headline font-bold text-center mb-4">
          Discover Art
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore amazing fanart from our talented community. Get inspired and share your own creations!
        </p>
        <div className="mt-8 w-full max-w-lg">
           <SearchBar />
        </div>
        <AuthButton>
          <Button asChild size="lg" className="mt-6">
            <Link href="/upload">
              <Upload className="mr-2" />
              Upload Your Art
            </Link>
          </Button>
        </AuthButton>
        
      </div>

      {artworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((art) => (
            <ArtCard key={art.id} artwork={art} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center h-96 border-2 border-dashed">
            <div className="text-center text-muted-foreground">
                <GalleryVertical className="mx-auto h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">No Art Yet</h3>
                <p>Be the first to share your creation with the community!</p>
            </div>
        </Card>
      )}


      <Separator className="my-16" />

      <div className="text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-headline font-bold">Community Forums</h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Join the conversation, ask for advice, and connect with fellow artists.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/forums">Explore Forums</Link>
        </Button>
      </div>
    </div>
  );
}
