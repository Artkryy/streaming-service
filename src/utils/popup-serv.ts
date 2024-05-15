export class PopupService {
  private static instance: PopupService;
  private previousTrackId: number | null = null;

  private constructor() {}

  public static getInstance(): PopupService {
    if (!PopupService.instance) {
      PopupService.instance = new PopupService();
    }
    return PopupService.instance;
  }

  public openPopupForTrack(trackId: number): void {
    this.closePopupForPreviousTrack();

    const trackContainer = document.getElementById(`track-${trackId}`);
    if (trackContainer) {
      trackContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="track__dropdown">
      <button class="track__add-btn">Добавить в плейлист</button>
      <button class="track__delete-btn">Удалить из плейлиста</button>
    </div>`,
      );
      const popup = trackContainer?.querySelector(".track__dropdown");
      popup?.classList.add("dropdown--active");
    }

    this.previousTrackId = trackId;

    document.addEventListener("click", this.handleDocumentClick);
  }

  public handleDocumentClick = (event: MouseEvent): void => {
    const clickedDrop = (event.target as HTMLElement).closest(
      ".tracks__item__drop",
    );
    if (!clickedDrop) {
      this.closePopupForPreviousTrack();
    }
  };

  public closePopupForPreviousTrack(): void {
    if (this.previousTrackId) {
      const previousTrackContainer = document.getElementById(
        `track-${this.previousTrackId}`,
      );
      const popup = previousTrackContainer?.querySelector(".track__dropdown");
      popup?.classList.remove("dropdown--active");
      popup?.remove();
      this.previousTrackId = null;
    }
  }
}

const popupServiceInstance = PopupService.getInstance();
export default popupServiceInstance;
