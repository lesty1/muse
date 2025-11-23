'use client';

import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Artwork } from '@/lib/types';
import ArtCard from '@/components/art-card';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const allArtworks: Artwork[] = PlaceHolderImages;

  const filteredArtworks = query
    ? allArtworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query.toLowerCase()) ||
          artwork.artist.name.toLowerCase().includes(query.toLowerCase()) ||
          artwork.imageHint.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold">
          Search Results for &quot;{query}&quot;
        </h1>
      </div>

      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArtworks.map((art) => (
            <ArtCard key={art.id} artwork={art} />
          ))}
        </div>
      ) : (
        <Card className="flex items-center justify-center h-96 border-2 border-dashed">
          <div className="text-center text-muted-foreground">
              <Search className="mx-auto h-12 w-12 mb-4" />
              <p>No results found for &quot;{query}&quot;.</p>
              <p className="text-sm">Try searching for something else.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
