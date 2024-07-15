import PlaylistModalItem from "../../Playlist/playlist-modal-item/playlist-modal-item";
import { renderComponent } from "../../core/render";
import { Playlist } from "../../interfaces/Playlist";
import { Song } from "../../interfaces/Song";

export class ModalItemPresenter {
  constructor(private playlistData: Playlist, private trackData: Song) {}

  render(container: HTMLElement): void {
    const modalComponent = new PlaylistModalItem(this.playlistData, this.trackData);
    renderComponent(modalComponent, container);
    modalComponent.addEventListeners();
  }
}
