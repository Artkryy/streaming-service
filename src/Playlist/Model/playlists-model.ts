import axios from "axios";
import { Playlist } from "../../interfaces/Playlist";

const PORT = 'http://localhost:3000'

export default class PlaylistsModel {
  private playlists: Playlist[] = [];

  public async fetchPlaylists(): Promise<void> {
    try {
      const response = await axios.get(`${PORT}/api/users/playlists`)
      // {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization:
      //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFydEtyeSIsImlkIjoyLCJpYXQiOjE3MTU3NzAzNTcsImV4cCI6MTcxNjM3NTE1N30.fVNFP69c5Jzh_aWuAJOYxcU9E-pVHYgc5U6piZWoNG4",
      //   },
      // });
      console.log(response.data);
      this.playlists = response.data;
    } catch (error) {
      console.error("Ошибка", error);
    }
  }

  public getPlaylists(): Playlist[] {
    return this.playlists;
  }
}
