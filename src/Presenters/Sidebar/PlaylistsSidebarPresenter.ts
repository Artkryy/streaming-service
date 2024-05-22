import { Playlist } from "../../interfaces/Playlist";
import { PlaylistsSideBarItemPresenter } from "./PlaylistsSidebarItemPresenter";

export class PlaylistsSideBarPresenter {
  constructor(private tracksData: Playlist[]) {}

  render(container: HTMLElement): void {
    this.tracksData.forEach((trackData) => {
      const trackPresenter = new PlaylistsSideBarItemPresenter(trackData);
      trackPresenter.render(container);
    });
  }
}
