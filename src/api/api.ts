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

export const addPlaylist = async (playlistName: string, token: string) => {
  return await fetch(`${API}/api/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: playlistName }),
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

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

export const register = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
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
  return response;
};
