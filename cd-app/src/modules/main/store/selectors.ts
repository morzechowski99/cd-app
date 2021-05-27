import type { RootState } from "app/App";

export const isLoading = (state: RootState) => state.main.loading;

export const getError = (state: RootState) => state.main.error;

export const emailExists = (state: RootState) => state.main.emailExists;

export const loginExists = (state: RootState) => state.main.loginExists;

export const userCreated = (state: RootState) => state.main.userCreated;
