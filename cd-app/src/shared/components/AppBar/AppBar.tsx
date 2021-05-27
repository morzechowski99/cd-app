import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { paths } from "config";
import { useAuth } from "shared/hooks/useAuth";
import React from "react";
import { Box, Grid } from "@material-ui/core";

export interface TopBarProps {}
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   title: {
      flexGrow: 1,
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
   },
}));
const TopBar = () => {
   const classes = useStyles();
   const history = useHistory();

   const routeChange = (path: string) => {
      history.push(path);
   };

   const { isAuthenticated, logout, tokenData } = useAuth();

   return (
      <AppBar
         position="fixed"
         style={{ maxHeight: 60 }}
         className={classes.appBar}
      >
         <Toolbar>
            <Typography variant="h6" className={classes.title}>
               CD-APP
            </Typography>

            {isAuthenticated ? (
               <>
                  <Button color="inherit">
                     Zalogowany jako: {tokenData?.name} {tokenData?.surname}
                  </Button>
                  <Button onClick={logout} color="inherit">
                     Wyloguj się
                  </Button>
               </>
            ) : (
               <>
                  <Button
                     onClick={() => routeChange(paths.login)}
                     color="inherit"
                  >
                     Zaloguj się
                  </Button>
                  <Button
                     onClick={() => routeChange(paths.register)}
                     color="inherit"
                  >
                     Rejestracja
                  </Button>
               </>
            )}
         </Toolbar>
      </AppBar>
   );
};

export default TopBar;
