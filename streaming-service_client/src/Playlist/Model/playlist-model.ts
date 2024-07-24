import { Playlist } from "../../interfaces/Playlist";

export enum UserAction {
  ADD,
  UPDATE,
  REMOVE,
}

export default class PlaylistModel {
  private playlists: Playlist[] = [];

  getPlaylists(filter?: string): Playlist[] {
    if (!filter) {
      return this.playlists;
    }

    const normalizedFilter = filter.toLowerCase().trim();

    return this.playlists.filter((playlist) => {
      return playlist.name.toLowerCase().includes(normalizedFilter)
    });
  }

  addPlaylist(playlist: Playlist): void {
    this.playlists.push(playlist);
  }

  updatePlaylist(playlistId: number, updatedPlaylist: Playlist): void {
    const index = this.playlists.findIndex((playlist) => playlist.id === playlistId);
    if (index !== -1) {
      this.playlists[index] = updatedPlaylist
    }
  }

  removePlaylist(playlistId: number) {
    this.playlists = this.playlists.filter((playlist) => playlist.id !== playlistId);
  }

  handleUserAction(action: UserAction, playlistId: number, playlist?: Playlist): void {
    switch (action) {
      case UserAction.ADD:
        if (playlist) {
          this.addPlaylist(playlist);
        }
        break;
      case UserAction.UPDATE:
        if (playlist) {
          this.updatePlaylist(playlistId, playlist);
        }
        break;
      case UserAction.REMOVE:
        this.removePlaylist(playlistId);
        break;
      default:
        break;
    }
  }
}
