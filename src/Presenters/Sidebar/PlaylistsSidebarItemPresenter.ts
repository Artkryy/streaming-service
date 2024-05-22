import { renderComponent } from "../../core/render";
import { Playlist } from "../../interfaces/Playlist";
import PlaylistsSidebarItem from "../../SideBar/playlist-sidebar-item/playlist-sidebar-item";

export class PlaylistsSideBarItemPresenter {
  constructor(private playlistData: Playlist) {}

  render(container: HTMLElement): void {
    const trackComponent = new PlaylistsSidebarItem(this.playlistData);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }
}
