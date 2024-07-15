import { Component } from "../../Component/component";
import { PlaylistListPresenter } from "../../Presenters/Playlist/PlaylistsListPresenter";
import { Playlist } from "../../interfaces/Playlist";

export default class PlaylistList extends Component {
  constructor(private allPlaylists: Playlist[]) {
    super();
  }

  getTemplate(): string {
    return `
    <section class="playlist section">
      <h2 class="playlist__h2">Плейлисты</h2>
      <ul class="playlist__list"></ul>
    </section>`;
  }

  addPlaylists(): void {
    const playlistListPresenter = new PlaylistListPresenter(this.allPlaylists);
    const playlistListContainer = document.querySelector(".playlist__list");
    if (playlistListContainer instanceof HTMLElement) {
      playlistListPresenter.render(playlistListContainer);
    }
  }

  addEventListeners(): void {}
}
