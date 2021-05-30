import { createReducer } from "@reduxjs/toolkit";
import { LoadingStatus } from "shared/types/enums";
import { Artist } from "shared/types/interfaces";
import {
   getArtists,
   resetState,
   selectArtist,
   openDeleteModal,
   deleteArtist,
   closeDeleteModal,
   closeDetailsModal,
   openDetailsModal,
   openAddArtistModal,
   closeAddArtistModal,
   createArtist,
   openEditModal,
   closeEditModal,
   editArtist,
} from "./actions";

interface State {
   loading: LoadingStatus;
   error?: string | null;
   artists: Artist[];
   selectedArtist: Artist | null;
   isDeleteDialogOpen: boolean;
   isDetailsDialogOpen: boolean;
   isAddArtistDialogOpen: boolean;
   isEditArtistDialogOpen: boolean;
}

const initialState: State = {
   loading: LoadingStatus.Idle,
   error: null,
   artists: [],
   selectedArtist: null,
   isDeleteDialogOpen: false,
   isDetailsDialogOpen: false,
   isAddArtistDialogOpen: false,
   isEditArtistDialogOpen: false,
};

export default createReducer(initialState, (builder) => {
   builder
      .addCase(getArtists.pending, (state) => {
         state.loading = LoadingStatus.Pending;
         state.error = null;
      })
      .addCase(getArtists.fulfilled, (state, action) => {
         state.loading = LoadingStatus.Succeeded;
         state.error = null;
         state.artists = action.payload;
      })
      .addCase(getArtists.rejected, (state, action) => {
         state.loading = LoadingStatus.Failed;
         state.error = action.error.message;
      })
      .addCase(deleteArtist.pending, (state) => {
         state.loading = LoadingStatus.Pending;
         state.error = null;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
         state.loading = LoadingStatus.Succeeded;
         state.error = null;
         state.isDeleteDialogOpen = false;
         state.artists = state.artists.filter(
            (artist) => artist.id !== action.payload.id
         );
      })
      .addCase(deleteArtist.rejected, (state, action) => {
         state.loading = LoadingStatus.Failed;
         state.error = action.error.message;
      })
      .addCase(createArtist.pending, (state) => {
         state.loading = LoadingStatus.Pending;
         state.error = null;
      })
      .addCase(createArtist.fulfilled, (state) => {
         state.loading = LoadingStatus.Succeeded;
         state.error = null;
         state.isAddArtistDialogOpen = false;
      })
      .addCase(createArtist.rejected, (state, action) => {
         state.loading = LoadingStatus.Failed;
         state.error = action.error.message;
      })
      .addCase(editArtist.pending, (state) => {
         state.loading = LoadingStatus.Pending;
         state.error = null;
      })
      .addCase(editArtist.fulfilled, (state) => {
         state.loading = LoadingStatus.Succeeded;
         state.error = null;
         state.isEditArtistDialogOpen = false;
      })
      .addCase(editArtist.rejected, (state, action) => {
         state.loading = LoadingStatus.Failed;
         state.error = action.error.message;
      })
      .addCase(resetState, (state) => {
         state.selectedArtist = null;
         state.isDeleteDialogOpen = false;
         state.isDetailsDialogOpen = false;
         state.isAddArtistDialogOpen = false;
         state.isEditArtistDialogOpen = false;
      })
      .addCase(selectArtist, (state, action) => {
         state.selectedArtist = action.payload;
      })
      .addCase(openDeleteModal, (state) => {
         state.isDeleteDialogOpen = true;
      })
      .addCase(closeDeleteModal, (state) => {
         state.isDeleteDialogOpen = false;
      })
      .addCase(closeDetailsModal, (state) => {
         state.isDetailsDialogOpen = false;
      })
      .addCase(openDetailsModal, (state) => {
         state.isDetailsDialogOpen = true;
      })
      .addCase(openAddArtistModal, (state) => {
         state.isAddArtistDialogOpen = true;
      })
      .addCase(closeAddArtistModal, (state) => {
         state.isAddArtistDialogOpen = false;
      })
      .addCase(openEditModal, (state) => {
         state.isEditArtistDialogOpen = true;
      })
      .addCase(closeEditModal, (state) => {
         state.isEditArtistDialogOpen = false;
      });
});
