import { API } from "..";
import { AuthResponse } from "../interfaces/AuthResponse";
import { ErrorResponse } from "../interfaces/ErrorResponse";
import { Playlist } from "../interfaces/Playlist";
import { Song } from "../interfaces/Song";
import { User } from "../interfaces/User";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || "Что-то пошло не так...");
  }
  return response.json();
};

export const getTracks = async (token: string): Promise<Song[]> => {
  try {
    const response = await fetch(`${API}/api/songs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Song[]>(response);
  } catch (error) {
    console.error("Ошибка загрузки треков", error);
    throw error;
  }
};

export const getAllPlaylists = async (token: string): Promise<Playlist[]> => {
  try {
    const response = await fetch(`${API}/api/users/playlists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Playlist[]>(response);
  } catch (error) {
    console.error("Ошибка загрузки плейлистов", error);
    throw error;
  }
};

export const getUserPlaylists = async (
  username: string,
  token: string,
): Promise<Playlist[]> => {
  try {
    const response = await fetch(`${API}/api/users/${username}/playlists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Playlist[]>(response);
  } catch (error) {
    console.error(`Ошибка загрузки плейлистов пользователя ${username}`, error);
    throw error;
  }
};

export const addPlaylist = async (
  playlistName: string,
  token: string,
): Promise<Playlist> => {
  try {
    const response = await fetch(`${API}/api/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: playlistName }),
    });
    return handleResponse<Playlist>(response);
  } catch (error) {
    console.error("Ошибка добавления плейлиста", error);
    throw error;
  }
};

export const addTrackForPlaylist = async (
  trackId: number,
  playlistId: number,
  token: string,
): Promise<void> => {
  try {
    const response = await fetch(
      `${API}/api/playlists/${playlistId}/add/${trackId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return handleResponse<void>(response);
  } catch (error) {
    console.error("Ошибка добавления трека в плейлист", error);
    throw error;
  }
};

export const removeTrackFromPlaylist = async (
  trackId: number,
  playlistId: number | number[],
  token: string,
): Promise<void> => {
  try {
    const response = await fetch(
      `${API}/api/playlists/${playlistId}/remove/${trackId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return handleResponse<void>(response);
  } catch (error) {
    console.error("Ошибка удаления трека из плейлиста", error);
    throw error;
  }
};

export const handleLikeSong = async (
  token: string,
  songId: number,
): Promise<Song> => {
  try {
    const response = await fetch(`${API}/api/songs/${songId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Song>(response);
  } catch (error) {
    console.error("Ошибка", error);
    throw error;
  }
};

export const handleUnlikeSong = async (
  token: string,
  songId: number,
): Promise<Song> => {
  try {
    const response = await fetch(`${API}/api/songs/${songId}/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Song>(response);
  } catch (error) {
    console.error("Ошибка", error);
    throw error;
  }
};

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await fetch(`${API}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<User[]>(response);
  } catch (error) {
    console.error("Ошибка загрузки треков", error);
    throw error;
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse<AuthResponse>(response);
  } catch (error) {
    console.error("Ошибка входа", error);
    throw error;
  }
};

export const register = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        firstName,
        lastName,
      }),
    });
    return handleResponse<AuthResponse>(response);
  } catch (error) {
    console.error("Ошибка регистации", error);
    throw error;
  }
};
