import { Song } from "./Song";

export interface PlayerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}
