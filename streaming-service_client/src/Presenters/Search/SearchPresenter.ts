import { main, renderTrackList, token } from "../..";
import PlaylistModel from "../../Playlist/Model/playlist-model";
import Search from "../../Search/search";
import TracksModel from "../../Tracks/Model/tracks-model";
import { renderComponent } from "../../core/render";

export default class SearchPresenter {
  private tracksModel?: TracksModel;
  private playlistModel?: PlaylistModel;
  private searchCallback?: (filter: string) => void;

  constructor(tracksModel: TracksModel, playlistModel: PlaylistModel) {
    this.tracksModel = tracksModel;
    this.playlistModel = playlistModel;
  }

  render(container: HTMLElement): void {
    const searchComponent = new Search();
    renderComponent(searchComponent, container);
    searchComponent.addEventListeners();
    searchComponent.setSearchInputChangeHandler(
      this.handleSearchInputChange.bind(this),
    );
  }

  setSearchCallback(callback: (filter: string) => void): void {
    this.searchCallback = callback;
  }

  private handleSearchInputChange(filter: string): void {
    if (this.searchCallback) {
      this.searchCallback(filter);
    }
    if (this.tracksModel) {
      const filteredTracks = this.tracksModel.getTracks(filter);
      if (main instanceof HTMLElement && token) {
        renderTrackList(filteredTracks, token);
        console.log(filteredTracks);
      }
    }

    if (this.playlistModel) {
      const filteredPlaylists = this.playlistModel.getPlaylists(filter);
      console.log(filteredPlaylists);
    }
  }
}
