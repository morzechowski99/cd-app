import { Container, makeStyles } from "@material-ui/core";
import { paths } from "config";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoDialog from "shared/components/InfoDialog";
import { useDialog } from "shared/hooks/useDialog";
import { useRedirect } from "shared/hooks/useRedirect";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { actions, selectors } from "../store";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(5),
   },
}));

export interface RegisterProps {}

const Register = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const userCreated = useSelector(selectors.userCreated);
   const [isDialogOpen, openDialog, closeDialog, toggleDialog] = useDialog();
   const goToLogin = useRedirect(paths.login);

   useEffect(() => {
      dispatch(actions.resetState());
   }, [dispatch]);

   useEffect(() => {
      if (userCreated) openDialog();
      else closeDialog();
   }, [userCreated, openDialog, closeDialog]);

   return (
      <Container className={classes.root} maxWidth="md">
         <InfoDialog
            keepMounted={false}
            title={"Rejestracja pomyślna"}
            content={"Kliknij ok, aby się zalogować"}
            open={isDialogOpen}
            onClose={() => {
               goToLogin();
            }}
         />
         <RegisterForm />
      </Container>
   );
};

export default Register;
