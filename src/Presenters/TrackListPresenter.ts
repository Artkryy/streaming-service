import TracksModel from "../Tracks/Model/tracks-model";
import { Song } from "../interfaces/Song";
import PopupService from "../utils/popup-serv";
import { TrackPresenter } from "./TrackPresenter";

export default class TrackListPresenter {
  constructor(private tracksData: TracksModel) {}

  render(container: HTMLElement): void {
    const tracks = this.tracksData.getTracks();
    container.innerHTML = "";
    tracks.forEach((track) => {
      const trackPresenter = new TrackPresenter(track, this.tracksData);
      trackPresenter.render(container);
    });
  }

  updateTrackData(updatedTrackData: Song): void {
    const index = this.tracksData
      .getTracks()
      .findIndex((track) => track.id === updatedTrackData.id);
    if (index !== -1) {
      const trackElement = document.querySelector(
        `[data-track-id='${updatedTrackData.id}']`,
      );
      this.tracksData.updateTrack(updatedTrackData.id, updatedTrackData);
      if (trackElement instanceof HTMLElement) {
        const trackPresenter = new TrackPresenter(
          updatedTrackData,
          this.tracksData,
        );
        trackPresenter.render(trackElement);
      }
    }
  }

  handleEllipseClick(trackId: number): void {
    PopupService.openPopupForTrack(trackId);
  }
}
