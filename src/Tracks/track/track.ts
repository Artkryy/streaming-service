import { Component } from "../../Component/component";
import { TrackPresenter } from "../../Presenters/TrackPresenter";
import { Song } from "../../interfaces/Song";
import { User } from "../../interfaces/User";
import playlistModalServ from "../../utils/playlist-modal-serv";
import popupServiceInstance from "../../utils/popup-serv";
import TracksModel, { UserAction } from "../Model/tracks-model";

export default class Track extends Component {
  constructor(
    private data: Song,
    private updateTrackData: TracksModel,
    private trackPresenter: TrackPresenter,
  ) {
    super();
    this.data = data;
  }

  getTemplate(): string {
    return `<li class="tracks__item flex" data-track-id='${this.data.id}'>
  <div class="tracks__item__number">${this.data.id}</div>
  <div class="tracks__item__name"><img class="track__img" src=${this.data.image} alt=${this.data.name}>
    <div class="track__content">
      <h3 class="track__name"><a class="track__name__link" href="#">${this.data.name}</a></h3><span class="track__author">${this.data.artist.name}</span>
    </div>
  </div>
  <div class="tracks__item__albom">${this.data.album.name}</div>
  <div class="tracks__item__data flex"><span class="data__text">${this.data.createdAt}</span>
    <button class="track__like-btn"><svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z" fill="#FC6D3E"/>
    </svg>
    </button>
  </div>
  <time class="tracks__item__time">${this.data.duration}</time>
  <div class="tracks__item__drop" id='track-${this.data.id}'>
    <button class="track__btn-dropdown"><svg width="23" height="4" viewBox="0 0 23 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="2" r="2" fill="#C4C4C4"/>
    <circle cx="11.5" cy="2" r="2" fill="#C4C4C4"/>
    <circle cx="21" cy="2" r="2" fill="#C4C4C4"/>
    </svg>
    </button>
  </div>
</li>`;
  }

  addEventListeners(): void {
    const likeBtn = this.element?.querySelector(".track__like-btn");
    likeBtn?.addEventListener("click", () => {
      this.handleLikeBtnClick();
      likeBtn.classList.toggle("like-btn--active");
    });

    const btnDropdown = this.element?.querySelector(".track__btn-dropdown");
    btnDropdown?.addEventListener("click", () => {
      this.handleCircleClick();
    });
  }

  private handleCircleClick(): void {
    this.trackPresenter.openPopupForTrack();

    const deleteBtn = this.element?.querySelector(".track__delete-btn");
    deleteBtn?.addEventListener("click", () => {
      this.handleDeleteClick(this.data.id);
      this.removeElement()
      popupServiceInstance.closePopupForPreviousTrack()
    });

    const addBtn = this.element?.querySelector('.track__add-btn');
    addBtn?.addEventListener('click', () => {
      playlistModalServ.openModalForTrack(this.data)
      popupServiceInstance.closePopupForPreviousTrack()

      // if (playlistModalServ) {
      //   console.log(this.data);
      // }
    })
  }

  private handleDeleteClick(trackId: number): void {
    this.updateTrackData.handleUserAction(UserAction.REMOVE, trackId)
  }

  private handleLikeBtnClick(): void {
    const currentUser: User = {
      id: 2,
      firstName: "Max",
      lastName: "Star",
      username: "Max",
    };
    const index = this.data.likes.findIndex(
      (user) => user.id === currentUser.id,
    );

    if (index === -1) {
      this.data.likes.push(currentUser);
    } else {
      this.data.likes.splice(index, 1);
    }
    this.updateTrackData;
  }
}
