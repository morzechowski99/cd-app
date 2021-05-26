import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(3),
   },
}));

export interface LoginProps {}

const Login = () => {
   const classes = useStyles();

   return (
      <Container className={classes.root} maxWidth="xs">
         <LoginForm />
      </Container>
   );
};

export default Login;
