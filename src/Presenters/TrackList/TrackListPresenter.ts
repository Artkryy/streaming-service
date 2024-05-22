import TracksModel from "../../Tracks/Model/tracks-model";
import { Playlist } from "../../interfaces/Playlist";
import { Song } from "../../interfaces/Song";
import PopupService from "../../utils/popup-serv";
import { TrackPresenter } from "../Track/TrackPresenter";

export default class TrackListPresenter {
  constructor(private tracksData: TracksModel, private playlistData: Playlist) {}

  render(container: HTMLElement): void {
    const tracks = this.tracksData.getTracks();
    container.innerHTML = "";
    tracks.forEach((track) => {
      const trackPresenter = new TrackPresenter(track, this.tracksData, this.playlistData);
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
          this.playlistData
        );
        trackPresenter.render(trackElement);
      }
    }
  }

  handleEllipseClick(trackId: number): void {
    PopupService.openPopupForTrack(trackId);
  }
}
