import { Album } from "./Album";
import { User } from "./User";

export interface Artist {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  albums?: Album[];
  likes: User[];
}
