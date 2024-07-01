import { PlayerState } from "../../interfaces/Player";
import { Song } from "../../interfaces/Song";

export class PlayerModel {
  private state: PlayerState = {
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    duration: 0,
  };

  private playlist: Song[] = [];
  private currentTrackIndex: number = 0;

  getState() {
    return this.state;
  }

  setState(newState: PlayerState): void {
    this.state = newState;
  }

  setPlaylist(playlist: Song[]): void {
    this.playlist = playlist;
  }

  setTrack(track: Song | undefined): void {
    if (track) {
      this.state.currentTrack = track;
      this.state.duration = track.duration;
    }
  }

  setDuration(duration: number): void {
    this.state.duration = duration;
  }

  play(startTime: number): void {
    this.state.isPlaying = true;
    this.state.currentTime = startTime;
  }

  pause(): void {
    this.state.isPlaying = false;
  }

  updateTime(time: number): void {
    if (this.state.isPlaying) {
      this.state.currentTime = time;
    }
  }

  nextTrack(): void {
    if (this.playlist.length > 0) {
      this.currentTrackIndex =
        (this.currentTrackIndex + 1) % this.playlist.length;
      this.setTrack(this.playlist[this.currentTrackIndex]);
    }
  }

  prevTrack(): void {
    if (this.playlist.length > 0) {
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + this.playlist.length) %
        this.playlist.length;
      this.setTrack(this.playlist[this.currentTrackIndex]);
    }
  }
}
