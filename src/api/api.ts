import { API } from "..";

export const getTracks = async (token: string) => {
  return await fetch(`${API}/api/songs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const getAllPlaylists = async (token: string) => {
  return await fetch(`${API}/api/users/playlists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const getUserPlaylists = async (username: string, token: string) => {
  return await fetch(`${API}/api/users/${username}/playlists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const addTrackForPlaylist = async (
  trackId: number,
  playlistId: number,
  token: string,
) => {
  return await fetch(`${API}/api/playlists/${playlistId}/add/${trackId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const removeTrackFromPlaylist = async (
  trackId: number,
  playlistId: number,
  token: string,
) => {
  return await fetch(`${API}/api/playlists/${playlistId}/remove/${trackId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};
