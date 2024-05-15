import { Playlist } from "../interfaces/Playlist";
import { ModalItemPresenter } from "./ModalItemPresenter";

export default class ModalPresenter {
  constructor(private playlistData: Playlist[]) {}

  render(container: HTMLElement): void {
    this.playlistData.forEach((playlistData) => {
      const modalPresenter = new ModalItemPresenter(playlistData);
      modalPresenter.render(container);
    });
  }
}
