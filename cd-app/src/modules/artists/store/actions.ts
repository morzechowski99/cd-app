import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "shared/services/Api";
import { Artist } from "shared/types/interfaces";
import { AddArtistValues } from "../components/AddArtistModal/AddArtistModal.utils";
import { EditArtistValues } from "../components/EditArtistModal/EditArtistModal.utils";

const api = new Api();

export const getArtists = createAsyncThunk("artists/getArtists", async () => {
   const response = await api.getArtists();
   return response.data;
});

export const deleteArtist = createAsyncThunk(
   "artists/delete",
   async (id: number) => {
      const response = await api.deleteArtist(id);
      return { response: response, id: id };
   }
);

export const createArtist = createAsyncThunk(
   "artists/createArtist",
   async (artist: AddArtistValues) => {
      const response = await api.createArtist(artist);
      return response;
   }
);

export const editArtist = createAsyncThunk(
   "artists/editArtist",
   async (payload: { id: number; artist: EditArtistValues }) => {
      const { id, artist } = payload;
      const response = await api.editArtist(id, artist);
      return response;
   }
);

export const selectArtist = createAction<Artist>("artists/selectArtist");

export const openDeleteModal = createAction("artists/delteDialogOpen");

export const resetState = createAction("artists/reset");

export const closeDeleteModal = createAction("artists/closeDeleteModal");

export const closeDetailsModal = createAction("artists/closeDetailsModal");

export const openDetailsModal = createAction("artists/openDetailsModal");

export const openAddArtistModal = createAction("artists/openAddArtistModal");

export const closeAddArtistModal = createAction("artists/closeAddArtistModal");

export const openEditModal = createAction("artists/openEditModal");

export const closeEditModal = createAction("artists/closeEditModal");
