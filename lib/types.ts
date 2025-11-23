export type Artist = {
  name: string;
  avatarUrl: string;
};

export type Artwork = {
  id: string;
  title: string;
  artist: Artist;
  imageUrl: string;
  imageHint: string;
};

export type Comment = {
  id: string;
  artworkId: string;
  userId: string;
  username: string;
  userAvatarUrl: string;
  commentText: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | Date;
};
