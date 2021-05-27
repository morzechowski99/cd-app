import { createReducer } from "@reduxjs/toolkit";
import { LoadingStatus } from "shared/types/enums";
import {
   emailExists,
   loginExists,
   registerUser,
   resetEmailExists,
   resetLoginExists,
   resetState,
} from "./actions";

interface State {
   loading: LoadingStatus;
   error?: string | null;
   emailExists: boolean;
   loginExists: boolean;
   userCreated: boolean;
}

const initialState: State = {
   loading: LoadingStatus.Idle,
   error: null,
   emailExists: false,
   loginExists: false,
   userCreated: false,
};

export default createReducer(initialState, (builder) =>
   builder
      .addCase(registerUser.pending, (state) => {
         state.error = null;
         state.loading = LoadingStatus.Pending;
         state.emailExists = false;
         state.loginExists = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
         state.error = null;
         state.loading = LoadingStatus.Succeeded;
         state.userCreated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
         //@ts-ignore
         state.error = action.payload as string;
         state.loading = LoadingStatus.Failed;
      })
      .addCase(emailExists, (state) => {
         state.emailExists = true;
      })
      .addCase(loginExists, (state) => {
         state.loginExists = true;
      })
      .addCase(resetEmailExists, (state) => {
         state.emailExists = false;
      })
      .addCase(resetLoginExists, (state) => {
         state.loginExists = false;
      })
      .addCase(resetState, (state) => {
         state.loading = initialState.loading;
         state.error = initialState.error;
         state.emailExists = initialState.emailExists;
         state.loginExists = initialState.loginExists;
         state.userCreated = initialState.userCreated;
      })
);
