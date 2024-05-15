import TracksModel from "../Tracks/Model/tracks-model";

export default class SearchPresenter {
  private searchCallback?: (filter: string) => void;
  private tracksModel?: TracksModel;

  constructor() {}

  setSearchCallback(callback: (filter: string) => void): void {
    this.searchCallback = callback;
  }

  setTracksPresenter(presenter: TracksModel): void {
    this.tracksModel = presenter;
  }

  handleSearchInputChange(filter: string): void {
    if (this.searchCallback) {
      this.searchCallback(filter);
    }
    if (this.tracksModel) {
      this.tracksModel.getTracks(filter)
    }
  }
}
