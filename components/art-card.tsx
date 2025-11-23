import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Artwork } from "@/lib/types";

interface ArtCardProps {
  artwork: Artwork;
}

export default function ArtCard({ artwork }: ArtCardProps) {
  return (
    <Link href={`/artwork/${artwork.id}`} className="block group break-inside-avoid">
      <Card className="overflow-hidden relative transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          width={600}
          height={800}
          className="w-full h-auto object-cover"
          data-ai-hint={artwork.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-white font-bold font-headline truncate">{artwork.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Avatar className="h-6 w-6 border-2 border-white/50">
              <AvatarImage src={artwork.artist.avatarUrl} alt={artwork.artist.name} />
              <AvatarFallback>{artwork.artist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-white/80 text-sm font-medium">{artwork.artist.name}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
