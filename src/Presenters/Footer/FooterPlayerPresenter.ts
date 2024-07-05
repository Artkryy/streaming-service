import { API } from "../..";
import { renderComponent } from "../../core/render";
import FooterPlayer from "../../Footer/footer-player";
import { PlayerModel } from "../../Footer/Model/footer-player-model";
import { PlayerView } from "../../Footer/Model/footer-player-view";
import { PlayerState } from "../../interfaces/Player";
import { Song } from "../../interfaces/Song";

export class FooterPlayerPresenter {
  private model: PlayerModel;
  private view: PlayerView;
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private audioBufferSource: AudioBufferSourceNode | null = null;
  private currentBuffer: AudioBuffer | null = null;
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private updateTimeInterval: number | null = null;
  private currentTrackIndex: number = 0;

  constructor(
    private trackData: Song,
    private playlistData: Song[],
    model: PlayerModel,
    view: PlayerView,
  ) {
    this.model = model;
    this.view = view;
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.view.setPresenter(this);
    this.model.setPlaylist(this.playlistData);
    this.loadData(this.trackData);
  }

  private async loadData(trackData: Song | undefined) {
    if (trackData) {
      this.model.setTrack(trackData);
      await this.loadTrack(trackData.path);
      const duration = this.currentBuffer ? this.currentBuffer.duration : 0;
      this.model.setDuration(duration);
      this.view.update(this.model.getState(), 0);
    }
  }

  render(container: HTMLElement): void {
    const trackComponent = new FooterPlayer(this.trackData);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }

  private async loadTrack(url: string) {
    try {
      const response = await fetch(`${API}${url}`);
      if (!response.ok) {
        throw new Error("ОШИБКА!");
      }
      const arrayBuffer = await response.arrayBuffer();
      this.currentBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error(error);
    }
  }

  private createAudioBufferSource(startTime: number) {
    this.audioBufferSource = this.audioContext.createBufferSource();
    this.audioBufferSource.buffer = this.currentBuffer;
    this.audioBufferSource.connect(this.gainNode);
    this.audioBufferSource.start(0, startTime);
    this.startTime = this.audioContext.currentTime - startTime;

    this.audioBufferSource.addEventListener("ended", () => this.nextTrack());
  }

  play() {
    if (!this.currentBuffer) {
      console.error("No audio Buffer loaded");
      return;
    }
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
    this.createAudioBufferSource(this.elapsedTime);
    this.model.play(this.elapsedTime);
    this.updateTimeInterval = window.setInterval(() => {
      this.updateTime();
    }, 1000);
    this.view.update(this.model.getState(), this.elapsedTime);
  }

  pause() {
    if (this.audioBufferSource) {
      this.audioBufferSource.stop();
      this.audioBufferSource.disconnect();
      this.audioBufferSource = null;
      this.elapsedTime = this.audioContext.currentTime - this.startTime;
      this.model.pause();
      if (this.updateTimeInterval) {
        clearInterval(this.updateTimeInterval);
        this.updateTimeInterval = null;
      }
      this.view.update(this.model.getState(), this.elapsedTime);
    }
  }

  updateTime() {
    const currentTime = this.audioContext.currentTime;
    this.model.updateTime(currentTime - this.startTime);
    this.view.update(this.model.getState(), currentTime - this.startTime);
  }

  async nextTrack() {
    if (this.updateTimeInterval) {
      clearInterval(this.updateTimeInterval);
      this.pause();
    }
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.playlistData.length;
    const nextTrack = this.playlistData[this.currentTrackIndex];
    await this.loadData(nextTrack);
    this.elapsedTime = 0;
    if (this.model.getState().isPlaying) {
      this.play();
    }
  }

  async prevTrack() {
    if (this.updateTimeInterval) {
      clearInterval(this.updateTimeInterval);
    }
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.playlistData.length) % this.playlistData.length;
    const previousTrack = this.playlistData[this.currentTrackIndex];
    await this.loadData(previousTrack);
    this.elapsedTime = 0;
    if (this.model.getState().isPlaying) {
      this.play();
    }
  }

  setVolume(volume: number) {
    this.gainNode.gain.value = volume;
  }

  seek(time: number) {
    // if (this.audioBufferSource) {
    //   this.audioBufferSource.stop();
    //   this.audioBufferSource.disconnect();
    //   this.elapsedTime = time;
    //   this.createAudioBufferSource(this.elapsedTime);
    //   this.model.seek(time);
    //   this.view.update(this.model.getState(), this.elapsedTime)
    // }
    if (!this.currentBuffer) {
      console.error("No audio Buffer Loaded");
      return;
    }
    const wasPlaying = this.model.getState().isPlaying;
    this.pause();
    this.elapsedTime = Math.max(0, Math.min(time, this.currentBuffer.duration));
    if (wasPlaying) {
      this.play();
    } else {
      this.view.update(this.model.getState(), this.elapsedTime)
    }
  }

  getCurrentState(): PlayerState {
    return this.model.getState();
  }
}
