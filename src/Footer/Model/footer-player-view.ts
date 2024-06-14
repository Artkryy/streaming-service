import { FooterPlayerPresenter } from "../../Presenters/Footer/FooterPlayerPresenter";
import { PlayerState } from "../../interfaces/Player";
import { formatDurationForPlayer } from "../../utils/utils";

export class PlayerView {
  private presenter: FooterPlayerPresenter | null = null;

  setPresenter(presenter: FooterPlayerPresenter) {
    this.presenter = presenter;
    this.setupEventListeners();
  }

  update(state: PlayerState, currTime: number) {
    const trackName = document.querySelector(".player__track__h3");
    const trackAlbum = document.querySelector(".player__track__author");
    const playBtn = document.querySelector(".player__play-btn");
    const progressBar = document.querySelector(
      ".player__range-play",
    ) as HTMLInputElement;
    const currentTime = document.querySelector(".player__time-start");
    const duration = document.querySelector(".player__time-end");

    if (trackName && trackAlbum && state.currentTrack) {
      trackName.innerHTML = state.currentTrack.name;
      trackAlbum.innerHTML = state.currentTrack.artist.name;
    }

    if (playBtn) {
      playBtn.innerHTML = state.isPlaying
        ?
          `
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
              <g>
                <path style="fill:#AAAAAA;" d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M7,12H5V8V4h2V12z M11,12H9V8V4h2V12z"/>
              </g>
          </svg>
          `
        :
          `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
          fill="#AAAAAA" />
        <path
          d="M27.0385 21.4138C26.9679 21.4862 26.7012 21.7962 26.4528 22.0512C24.9963 23.655 21.197 26.28 19.2085 27.0813C18.9065 27.21 18.143 27.4825 17.735 27.5C17.3441 27.5 16.9715 27.41 16.6159 27.2275C16.1727 26.9725 15.8171 26.5713 15.6223 26.0975C15.4968 25.7688 15.302 24.785 15.302 24.7675C15.1072 23.6913 15 21.9425 15 20.01C15 18.1688 15.1072 16.4913 15.2667 15.3988C15.2849 15.3812 15.4798 14.1588 15.6929 13.74C16.0838 12.975 16.8473 12.5 17.6644 12.5H17.735C18.2672 12.5187 19.3863 12.9938 19.3863 13.0113C21.2677 13.8138 24.9793 16.31 26.471 17.9688C26.471 17.9688 26.8911 18.395 27.0738 18.6613C27.3587 19.0437 27.5 19.5175 27.5 19.9913C27.5 20.52 27.3405 21.0125 27.0385 21.4138Z"
          fill="white" />
      </svg>`;
    }

    if (progressBar) {
      progressBar.max = state.duration.toString();
      progressBar.value = currTime.toFixed(0);
    }

    if (currentTime) {
      currentTime.innerHTML = formatDurationForPlayer(currTime);
    }

    if (duration) {
      duration.innerHTML = formatDurationForPlayer(parseFloat(state.duration.toString()));
    }
  }

  setupEventListeners() {
    const playBtn = document.querySelector(".player__play-btn");
    const volumeSlider = document.querySelector(
      ".player__value-range-inp",
    ) as HTMLInputElement;
    const progressBar = document.querySelector(
      ".player__range-play",
    ) as HTMLInputElement;

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (this.presenter) {
          const state = this.presenter.getCurrentState();
          if (state.isPlaying) {
            this.presenter.pause();
          } else {
            this.presenter.play();
          }
        }
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener("input", () => {
        if (this.presenter) {
          const volume = parseFloat(volumeSlider.value);
          this.presenter.setVolume(volume);
        }
      });
    }

    if (progressBar) {
      progressBar.addEventListener("input", () => {
        if (this.presenter) {
          const time = parseFloat(progressBar.value);
          this.presenter.seek(time);
        }
      });
    }
  }
}
