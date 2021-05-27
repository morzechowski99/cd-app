import { createAsyncThunk } from "@reduxjs/toolkit";
import Api, { LoginPayload } from "shared/services/Api";

const api = new Api();

export const login = createAsyncThunk(
   "auth/login",
   async (payload: LoginPayload, { rejectWithValue }) => {
      try {
         await api.login(payload);
      } catch (err) {
         if (!err.response) return rejectWithValue("networkError");

         return rejectWithValue("loginError");
      }
   }
);
