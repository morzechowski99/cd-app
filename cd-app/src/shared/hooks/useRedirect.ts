import { useHistory } from "react-router-dom";

export const useRedirect = (path: string) => {
   const history = useHistory();

   const routeChange = () => {
      history.push(path);
   };

   return routeChange;
};
