import { Component } from "../../Component/component";
import { Playlist } from "../../interfaces/Playlist";

export default class PlaylistModalItem extends Component {
  constructor(private data: Playlist) {
    super();
    this.data = data;
  }

  getTemplate(): string {
    return `<div class="playlists-modal__playlist">
                <img src="img/tracks%20(${this.data.id}).jpg" alt="${this.data.name}" class="playlists-modal__playlist__image"/>
                <div class="playlists-modal__playlist__title">${this.data.name}</div>
                <div class="playlists-modal__playlist__info">${this.data.songs?.length} песен</div>
            </div>
            `;
  }

  addEventListeners(): void {}
}
