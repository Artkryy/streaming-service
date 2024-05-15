import { randomPlaylists } from "..";
import PlaylistsModel from "../Playlist/Model/playlists-model";
import ModalPresenter from "../Presenters/ModalPresenter";
import { Song } from "../interfaces/Song";

class PlaylistModalService {
  private static instance: PlaylistModalService;
  private playlistsModel: PlaylistsModel;
  currentTrack: Song | null = null;

  private constructor() {
    this.playlistsModel = new PlaylistsModel();
  }

  public static getInstance(): PlaylistModalService {
    if (!PlaylistModalService.instance) {
      PlaylistModalService.instance = new PlaylistModalService();
    }
    return PlaylistModalService.instance;
  }

  public openModalForTrack(trackData: Song): void {
    this.closeModalForPreviousTrack()

    const playlists = this.playlistsModel.fetchPlaylists()
    console.log(playlists);

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

      const modalPresenter = new ModalPresenter(randomPlaylists);
      const modalContainer = document.querySelector(
        ".playlists-modal__playlist_content",
      );
      if (modalContainer instanceof HTMLElement) {
        modalPresenter.render(modalContainer);
      }

        // document.addEventListener("click", this.handleDocumentClick);
    }

    this.currentTrack = trackData;
    console.log(this.currentTrack);
    console.log(this);

    const closeBtn = document.querySelector(".playlists-modal__close-btn");
    closeBtn?.addEventListener('click', () => {
      this.closeModalForPreviousTrack()
    })

  }

  // public handleDocumentClick = (event: MouseEvent): void => {
  //   const clickedDrop = (event.target as HTMLElement).closest(
  //     ".playlists-modal",
  //   );
  //   if (!clickedDrop) {
  //     this.closeModalForPreviousTrack();
  //   }
  // };

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
