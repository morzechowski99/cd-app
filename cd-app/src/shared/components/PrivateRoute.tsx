import { Redirect, Route } from "react-router-dom";
import { paths } from "config";
import { useAuth } from "shared/hooks/useAuth";
import { ModuleRoute } from "../types/config";

const PrivateRoute = (props: ModuleRoute) => {
   const { isAuthenticated } = useAuth();
   if (isAuthenticated) {
      return <Route {...props} />;
   } else return <Redirect to={paths.login} />;
};

export default PrivateRoute;
