import { ScreenState, switchScreen } from "../..";
import { Component } from "../../Component/component";
import { Playlist } from "../../interfaces/Playlist";

export default class PlaylistsSidebarItem extends Component {
  constructor(private data: Playlist) {
    super();
    this.data = data;
  }

  getTemplate(): string {
    return `<li class="aside__item">
              <button class="aside__btn">${this.data.name}</button>
            </li>`;
  }

  addEventListeners(): void {
    this.element?.addEventListener('click', () => {
      switchScreen(ScreenState.Playlist, this.data.songs)
    })
  }
}
