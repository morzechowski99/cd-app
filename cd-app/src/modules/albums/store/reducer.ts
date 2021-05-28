import { createReducer } from "@reduxjs/toolkit";

import { LoadingStatus } from "shared/types/enums";
import { Album, Artist } from "shared/types/interfaces";
import {
   closeDetailsModal,
   createAlbum,
   getAlbums,
   getArtists,
   openDetailsModal,
   resetState,
   selectAlbum,
} from "./actions";

interface State {
   loading: LoadingStatus;
   error?: string | null;
   albums: Album[];
   artists: Artist[];
   isDetailsOpen: boolean;
   selectedAlbum: Album | null;
   isCreated: boolean;
}

const initialState: State = {
   loading: LoadingStatus.Idle,
   error: null,
   albums: [],
   artists: [],
   isDetailsOpen: false,
   selectedAlbum: null,
   isCreated: false,
};

export default createReducer(initialState, (builder) => {
   builder
      .addCase(getAlbums.pending, (state) => {
         state.loading = LoadingStatus.Pending;
         state.error = null;
      })
      .addCase(getAlbums.fulfilled, (state, action) => {
         state.loading = LoadingStatus.Succeeded;
         state.error = null;
         state.albums = action.payload;
      })
      .addCase(getAlbums.rejected, (state, action) => {
         state.loading = LoadingStatus.Failed;
         state.error = action.error.message;
      })
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
      .addCase(createAlbum.pending, (state) => {
         state.loading = LoadingStatus.Pending;
         state.error = null;
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
         state.loading = LoadingStatus.Succeeded;
         state.error = null;
         state.isCreated = true;
      })
      .addCase(createAlbum.rejected, (state, action) => {
         state.loading = LoadingStatus.Failed;
         state.error = action.error.message;
      })
      .addCase(openDetailsModal, (state) => {
         state.isDetailsOpen = true;
      })
      .addCase(closeDetailsModal, (state) => {
         state.isDetailsOpen = false;
      })
      .addCase(resetState, (state) => {
         state.isDetailsOpen = false;
         state.selectedAlbum = null;
         state.isCreated = false;
      })
      .addCase(selectAlbum, (state, action) => {
         state.selectedAlbum = action.payload;
      });
});
