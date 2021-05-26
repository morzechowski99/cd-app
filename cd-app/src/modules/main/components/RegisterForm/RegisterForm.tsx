import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { paths } from "config";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import PasswordField from "shared/components/PasswordField";
import { useRedirect } from "shared/hooks/useRedirect";
import { useStyles } from "./RegisterForm.style";
import { useForm } from "./RegisterForm.utils";

export interface LoginFormProps {}

const LoginForm = () => {
   const formProps = useForm();
   const styles = useStyles();
   const redirectToRegister = useRedirect(paths.login);
   return (
      <Paper className={styles.paper}>
         <Formik {...formProps}>
            {({ isValid }) => (
               <Form>
                  <Grid container justify="center" spacing={3}>
                     <Grid
                        item
                        container
                        direction="column"
                        alignItems="center"
                     >
                        <Grid item>
                           <Typography variant="h4">Rejestracja</Typography>
                        </Grid>
                        <Grid item>
                           <Typography variant="subtitle2">
                              Dziękujemy za dołączenie do naszej społeczności
                           </Typography>
                        </Grid>
                     </Grid>

                     <Divider />
                     <Grid item xs={12} md={6}>
                        <Field
                           component={TextField}
                           id="loginInput"
                           name="login"
                           label="Nazwa użytkownika"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Field
                           component={TextField}
                           id="emailInput"
                           name="email"
                           label="Adres e-mail"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Field
                           component={PasswordField}
                           id="passwordInput"
                           name="password"
                           label="Hasło"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Field
                           component={PasswordField}
                           id="passwordConfirmInput"
                           name="passwordConfirm"
                           label="Powtórz hasło"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Field
                           component={TextField}
                           id="nameInput"
                           name="name"
                           label="Imię"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Field
                           component={TextField}
                           id="surnameInput"
                           name="surname"
                           label="Nazwisko"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Button
                           type="submit"
                           variant="contained"
                           fullWidth
                           color="primary"
                           disabled={!isValid}
                        >
                           Zarejestruj
                        </Button>
                     </Grid>
                     <Grid item xs={12} md={7}>
                        <Button
                           type="button"
                           variant="text"
                           fullWidth
                           color="primary"
                           onClick={redirectToRegister}
                        >
                           Masz już konto? Zaloguj się
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
