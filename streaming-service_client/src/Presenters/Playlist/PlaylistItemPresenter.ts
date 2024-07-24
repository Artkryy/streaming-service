import { renderComponent } from "../../core/render";
import { Playlist } from "../../interfaces/Playlist";
import PlaylistItem from "../../Playlist/playlist-item/playlist-item";

export class PlaylistItemPresenter {
  constructor(private playlistData: Playlist) {
  }

  render(container: HTMLElement): void {
    const trackComponent = new PlaylistItem(this.playlistData);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }
}
