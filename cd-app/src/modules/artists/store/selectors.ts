import type { RootState } from "app/App";

export const isLoading = (state: RootState) => state.artists.loading;

export const getError = (state: RootState) => state.artists.error;

export const getArtists = (state: RootState) => state.artists.artists;

export const isDeleteDialogOpen = (state: RootState) =>
   state.artists.isDeleteDialogOpen;

export const getSelectedArtist = (state: RootState) =>
   state.artists.selectedArtist;

export const isDetailsOpen = (state: RootState) =>
   state.artists.isDetailsDialogOpen;

export const isAddArtistDialogOpen = (state: RootState) =>
   state.artists.isAddArtistDialogOpen;

export const isEditArtistDialogOpen = (state: RootState) =>
   state.artists.isEditArtistDialogOpen;
