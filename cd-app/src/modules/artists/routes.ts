import { ModuleRoute } from "shared/types/config";
import ArtistsList from "./pages/ArtistsList";

const routes: ModuleRoute[] = [
   {
      path: "/artists",
      public: false,
      exact: true,
      component: () => ArtistsList(),
   },
];

export default routes;
