import { ModuleRoute } from "shared/types/config";
import AddAlbum from "./pages/AddAlbum";
import AlbumList from "./pages/AlbumList";

const routes: ModuleRoute[] = [
   {
      path: "/albums",
      public: false,
      exact: true,
      component: () => AlbumList(),
   },
   {
      path: "/addAlbum",
      public: false,
      exact: true,
      component: () => AddAlbum(),
   },
];

export default routes;
