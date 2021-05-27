import { useSelector } from "react-redux";
import Auth from "shared/services/Auth";
import { RootState } from "app/App";
import { selectors } from "../store";

export const useAuth = () => {
   const isAuthenticated = useSelector<RootState, boolean>(
      selectors.auth.getIsAuthenticated
   );
   const tokenData = Auth.getTokenData();

   return { isAuthenticated, logout: Auth.logout, tokenData };
};
