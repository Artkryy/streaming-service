import { Song } from "../../interfaces/Song";

export enum UserAction {
  ADD,
  UPDATE,
  REMOVE,
}

export default class TracksModel {
  private tracks: Song[] = [];

  getTracks(filter?: string): Song[] {
    if (!filter) {
      return this.tracks;
    }

    const normalizedFilter = filter.toLowerCase().trim();

    return this.tracks.filter((track) => {
      const titleMatch = track.name.toLowerCase().includes(normalizedFilter);
      const artistMatch = track.artist.name
        .toLowerCase()
        .includes(normalizedFilter);
      const albumMatch = track.album.name
        .toLowerCase()
        .includes(normalizedFilter);

      return titleMatch || artistMatch || albumMatch;
    });
  }

  addTrack(track: Song): void {
    this.tracks.push(track);
  }

  updateTrack(trackId: number, updatedTrack: Song): void {
    this.tracks[trackId] = updatedTrack;
  }

  removeTrack(trackId: number) {
    this.tracks = this.tracks.filter((track) => track.id !== trackId);
  }

  handleUserAction(
    action: UserAction,
    trackId: number,
    track?: Song,
  ): void {
    switch (action) {
      case UserAction.ADD:
        if (track) {
          this.addTrack(track);
        }
        break;
      case UserAction.UPDATE:
        if (track) {
          this.updateTrack(trackId, track);
        }
        break;
      case UserAction.REMOVE:
        this.removeTrack(trackId);
        break;
      default:
        break;
    }
  }
}
