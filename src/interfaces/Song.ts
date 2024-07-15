import { Album } from "./Album";
import { Artist } from "./Artist";
import { Playlist } from "./Playlist";
import { User } from "./User";

export interface Song {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  duration: number;
  createdAt: string;
  album: Album;
  artist: Artist;
  playlists?: Playlist[];
  likes: User[];
}
