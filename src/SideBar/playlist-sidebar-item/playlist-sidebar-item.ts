import { ScreenState, switchScreen } from "../..";
import { Component } from "../../Component/component";
import { Playlist } from "../../interfaces/Playlist";

export default class PlaylistsSidebarItem extends Component {
  private token: string;
  private username: string;

  constructor(private data: Playlist, token: string, username: string) {
    super();
    this.data = data;
    this.token = token
    this.username = username
  }

  getTemplate(): string {
    return `<li class="aside__item">
              <button class="aside__btn">${this.data.name}</button>
            </li>`;
  }

  addEventListeners(): void {
    this.element?.addEventListener("click", () => {
      switchScreen(ScreenState.Playlist, this.token, this.username, this.data.songs);
    });
  }
}
