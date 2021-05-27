import type { RootState } from "app/App";

export const getAuth = (state: RootState) => state.common.auth;

export const getIsAuthenticated = (state: RootState) =>
   state.common.auth.isAuthenticated;

export const getAuthStatus = (state: RootState) => state.common.auth.loading;

export const getError = (state: RootState) => state.common.auth.error;
