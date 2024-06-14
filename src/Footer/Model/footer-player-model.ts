import { PlayerState } from "../../interfaces/Player";
import { Song } from "../../interfaces/Song";
// import { formatDuration } from "../../utils/utils";

export class PlayerModel {
  private state: PlayerState = {
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    duration: 0
  }

  // constructor(track: Song) {
  //   this.state = {
  //     currentTrack: track,
  //     isPlaying: false,
  //     currentTime: 0,
  //     duration: `${track.duration}`,
  //   };
  //   track = track
  // }

  getState() {
    return this.state;
  }

  setState(newState: PlayerState): void {
    this.state = newState;
  }

  setTrack(track: Song): void {
    this.state.currentTrack = track;
    this.state.duration = track.duration;
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

}
