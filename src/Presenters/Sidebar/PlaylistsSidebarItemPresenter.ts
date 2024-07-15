import { renderComponent } from "../../core/render";
import { Playlist } from "../../interfaces/Playlist";
import PlaylistsSidebarItem from "../../SideBar/playlist-sidebar-item/playlist-sidebar-item";

export class PlaylistsSideBarItemPresenter {
  private token: string;
  private username: string;
  constructor(private playlistData: Playlist, token: string, username: string) {
    this.token = token
    this.username = username
  }

  render(container: HTMLElement): void {
    const trackComponent = new PlaylistsSidebarItem(this.playlistData, this.token, this.username);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }
}
