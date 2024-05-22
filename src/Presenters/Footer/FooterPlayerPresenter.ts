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
  private audioElement: HTMLAudioElement;
  private audioSource: MediaElementAudioSourceNode;

  constructor(
    private trackData: Song,
    model: PlayerModel,
    view: PlayerView,
  ) {
    this.model = model;
    this.view = view;
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    this.audioElement = new Audio();
    this.audioSource = this.audioContext.createMediaElementSource(
      this.audioElement,
    );
    this.audioElement.addEventListener(
      "timeupdate",
      this.updateTime.bind(this),
    );
    this.audioElement.addEventListener("ended", this.nextTrack.bind(this));
    this.view.setPresenter(this);
    this.loadData(this.trackData);
  }

  private async loadData(trackData: Song) {
    this.model.setTrack(trackData);
    await this.loadTrack(trackData.path);
    this.view.update(this.model.getState());
    console.log(this.audioSource);
  }

  render(container: HTMLElement): void {
    const trackComponent = new FooterPlayer(this.trackData);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }

  private async loadTrack(url: string) {
    try {
      const response = await fetch(`${API}${url}`, {
        method: 'GET',
        headers: {
          "Content-Type": 'audio/mpeg'
        }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('ОШИБКА!')
      }
      const arrayBuffer = await response.arrayBuffer();
      await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioElement.src = URL.createObjectURL(new Blob([arrayBuffer]));
    } catch (error) {
      console.error(error)
    }
  }

  play() {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
    this.model.play();
    this.audioElement.play();
    this.view.update(this.model.getState());
  }

  pause() {
    this.model.pause();
    this.audioElement.pause();
    this.view.update(this.model.getState());
  }

  updateTime() {
    this.model.updateTime(this.audioElement.currentTime);
    this.view.update(this.model.getState());
  }

  nextTrack() {
    console.log(this.audioContext);
    console.log("NEXT");
  }

  getCurrentState(): PlayerState {
    return this.model.getState();
  }
}
