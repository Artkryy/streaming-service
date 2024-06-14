import { ScreenState, switchScreen, token, username } from "../..";
import { Component } from "../../Component/component";
// import { addPlaylist } from "../../api/api";
import { Playlist } from "../../interfaces/Playlist";

export default class PlaylistItem extends Component {
  constructor(private data: Playlist) {
    super();
    this.data = data;
  }

  getTemplate(): string {
    return `<li class="playlist__item">
  <picture>
    <source srcset="./img/playlists__360%20(${this.data.id}).jpg" media="(max-width: 576px)">
    <source srcset="./img/playlists__1440%20(${this.data.id}).jpg" media="(max-width: 1440px)"><img class="playlist__img" src="./img/playlists%20(${this.data.id}).jpg" alt="${this.data.name}">
  </picture>
  <div class="playlist__content">
    <h3 class="playlist__h3">
      <a class="playlist__h3__link" href="/">${this.data.name}</a>
    </h3><span class="playlist__count">${this.data.songs?.length} треков</span>
  </div>
</li>`;
  }

  addEventListeners(): void {
    this.element?.addEventListener("click", (event: Event) => {
      event.preventDefault();
      if (token && username)
        switchScreen(ScreenState.Playlist, token, username, this.data.songs);
    });
  }
}
