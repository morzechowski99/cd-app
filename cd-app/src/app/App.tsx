import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import Layout from "../shared/components/Layout";
import PrivateRoute from "shared/components/PrivateRoute";
import { routes, reducers } from "../modules";
import { paths } from "config";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as common } from "shared/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { plPL } from "@material-ui/data-grid";
import { green, purple } from "@material-ui/core/colors";

export const store = configureStore({
   reducer: combineReducers({ ...reducers, common }),
});

const theme = createMuiTheme({
   palette: {
      primary: purple,
      secondary: green,
   }
}, plPL);

export type RootState = ReturnType<typeof store.getState>;

const App = () => (
   <Provider store={store}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
   </Provider>
);

export default App;
