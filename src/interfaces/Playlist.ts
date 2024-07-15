import { Song } from "./Song";
import { User } from "./User";

export interface Playlist {
  id: number;
  name: string;
  createdAt: string;
  user: User;
  songs?: Song[];
}
