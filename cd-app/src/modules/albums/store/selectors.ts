import type { RootState } from "app/App";

export const isLoading = (state: RootState) => state.albums.loading;

export const getError = (state: RootState) => state.albums.error;

export const getAlbums = (state: RootState) => state.albums.albums;

export const isDetailsOpen = (state: RootState) => state.albums.isDetailsOpen;

export const getSelectedAlbum = (state: RootState) =>
   state.albums.selectedAlbum;

export const getArtists = (state: RootState) => state.albums.artists;

export const isCreated = (state: RootState) => state.albums.isCreated;
