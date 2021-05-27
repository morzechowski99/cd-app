import main from "./main";
import albums from "./albums";

export const routes = [...main.routes, ...albums.routes];

export const reducers = {
   [main.name]: main.reducer,
   [albums.name]: albums.reducer,
};
