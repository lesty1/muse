'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Artwork, Comment } from '@/lib/types';
import ArtCard from '@/components/art-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default function ArtworkDetailPage() {
  const params = useParams();
  const { id } = params;
  const { user } = useUser();
  const firestore = useFirestore();
  const [commentText, setCommentText] = useState('');
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);

  useEffect(() => {
    let anonId = localStorage.getItem('anonymousUserId');
    if (!anonId) {
      anonId = uuidv4();
      localStorage.setItem('anonymousUserId', anonId);
    }
    setAnonymousUserId(anonId);
  }, []);

  const artworks = PlaceHolderImages as Artwork[];
  const artwork = artworks.find((art) => art.id === id as string);

  const commentsQuery = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return query(collection(firestore, `artwork/${id}/comments`), orderBy('createdAt', 'desc'));
  }, [firestore, id]);

  const { data: comments, isLoading: isLoadingComments } = useCollection<Comment>(commentsQuery);

  const handlePostComment = async () => {
    if (!firestore || !id || !commentText.trim()) return;

    const currentUserId = user?.uid || anonymousUserId;
    if (!currentUserId) return; // Should not happen if anonymous ID is set

    try {
      await addDoc(collection(firestore, `artwork/${id}/comments`), {
        artworkId: id,
        userId: currentUserId,
        username: user?.displayName || 'Anonymous',
        userAvatarUrl: user?.photoURL || `https://picsum.photos/seed/${currentUserId}/40/40`,
        commentText: commentText,
        createdAt: serverTimestamp(),
      });
      setCommentText(''); // Clear textarea after posting
    } catch (error) {
      console.error("Error posting comment:", error);
      // You might want to show a toast notification here
    }
  };


  // Simple recommendation: show other artworks, excluding the current one.
  const recommendedArtworks = artworks.filter((art) => art.id !== id).slice(0, 5);

  if (!artwork) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Artwork not found</h1>
        <p className="text-muted-foreground mt-2">
          The artwork you are looking for does not exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">
            <ArrowLeft className="mr-2" />
            Back to Discover
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2" />
            Back to Discover
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover"
              data-ai-hint={artwork.imageHint}
            />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-headline font-bold mb-2">{artwork.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={artwork.artist.avatarUrl} alt={artwork.artist.name} />
              <AvatarFallback>{artwork.artist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium text-muted-foreground">by {artwork.artist.name}</p>
          </div>
          <p className="text-lg text-foreground/80 mb-8">
            This is a placeholder description for the artwork. In a real application, this would contain details about the piece, the artist's thoughts, and the story behind it.
          </p>

          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="lg">
                <MessageSquare className="mr-2" />
                Show Comments ({comments?.length || 0})
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-6">
              <div className="border rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
                {isLoadingComments ? (
                  <p className="text-muted-foreground text-sm">Loading comments...</p>
                ) : comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={comment.userAvatarUrl} alt={comment.username} />
                        <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm">{comment.username}</p>
                          <p className="text-xs text-muted-foreground">
                            {comment.createdAt instanceof Date ? formatDistanceToNow(comment.createdAt, { addSuffix: true }) : 'Just now'}
                          </p>
                        </div>
                        <p className="text-sm text-foreground/80 mt-1">{comment.commentText}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No comments yet. Be the first to share your thoughts!</p>
                )}
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Add your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button onClick={handlePostComment} disabled={!commentText.trim()}>Post Comment</Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

        </div>
      </div>

      <Separator className="my-16" />

      <div>
        <h2 className="text-3xl font-headline font-bold mb-8 text-center">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recommendedArtworks.map((art) => (
            <ArtCard key={art.id} artwork={art} />
          ))}
        </div>
      </div>
    </div>
  );
}
