import { renderComponent } from "../core/render";
import { Song } from "../interfaces/Song";
import TracksModel from "../Tracks/Model/tracks-model";
import Track from "../Tracks/track/track";
import PopupService from "../utils/popup-serv";

export class TrackPresenter {
  constructor(
    private playlistData: Song,
    private tracksModel: TracksModel,
  ) {}

  render(container: HTMLElement): void {
    const trackComponent = new Track(this.playlistData, this.tracksModel, this);
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
    PopupService.openPopupForTrack(this.playlistData.id);
  }
}
