import { Redirect, Route } from "react-router-dom";
import { paths } from "config";
//import { useAuth } from "shared/hooks";
import { ModuleRoute } from "../types/config";

const PrivateRoute = (props: ModuleRoute) => {
   if (true) {
      return <Route {...props} />;
   } else return <Redirect to={paths.login} />;
};

export default PrivateRoute;
