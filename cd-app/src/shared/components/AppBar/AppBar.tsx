import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { paths } from "config";

export interface TopBarProps {}
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   title: {
      flexGrow: 1,
   },
}));
const TopBar = () => {
   const classes = useStyles();
   const history = useHistory();

   const routeChange = () => {
      const path = paths.login;
      history.push(path);
   };

   return (
      <AppBar position="relative" style={{ maxHeight: 60 }}>
         <Toolbar>
            <Typography variant="h6" className={classes.title}>
               CD-APP
            </Typography>
            <Button onClick={routeChange} color="inherit">
               Zaloguj się
            </Button>
         </Toolbar>
      </AppBar>
   );
};

export default TopBar;
