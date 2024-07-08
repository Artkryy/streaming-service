import { renderComponent } from "../../core/render";
// import { Playlist } from "../../interfaces/Playlist";
import { Song } from "../../interfaces/Song";
import { User } from "../../interfaces/User";
import TracksModel from "../../Tracks/Model/tracks-model";
import Track from "../../Tracks/track/track";
import PopupService from "../../utils/popup-serv";

export class TrackPresenter {
  constructor(
    private trackData: Song,
    private tracksModel: TracksModel,
    private playlistData: Song[],
    private user: User,
  ) {}

  render(container: HTMLElement): void {
    const trackComponent = new Track(this.trackData, this.tracksModel, this.playlistData, this, this.user);
    renderComponent(trackComponent, container);
    trackComponent.addEventListeners();
  }

  getTrack(): Song[] {
    return this.tracksModel.getTracks();
  }

  updateTrack(trackId: number, updatedTrack: Song): void {
    this.tracksModel.updateTrack(trackId, updatedTrack)
  }

  openPopupForTrack(): void {
    PopupService.openPopupForTrack(this.trackData.id);
  }


}
