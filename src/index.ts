import { Playlist } from "./interfaces/Playlist";
import { Song } from "./interfaces/Song";

import PlaylistsSideBar from "./SideBar/playlists-sidebar/playlists-sidebar";
import PlaylistList from "./Playlist/playlists-list/playlists-list";
import TrackList from "./Tracks/track-list/track-list";
import TrackListPresenter from "./Presenters/TrackList/TrackListPresenter";

import { renderComponent } from "./core/render";
import { PlaylistListPresenter } from "./Presenters/Playlist/PlaylistsListPresenter";
import { PlaylistsSideBarPresenter } from "./Presenters/Sidebar/PlaylistsSidebarPresenter";
import { FooterPlayerPresenter } from "./Presenters/Footer/FooterPlayerPresenter";

import "./style.css";
import TracksModel from "./Tracks/Model/tracks-model";
import { UserPresenter } from "./Presenters/User/UserPresenter";
import { User } from "./interfaces/User";
import { AuthModalPresenter } from "./Presenters/AuthModal/AuthModalPresenter";
import { getUserPlaylists, getTracks, getAllPlaylists } from "./api/api";
import { PlayerModel } from "./Footer/Model/footer-player-model";
import { PlayerView } from "./Footer/Model/footer-player-view";
import SearchPresenter from "./Presenters/Search/SearchPresenter";
import PlaylistModel from "./Playlist/Model/playlist-model";

export const API = "http://localhost:3000";

export const token = localStorage.getItem("access_token");
export const username = localStorage.getItem("username");
export const main = document.querySelector(".main");
const body = document.body;
const header = document.querySelector(".header");
const aside = document.querySelector(".content-wrap");
const footer = document.querySelector(".footer");
const search = document.querySelector(".header__search");

export enum ScreenState {
  PlaylistList = "PlaylistList",
  Tracks = "Tracks",
  Playlist = "Playlist",
}

// MOCKS //
const mockUserData: User = {
  id: 1,
  username: "ArtKry",
  firstName: "Artem",
  lastName: "Kryakvin",
  albumLikes: [],
  artistLikes: [],
  playlists: [],
  songLikes: [],
};

export const renderAuthModal = () => {
  const authModal = new AuthModalPresenter();
  if (body instanceof HTMLElement) {
    authModal.render(body);
  }
};

export const fetchTracks = async () => {
  if (token) {
    return await getTracks(token);
  }
};

export const fetchPlaylists = async () => {
  if (token) {
    return await getAllPlaylists(token);
  }
};

export const renderHeaderContent = async () => {
  if (token) {
    const tracks: Song[] = await getTracks(token);
    const tracksModel = new TracksModel();
    tracks.forEach((track) => {
      tracksModel.addTrack(track);
    });

    const playlists: Playlist[] = await getAllPlaylists(token);
    const playlistsModel = new PlaylistModel();
    playlists.forEach((playlist) => {
      playlistsModel.addPlaylist(playlist);
    });

    const searchPresenter = new SearchPresenter(tracksModel, playlistsModel);
    if (search instanceof HTMLElement) {
      searchPresenter.render(search);
    }
  }

  const user = new UserPresenter(mockUserData);
  if (header instanceof HTMLElement) {
    user.render(header);
  }
};

export const clearMainContent = () => {
  if (main instanceof HTMLElement) {
    main.innerHTML = "";
  }
};

export const renderSidebar = async () => {
  if (token && username) {
    const playlists: Playlist[] = await getUserPlaylists(username, token);

    const asideList = new PlaylistsSideBar();
    if (aside instanceof HTMLElement) {
      renderComponent(asideList, aside, true);
      asideList.addEventListeners()
    }

    const asideListPresenter = new PlaylistsSideBarPresenter(playlists);
    const asideListContainer = document.querySelector(".aside__list");
    if (asideListContainer instanceof HTMLElement) {
      asideListPresenter.render(asideListContainer);
    }

    asideListContainer?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const path = target.dataset["path"];

      if (target && path === "playlists") {
        target.classList.add("aside__btn-active");
        switchScreen(ScreenState.PlaylistList);
      } else {
        target.classList.remove("aside__btn-active");
      }

      if (target && path === "tracks") {
        target.classList.add("aside__btn-active");
        switchScreen(ScreenState.Tracks);
      } else {
        target.classList.remove("aside__btn-active");
      }
    });
  }
};

export const renderTrackList = async (tracks: Song[]) => {
  if (token && username) {
    const trackList = new TrackList();
    if (main instanceof HTMLElement) {
      main.innerHTML = '';
      renderComponent(trackList, main);
    }

    const tracksModel = new TracksModel();
    tracks.forEach((track) => {
      tracksModel.addTrack(track);
    });

    const playlists: Playlist[] = await getUserPlaylists(username, token);
    playlists.forEach((playlist) => {
      const trackListPresenter = new TrackListPresenter(tracksModel, playlist);
      const tracklistContainer = document.querySelector(".tracks__list");
      if (tracklistContainer instanceof HTMLElement) {
        tracklistContainer.innerHTML = "";
        trackListPresenter.render(tracklistContainer);
      }
    });
  }
};

export const renderPlaylistList = async () => {
  if (token) {
    const allPlaylists = await getAllPlaylists(token);

    const playlistsList = new PlaylistList();
    if (main instanceof HTMLElement) {
      renderComponent(playlistsList, main);
    }
    const playlistListPresenter = new PlaylistListPresenter(allPlaylists);
    const playlistListContainer = document.querySelector(".playlist__list");
    if (playlistListContainer instanceof HTMLElement) {
      playlistListPresenter.render(playlistListContainer);
    }
  }
};

export const renderPlaylist = async (playlist: Song[]) => {
  if (token && username) {
    const trackList = new TrackList();
    if (main instanceof HTMLElement) {
      renderComponent(trackList, main);
    }

    const trackListModel = new TracksModel();
    playlist.forEach((track) => {
      trackListModel.addTrack(track);
    });
    

    const playlists: Playlist[] = await getUserPlaylists(username, token);
    playlists.forEach((playlist) => {
      const trackListPresenter = new TrackListPresenter(
        trackListModel,
        playlist,
      );
      const tracklistContainer = document.querySelector(".tracks__list");
      if (tracklistContainer instanceof HTMLElement) {
        trackListPresenter.render(tracklistContainer);
      }
    });
  }
};

export const renderFooterPlayer = (trackData: Song) => {
  const model = new PlayerModel(trackData);
  const view = new PlayerView();
  const footerPlayerPresenter = new FooterPlayerPresenter(
    trackData,
    model,
    view,
  );
  if (footer instanceof HTMLElement) {
    footer.innerHTML = "";
    footerPlayerPresenter.render(footer);
  }
  view.setupEventListeners();
};

export const switchScreen = async (
  screenState: ScreenState,
  playlist?: Song[],
) => {
  clearMainContent();
  switch (screenState) {
    case ScreenState.PlaylistList:
      renderPlaylistList();
      break;
    case ScreenState.Tracks:
      await fetchTracks().then((tracks) => {
        renderTrackList(tracks);
      });
      break;
    case ScreenState.Playlist:
      if (playlist) {
        renderPlaylist(playlist);
      }
      break;
  }
};

if (!token) {
  renderAuthModal();
} else {
  renderHeaderContent();
  renderSidebar();
  switchScreen(ScreenState.Tracks);
}
