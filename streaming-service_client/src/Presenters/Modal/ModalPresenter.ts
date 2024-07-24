import { Playlist } from "../../interfaces/Playlist";
import { Song } from "../../interfaces/Song";
import { ModalItemPresenter } from "./ModalItemPresenter";

export default class ModalPresenter {
  constructor(private playlistData: Playlist[], private trackData: Song) {}

  render(container: HTMLElement): void {
    this.playlistData.forEach((playlistData) => {
      const modalPresenter = new ModalItemPresenter(playlistData, this.trackData);
      modalPresenter.render(container);
    });
  }


}
