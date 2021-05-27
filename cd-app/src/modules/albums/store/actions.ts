import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "shared/services/Api";
import { Album } from "shared/types/interfaces";

const api = new Api();

export const getAlbums = createAsyncThunk("albums/getAlbums", async () => {
   const response = await api.getAlbums();
   return response.data;
});

export const openDetailsModal = createAction("albums/openDetailsModal");

export const closeDetailsModal = createAction("albums/closeDetailsModal");

export const resetState = createAction("albums/reset");

export const selectAlbum = createAction<Album>("albums/selectAlbum");
