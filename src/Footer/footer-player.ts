import { Component } from "../Component/component";
import { Song } from "../interfaces/Song";
import { PlayerModel } from "./Model/footer-player-model";
import FooterPlayerControls from "./footer-player-controls";
import FooterPlayerTrack from "./footer-player-track";

export default class FooterPlayer extends Component {
  private trackComponent: FooterPlayerTrack;
  private controlsComponent: FooterPlayerControls;

  constructor(private song: Song) {
    super();
    this.trackComponent = new FooterPlayerTrack(this.song);
    this.controlsComponent = new FooterPlayerControls(new PlayerModel(this.song).getState());
  }

  getTemplate(): string {
    return `
    <div class="player flex">
    ${this.trackComponent.getTemplate()}
    ${this.controlsComponent.getTemplate()}
    </div>`;
  }

  addEventListeners(): void {
    this.trackComponent.addEventListeners();
    this.controlsComponent.addEventListeners();
  }
}
