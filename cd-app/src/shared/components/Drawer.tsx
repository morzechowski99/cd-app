import DrawerMaterial from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import {
   Divider,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
} from "@material-ui/core";
import React from "react";
import { Dashboard, Album } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { paths } from "config";
import { useAuth } from "shared/hooks/useAuth";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
   },
   drawer: {
      width: drawerWidth,
      flexShrink: 0,
   },
   drawerPaper: {
      width: drawerWidth,
   },
   drawerContainer: {
      overflow: "auto",
   },
}));

export interface DrawerProps {}

const Drawer = () => {
   const { isAuthenticated } = useAuth();
   const classes = useStyles();
   return (
      <DrawerMaterial
         className={classes.drawer}
         variant="permanent"
         classes={{
            paper: classes.drawerPaper,
         }}
      >
         <Toolbar />
         <div className={classes.drawerContainer}>
            <List>
               <ListItem
                  button
                  exact={true}
                  component={NavLink}
                  to={paths.main}
                  activeClassName="Mui-selected"
               >
                  <ListItemIcon>
                     <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary={"Strona Główna"} />
               </ListItem>
            </List>
            <Divider />
            {isAuthenticated && (
               <List>
                  <ListItem
                     button
                     exact={true}
                     component={NavLink}
                     to={paths.albums}
                     activeClassName="Mui-selected"
                  >
                     <ListItemIcon>
                        <Album />
                     </ListItemIcon>
                     <ListItemText primary={"Albumy"} />
                  </ListItem>
                  <ListItem
                     button
                     exact={true}
                     component={NavLink}
                     to={paths.artists}
                     activeClassName="Mui-selected"
                  >
                     <ListItemIcon>
                        <AccountCircleIcon />
                     </ListItemIcon>
                     <ListItemText primary={"Artyści"} />
                  </ListItem>
               </List>
            )}
         </div>
      </DrawerMaterial>
   );
};

export default Drawer;
