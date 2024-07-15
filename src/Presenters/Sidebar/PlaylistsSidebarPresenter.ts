import { Playlist } from "../../interfaces/Playlist";
import { PlaylistsSideBarItemPresenter } from "./PlaylistsSidebarItemPresenter";

export class PlaylistsSideBarPresenter {
  private token: string;
  private username: string;
  constructor(private tracksData: Playlist[], token: string, username: string) {
    this.token = token
    this.username = username
  }

  render(container: HTMLElement): void {
    this.tracksData.forEach((trackData) => {
      const trackPresenter = new PlaylistsSideBarItemPresenter(trackData, this.token, this.username);
      trackPresenter.render(container);
    });
  }
}
