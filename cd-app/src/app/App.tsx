import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import Layout from "../shared/components/Layout";
import PrivateRoute from "shared/components/PrivateRoute";
import { routes, reducers } from "../modules";
import { paths } from "config";

const App = () => (
   <>
      <CssBaseline />
      <BrowserRouter>
         <Layout>
            <Switch>
               {routes.map((route) =>
                  route.public ? (
                     <Route key={`publicRoute-${route.path}`} {...route} />
                  ) : (
                     <PrivateRoute
                        key={`privateRoute-${route.path}`}
                        {...route}
                     />
                  )
               )}
               <Route component={() => <Redirect to={paths.main} />} />
            </Switch>
         </Layout>
      </BrowserRouter>
   </>
);

export default App;
