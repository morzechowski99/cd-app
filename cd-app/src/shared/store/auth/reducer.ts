import { createReducer } from "@reduxjs/toolkit";
import Auth from "shared/services/Auth";
import { LoadingStatus } from "shared/types/enums";
import { login } from "./actions";

interface State {
   isAuthenticated: boolean;
   loading: LoadingStatus;
   error?: string | null;
}

const initialState: State = {
   isAuthenticated: Auth.isAuthenticated(),
   loading: LoadingStatus.Idle,
   error: null,
};

export default createReducer(initialState, (builder) =>
   builder
      .addCase(login.pending, (state) => {
         state.loading = LoadingStatus.Pending;
         state.error = initialState.error;
      })
      .addCase(login.fulfilled, (state) => {
         state.isAuthenticated = true;
         state.loading = LoadingStatus.Succeeded;
         state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
         state.isAuthenticated = false;
         state.loading = LoadingStatus.Failed;
         state.error = action.payload as string;
      })
);
