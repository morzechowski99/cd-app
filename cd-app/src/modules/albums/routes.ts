import { ModuleRoute } from "shared/types/config";
import AddAlbum from "./pages/AddAlbum";
import AlbumList from "./pages/AlbumList";
import EditAlbum from "./pages/EditAlbum";

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
   {
      path: "/editAlbum",
      public: false,
      exact: true,
      component: () => EditAlbum(),
   },
];

export default routes;
