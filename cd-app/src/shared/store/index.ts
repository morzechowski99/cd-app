import { combineReducers } from "redux";
import auth from "./auth";

export const actions = {
   auth: auth.actions,
};

export const selectors = {
   auth: auth.selectors,
};

export const reducer = combineReducers({
   auth: auth.reducer,
});
