import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { useAuth } from "shared/hooks/useAuth";
import { Redirect } from "react-router";
import { paths } from "config";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(3),
   },
}));

export interface LoginProps {}

const Login = () => {
   const classes = useStyles();
   const { isAuthenticated } = useAuth();

   return isAuthenticated ? (
      <Redirect to={paths.main} />
   ) : (
      <Container className={classes.root} maxWidth="xs">
         <LoginForm />
      </Container>
   );
};

export default Login;
