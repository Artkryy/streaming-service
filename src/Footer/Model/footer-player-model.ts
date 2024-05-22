import { PlayerState } from "../../interfaces/Player";
import { Song } from "../../interfaces/Song";
import { formatDuration } from "../../utils/utils";

export class PlayerModel {
  private state: PlayerState;

  constructor(track: Song) {
    this.state = {
      currentTrack: track,
      isPlaying: false,
      currentTime: 0,
      duration: `${track.duration}`,
    };
    track = track
  }

  setTrack(track: Song) {
    this.state.currentTrack = track;
    this.state.currentTime = 0;
    this.state.duration = `${formatDuration(track.duration)}`;
  }

  play() {
    this.state.isPlaying = true;
  }

  pause() {
    this.state.isPlaying = false;
  }

  updateTime(time: number) {
    this.state.currentTime = time;
  }

  getState() {
    return this.state;
  }
}
