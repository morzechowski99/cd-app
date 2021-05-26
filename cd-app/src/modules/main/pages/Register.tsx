import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(5),
   },
}));

export interface RegisterProps {}

const Register = () => {
   const classes = useStyles();

   return (
      <Container className={classes.root} maxWidth="md">
         <RegisterForm />
      </Container>
   );
};

export default Register;
