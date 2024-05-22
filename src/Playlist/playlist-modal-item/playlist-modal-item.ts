import { token } from "../..";
import { Component } from "../../Component/component";
import { addTrackForPlaylist } from "../../api/api";
import { Playlist } from "../../interfaces/Playlist";
import { Song } from "../../interfaces/Song";
import playlistModalServ from "../../utils/playlist-modal-serv";

export default class PlaylistModalItem extends Component {
  constructor(
    private data: Playlist,
    private trackData: Song
  ) {
    super();
    this.data = data;
    this.trackData = trackData;
  }

  getTemplate(): string {
    return `<div class="playlists-modal__playlist">
                <img src="img/tracks%20(${this.data.id}).jpg" alt="${this.data.name}" class="playlists-modal__playlist__image"/>
                <div class="playlists-modal__playlist__title">${this.data.name}</div>
                <div class="playlists-modal__playlist__info">${this.data.songs?.length} песен</div>
            </div>
            `;
  }

  addEventListeners(): void {
    this.element?.addEventListener('click', async () => {
      if (token) {
        await addTrackForPlaylist(this.trackData.id, this.data.id, token)
        playlistModalServ.closeModalForPreviousTrack()
      }
    })
  }
}
