import { Playlist } from "./interfaces/Playlist";
import { Song } from "./interfaces/Song";

import PlaylistsSideBar from "./SideBar/playlists-sidebar/playlists-sidebar";
import PlaylistList from "./Playlist/playlists-list/playlists-list";
import TrackList from "./Tracks/track-list/track-list";
import TrackListPresenter from "./Presenters/TrackList/TrackListPresenter";

import { renderComponent } from "./core/render";
import { PlaylistsSideBarPresenter } from "./Presenters/Sidebar/PlaylistsSidebarPresenter";
import { FooterPlayerPresenter } from "./Presenters/Footer/FooterPlayerPresenter";

import "./style.css";
import TracksModel from "./Tracks/Model/tracks-model";
import { UserPresenter } from "./Presenters/User/UserPresenter";
import { AuthModalPresenter } from "./Presenters/AuthModal/AuthModalPresenter";
import {
  getUserPlaylists,
  getTracks,
  getAllPlaylists,
  getUsers,
} from "./api/api";
import { PlayerModel } from "./Footer/Model/footer-player-model";
import { PlayerView } from "./Footer/Model/footer-player-view";
import SearchPresenter from "./Presenters/Search/SearchPresenter";
import PlaylistModel from "./Playlist/Model/playlist-model";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  UserPlaylist = "UserPlaylist",
  Tracks = "Tracks",
  Playlist = "Playlist",
}

export const renderAuthModal = () => {
  const authModal = new AuthModalPresenter();
  if (body instanceof HTMLElement) {
    authModal.render(body);
  }
};

export const validateToken = (
  token: string,
): { valid: boolean; data?: object; error?: string } => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || typeof decoded === "string") {
      return {
        valid: false,
        error: "Invalid token format",
      };
    }

    const payload = decoded.payload as JwtPayload;
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return {
        valid: false,
        error: "Token has expired",
      };
    }

    return {
      valid: true,
      data: payload,
    };
  } catch (error) {
    return {
      valid: false,
      error: (error as Error).message,
    };
  }
};

export const fetchTracks = async () => (token ? await getTracks(token) : []);

export const fetchUsers = async () => (token ? await getUsers(token) : []);

export const fetchPlaylists = async () =>
  token ? await getAllPlaylists(token) : [];

export const createErrorMessage = () => {
  const errorWrap = document.createElement("div");
  const errorTitle = document.createElement("h1");
  const clearLocalStorage = document.createElement("a");

  errorWrap.classList.add("error");
  errorTitle.classList.add("error-title");
  clearLocalStorage.classList.add("clear-btn");

  clearLocalStorage.href = "/";
  errorTitle.textContent = "Произошла ошибка. Очистите КЕШ!";
  clearLocalStorage.textContent = "Очистить";

  errorWrap.append(errorTitle, clearLocalStorage);
  document.body.append(errorWrap);

  clearLocalStorage.addEventListener("click", () => {
    localStorage.clear();
  });
};

export const renderHeaderContent = async (token: string) => {
  const tracks: Song[] = await getTracks(token);
  const tracksModel = new TracksModel();
  tracks.forEach((track) => tracksModel.addTrack(track));

  const playlists: Playlist[] = await getAllPlaylists(token);
  const playlistsModel = new PlaylistModel();
  playlists.forEach((playlist) => playlistsModel.addPlaylist(playlist));

  const searchPresenter = new SearchPresenter(tracksModel, playlistsModel);
  if (search instanceof HTMLElement) {
    searchPresenter.render(search);
  }

  const user = new UserPresenter();
  if (header instanceof HTMLElement) {
    user.render(header);
  }
};

export const clearMainContent = () => {
  if (main instanceof HTMLElement) {
    main.innerHTML = "";
  }
};

export const renderSidebar = async (token: string, username: string) => {
  const playlists: Playlist[] = await getUserPlaylists(username, token);

  const asideList = new PlaylistsSideBar(token, username);
  if (aside instanceof HTMLElement) {
    renderComponent(asideList, aside, true);
    asideList.addEventListeners();
  }

  const asideListPresenter = new PlaylistsSideBarPresenter(
    playlists,
    token,
    username,
  );
  const asideListContainer = document.querySelector(".aside__list");
  if (asideListContainer instanceof HTMLElement) {
    asideListPresenter.render(asideListContainer);
  }
};

export const renderTrackList = async (tracks: Song[], token: string) => {
  const users = await fetchUsers();
  const currentUser = users.find((user) => user.username === username);
  if (currentUser) {
    const trackList = new TrackList(tracks, token, currentUser);
    if (main instanceof HTMLElement) {
      main.innerHTML = "";
      renderComponent(trackList, main);
    }
  }
};

export const renderUserPlaylist = async (token: string) => {
  const allPlaylists = await getAllPlaylists(token);

  const playlistsList = new PlaylistList(allPlaylists);
  if (main instanceof HTMLElement) {
    renderComponent(playlistsList, main);
    playlistsList.addPlaylists();
  }
};

export const renderPlaylist = async (
  playlist: Song[],
  token: string,
  username: string,
) => {
  const users = await fetchUsers();
  const currentUser = users.find((user) => user.username === username);
  if (currentUser) {
    const trackList = new TrackList(playlist, token, currentUser);
    if (main instanceof HTMLElement) {
      renderComponent(trackList, main);
    }

    const trackListModel = new TracksModel();
    playlist.forEach((track) => trackListModel.addTrack(track));

    const playlists: Playlist[] = await getUserPlaylists(username, token);

    playlists.forEach((playlist) => {
      if (playlist.songs) {
        const trackListPresenter = new TrackListPresenter(
          trackListModel,
          playlist.songs,
          currentUser,
        );
        const tracklistContainer = document.querySelector(".tracks__list");
        if (tracklistContainer instanceof HTMLElement) {
          trackListPresenter.render(tracklistContainer);
        }
      }
    });
  }
};

export const renderFooterPlayer = async (
  trackData: Song,
  playlistData: Song[],
) => {
  const users = await fetchUsers();
  const currentUser = users.find((user) => user.username === username);
  if (currentUser) {
    const model = new PlayerModel();
    const view = new PlayerView();
    const footerPlayerPresenter = new FooterPlayerPresenter(
      trackData,
      playlistData,
      currentUser,
      model,
      view,
    );
    if (footer instanceof HTMLElement) {
      footer.innerHTML = "";
      footerPlayerPresenter.render(footer);
    }
    view.setupEventListeners();
  }
};

export const switchScreen = async (
  screenState: ScreenState,
  token: string,
  username: string,
  playlist?: Song[],
) => {
  clearMainContent();
  switch (screenState) {
    case ScreenState.UserPlaylist:
      renderUserPlaylist(token);
      break;
    case ScreenState.Tracks:
      const tracks = await getTracks(token);
      renderTrackList(tracks, token);
      break;
    case ScreenState.Playlist:
      if (playlist) {
        renderPlaylist(playlist, token, username);
      }
      break;
  }
};

if (!token) {
  renderAuthModal();
} else {
  if (!validateToken(token).valid) {
    console.error("Не валидный токен:", validateToken(token).error);
    createErrorMessage();
  } else {
    renderHeaderContent(token);
    if (username) {
      renderSidebar(token, username);
      switchScreen(ScreenState.Tracks, token, username);
    }
  }
}
