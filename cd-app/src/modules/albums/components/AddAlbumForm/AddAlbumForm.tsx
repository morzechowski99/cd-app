import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { ErrorMessage, Field, FieldArray, Form, Formik, getIn } from "formik";
import { TextField } from "formik-material-ui";
import { useStyles } from "modules/main/components/LoginForm/LoginForm.style";
import React from "react";
import { useForm } from "./AddAlbumForm.utils";
import TextFieldMaterial from "@material-ui/core/TextField";
import {
   Autocomplete,
   AutocompleteRenderInputParams,
} from "formik-material-ui-lab";

export interface AddAlbumFormProps {}

const AddAlbumForm = () => {
   const styles = useStyles();
   const formProps = useForm();
   return (
      <Paper className={styles.paper}>
         <Formik {...formProps}>
            {({ isValid, errors, touched, values }) => (
               <Form>
                  <Grid container justify="center" spacing={4}>
                     <Grid
                        item
                        container
                        direction="column"
                        alignItems="center"
                     >
                        <Typography variant="h4">Dodaj album</Typography>
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <Field
                           component={TextField}
                           id="title"
                           name="title"
                           label="Tytuł"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <Field
                           component={TextField}
                           id="version"
                           name="version"
                           label="Wersja"
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <Field
                           component={TextField}
                           id="year"
                           name="year"
                           label="Rok wydania"
                           fullWidth
                        />
                     </Grid>

                     <Grid
                        item
                        container
                        alignContent="flex-start"
                        spacing={4}
                        xs={12}
                        md={6}
                     >
                        <Grid
                           item
                           container
                           direction="column"
                           alignItems="center"
                        >
                           <Typography variant="h6">
                              Wybierz artystów
                           </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <Field
                              component={Autocomplete}
                              //options={countries}
                              id="countryId"
                              name="countryId"
                              //getOptionLabel={(option: Country) => option.name}

                              renderInput={(
                                 params: AutocompleteRenderInputParams
                              ) => (
                                 <TextFieldMaterial
                                    {...params}
                                    variant="standard"
                                    error={
                                       touched["artistsIds"] &&
                                       !!errors["artistsIds"]
                                    }
                                    helperText={errors["artistsIds"]}
                                 />
                              )}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <Button variant="outlined" fullWidth color="primary">
                              Dodaj
                           </Button>
                        </Grid>
                     </Grid>
                     <Grid item container xs={12} md={6}>
                        <Grid
                           item
                           container
                           direction="column"
                           alignItems="center"
                        >
                           <Typography variant="h6">Dodaj utwory</Typography>
                        </Grid>

                        <FieldArray
                           name="tracks"
                           render={(arrayHelpers) => (
                              <Grid container spacing={2}>
                                 <Grid item xs={12} md={6}>
                                    <Field
                                       component={TextField}
                                       id={`tracks.${
                                          values.tracks.length - 1
                                       }.title`}
                                       name={`tracks.${
                                          values.tracks.length - 1
                                       }.title`}
                                       label="Tytuł"
                                       fullWidth
                                    />
                                 </Grid>
                                 <Grid item xs={12} md={6}>
                                    <Field
                                       component={TextField}
                                       id={`tracks.${
                                          values.tracks.length - 1
                                       }.year`}
                                       name={`tracks.${
                                          values.tracks.length - 1
                                       }.year`}
                                       label="Rok wydania"
                                       fullWidth
                                    />
                                 </Grid>
                                 <Grid item xs={12} md={6}>
                                    <Field
                                       component={TextField}
                                       id={`tracks.${
                                          values.tracks.length - 1
                                       }.duration`}
                                       name={`tracks.${
                                          values.tracks.length - 1
                                       }.duration`}
                                       label="Długość"
                                       fullWidth
                                    />
                                 </Grid>
                                 <Grid item xs={12} md={6}>
                                    <Button
                                       style={{ marginTop: 15 }}
                                       variant="outlined"
                                       fullWidth
                                       color="primary"
                                    >
                                       Dodaj utwór
                                    </Button>
                                 </Grid>
                              </Grid>
                           )}
                        />
                     </Grid>
                     <Grid xs={12} md={8} lg={5}>
                        <Button
                           type="submit"
                           variant="contained"
                           color="primary"
                           fullWidth
                        >
                           Dodaj
                        </Button>
                     </Grid>
                  </Grid>
               </Form>
            )}
         </Formik>
      </Paper>
   );
};

export default AddAlbumForm;
