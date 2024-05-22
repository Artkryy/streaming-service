import { Playlist } from "../../interfaces/Playlist";
import { PlaylistItemPresenter } from "./PlaylistItemPresenter";

export class PlaylistListPresenter {
  constructor(private tracksData: Playlist[]) {}

  render(container: HTMLElement): void {
    this.tracksData.forEach((trackData) => {
      const trackPresenter = new PlaylistItemPresenter(trackData);
      trackPresenter.render(container);
    });
  }
}
