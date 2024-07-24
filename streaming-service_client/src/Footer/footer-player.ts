import { token } from "..";
import { Component } from "../Component/component";
import { handleLikeSong, handleUnlikeSong } from "../api/api";
import { Song } from "../interfaces/Song";
import { User } from "../interfaces/User";
import { PlayerModel } from "./Model/footer-player-model";
import FooterPlayerControls from "./footer-player-controls";
import FooterPlayerTrack from "./footer-player-track";

export default class FooterPlayer extends Component {
  private trackComponent: FooterPlayerTrack;
  private controlsComponent: FooterPlayerControls;

  constructor(
    private song: Song,
    private user: User,
  ) {
    super();
    this.trackComponent = new FooterPlayerTrack(this.song, this.user);
    this.controlsComponent = new FooterPlayerControls(
      new PlayerModel().getState(),
    );
  }

  getTemplate(): string {
    return `
    <div class="player flex">
      ${this.trackComponent.getTemplate()}
      ${this.controlsComponent.getTemplate()}
    </div>`;
  }

  private async handleLikeBtnClick(): Promise<void> {
    const index = this.song.likes.findIndex((user) => user.id === this.user.id);
    if (index === -1) {
      if (token) await handleLikeSong(token, this.song.id);
    } else {
      if (token) await handleUnlikeSong(token, this.song.id);
    }
  }

  addEventListeners(): void {
    const likeBtn = this.element?.querySelector(".player__btn__like");
    likeBtn?.addEventListener("click", (event: Event) => {
      this.handleLikeBtnClick();
      likeBtn.classList.toggle("like-btn--active");
      event.stopImmediatePropagation();
    });
    this.trackComponent.addEventListeners();
    this.controlsComponent.addEventListeners();
  }
}
