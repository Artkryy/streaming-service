import { Artist } from "./Artist";
import { Song } from "./Song";
import { User } from "./User";

export interface Album {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  songs?: Song[];
  artist: Artist;
  likes: User[];
}
