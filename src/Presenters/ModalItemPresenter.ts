import PlaylistModalItem from "../Playlist/playlist-modal-item/playlist-modal-item";
import { renderComponent } from "../core/render";
import { Playlist } from "../interfaces/Playlist";

export class ModalItemPresenter {
  constructor(private playlistData: Playlist) {}

  render(container: HTMLElement): void {
    const modalComponent = new PlaylistModalItem(this.playlistData);
    renderComponent(modalComponent, container);
    modalComponent.addEventListeners();
  }
}
