import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { paths } from "config";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import PasswordField from "shared/components/PasswordField";
import { useRedirect } from "shared/hooks/useRedirect";
import { useStyles } from "./LoginForm.style";
import { useForm } from "./LoginForm.utils";

export interface LoginFormProps {}

const LoginForm = () => {
   const formProps = useForm();
   const styles = useStyles();
   const redirectToRegister = useRedirect(paths.register);
   return (
      <Paper className={styles.paper}>
         <Formik {...formProps}>
            {({ isValid }) => (
               <Form>
                  <Grid container justify="center" spacing={3}>
                     <Grid item>
                        <Typography variant="h4">Zaloguj się!</Typography>
                     </Grid>
                     <Divider />
                     <Grid item xs={12}>
                        <Field
                           component={TextField}
                           id="loginInput"
                           name="login"
                           variant="outlined"
                           label="Nazwa użytkownika"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Field
                           component={PasswordField}
                           id="passwordInput"
                           name="password"
                           variant="outlined"
                           label="Hasło"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Button
                           type="submit"
                           variant="contained"
                           fullWidth
                           color="primary"
                           disabled={!isValid}
                        >
                           Zaloguj się
                        </Button>
                     </Grid>
                     <Grid item xs={12}>
                        <Button
                           type="button"
                           variant="text"
                           fullWidth
                           color="primary"
                           onClick={redirectToRegister}
                        >
                           Rejestracja
                        </Button>
                     </Grid>
                  </Grid>
               </Form>
            )}
         </Formik>
      </Paper>
   );
};

export default LoginForm;
