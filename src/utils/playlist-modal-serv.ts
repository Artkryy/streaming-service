import { token, username } from "..";
import ModalPresenter from "../Presenters/Modal/ModalPresenter";
import { getUserPlaylists } from "../api/api";
import { Song } from "../interfaces/Song";

class PlaylistModalService {
  private static instance: PlaylistModalService;
  currentTrack: Song | null = null;

  private constructor() {}

  public static getInstance(): PlaylistModalService {
    if (!PlaylistModalService.instance) {
      PlaylistModalService.instance = new PlaylistModalService();
    }
    return PlaylistModalService.instance;
  }

  public async openModalForTrack(trackData: Song): Promise<void> {
    this.closeModalForPreviousTrack();

    const body = document.body;
    if (body) {
      body.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="playlists-modal">
        <div class="playlists-modal__title">Добавить в плейлист</div>
        <div class="playlists-modal__playlist_content"></div>
        <div class="playlists-modal__footer">
          <div class="playlists-modal__close-btn">Отменить</div>
        </div>
      </div>
      `,
      );
      const modal = body.querySelector(".playlists-modal");
      if (modal instanceof HTMLElement) {
        modal.style.display = "block";
      }

      if (token && username) {
        const playlists = await getUserPlaylists(username, token);

        const modalPresenter = new ModalPresenter(playlists, trackData);
        const modalContainer = document.querySelector(
          ".playlists-modal__playlist_content",
        );
        if (modalContainer instanceof HTMLElement) {
          modalPresenter.render(modalContainer);
        }
      }
    }

    this.currentTrack = trackData;

    const closeBtn = document.querySelector(".playlists-modal__close-btn");
    closeBtn?.addEventListener("click", () => {
      this.closeModalForPreviousTrack();
    });
  }

  public closeModalForPreviousTrack(): void {
    if (this.currentTrack) {
      const body = document.body
      const popup = body.querySelector(".playlists-modal");
      popup?.remove();
      this.currentTrack = null;
    }
  }
}

export default PlaylistModalService.getInstance();
