import { ModuleRoute } from "shared/types/config";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const routes: ModuleRoute[] = [
   {
      path: "/",
      public: true,
      exact: true,
      component: () => MainPage(),
   },
   {
      path: "/login",
      public: true,
      exact: true,
      component: () => Login(),
   },
   {
      path: "/register",
      public: true,
      exact: true,
      component: () => Register(),
   },
];

export default routes;
