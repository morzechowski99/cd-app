import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "shared/services/Api";
import { Album } from "shared/types/interfaces";
import { AddAlbumValues } from "../components/AddAlbumForm/AddAlbumForm.utils";

const api = new Api();

export const getAlbums = createAsyncThunk("albums/getAlbums", async () => {
   const response = await api.getAlbums();
   return response.data;
});

export const getArtists = createAsyncThunk("albums/getArtists", async () => {
   const response = await api.getArtists();
   return response.data;
});

export const createAlbum = createAsyncThunk(
   "albums/create",
   async (album: AddAlbumValues) => {
      const response = await api.createAlbum(album);
      return response;
   }
);

export const openDetailsModal = createAction("albums/openDetailsModal");

export const closeDetailsModal = createAction("albums/closeDetailsModal");

export const resetState = createAction("albums/reset");

export const selectAlbum = createAction<Album>("albums/selectAlbum");
