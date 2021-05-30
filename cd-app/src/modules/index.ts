import main from "./main";
import albums from "./albums";
import artists from "./artists";

export const routes = [...main.routes, ...albums.routes, ...artists.routes];

export const reducers = {
   [main.name]: main.reducer,
   [albums.name]: albums.reducer,
   [artists.name]: artists.reducer,
};
