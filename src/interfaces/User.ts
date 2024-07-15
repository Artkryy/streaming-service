import { Album } from "./Album";
import { Artist } from "./Artist";
import { Playlist } from "./Playlist";
import { Song } from "./Song";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  playlists?: Playlist[];
  artistLikes?: Artist[];
  albumLikes?: Album[];
  songLikes?: Song[];
}
