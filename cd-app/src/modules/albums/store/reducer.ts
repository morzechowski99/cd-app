import { createReducer } from "@reduxjs/toolkit";

import { LoadingStatus } from "shared/types/enums";
import { Album } from "shared/types/interfaces";
import {
   closeDetailsModal,
   getAlbums,
   openDetailsModal,
   resetState,
   selectAlbum,
} from "./actions";

interface State {
   loading: LoadingStatus;
   error?: string | null;
   albums: Album[];
   isDetailsOpen: boolean;
   selectedAlbum: Album | null;
}

const initialState: State = {
   loading: LoadingStatus.Idle,
   error: null,
   albums: [],
   isDetailsOpen: false,
   selectedAlbum: null,
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
      .addCase(openDetailsModal, (state) => {
         state.isDetailsOpen = true;
      })
      .addCase(closeDetailsModal, (state) => {
         state.isDetailsOpen = false;
      })
      .addCase(resetState, (state) => {
         state.isDetailsOpen = false;
         state.selectedAlbum = null;
      })
      .addCase(selectAlbum, (state, action) => {
         state.selectedAlbum = action.payload;
      });
});
