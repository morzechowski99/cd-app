import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Api, { RegisterPayload } from "shared/services/Api";

const api = new Api();

export const registerUser = createAsyncThunk(
   "user/register",
   async (user: RegisterPayload, { rejectWithValue, dispatch }) => {
      try {
         const response = await api.createUser(user);
         return response;
      } catch (err) {
         if (err.response.status === 400) {
            if (err.response.data === "emailAlreadyExists")
               await dispatch(emailExists());
            else if (err.response.data === "loginAlreadyExists")
               await dispatch(loginExists());
         }

         if (!err.response) return rejectWithValue("defaultError");
         return rejectWithValue(err.response.data);
      }
   }
);

export const emailExists = createAction("user/emailExists");

export const loginExists = createAction("user/loginExists");

export const resetEmailExists = createAction("user/resetemailExists");

export const resetLoginExists = createAction("user/resetloginExists");

export const resetState = createAction("user/resetState");
