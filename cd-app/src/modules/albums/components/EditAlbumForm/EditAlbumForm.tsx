import {
   Box,
   Button,
   Grid,
   IconButton,
   Paper,
   Typography,
} from "@material-ui/core";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { useStyles } from "modules/main/components/LoginForm/LoginForm.style";
import { useState } from "react";
import { useForm, useSelectedArtists } from "./EditAlbumForm.utils";
import TextFieldMaterial from "@material-ui/core/TextField";
import {
   Autocomplete,
   AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import { useSelector } from "react-redux";
import { selectors } from "modules/albums/store";
import { Artist } from "shared/types/interfaces";
import ArtistsTable from "../ArtistsTable/ArtistsTable";
import { DeleteOutlined } from "@material-ui/icons";
import Loader from "shared/components/Loader/Loader";

export interface EditAlbumFormProps {}

const EditAlbumForm = () => {
   const styles = useStyles();
   const formProps = useForm();
   const artists = useSelector(selectors.getArtists);
   const [selectedArtists, addArtist, removeArtist] = useSelectedArtists();
   const [artist, setArtist] = useState<Artist | null>(null);
   return (
      <Paper className={styles.paper}>
         <Formik {...formProps}>
            {({
               isValid,
               errors,
               touched,
               values,
               setFieldValue,
               isSubmitting,
            }) => (
               <Form>
                  <Grid container justify="center" spacing={4}>
                     {isSubmitting && (
                        <Box position="absolute" zIndex="modal" height="50%">
                           <Loader />
                        </Box>
                     )}
                     <Grid
                        item
                        container
                        direction="column"
                        alignItems="center"
                     >
                        <Typography variant="h4">Edytuj album</Typography>
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
                     <FieldArray
                        name="artistsIds"
                        render={(arrayHelpers) => (
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
                                    options={artists}
                                    id="artistsIds"
                                    name="artistsIds"
                                    getOptionLabel={(option: Artist) =>
                                       `${option?.name} ${option?.surname}`
                                    }
                                    value={artist}
                                    onChange={(
                                       event: any,
                                       value: Artist | null
                                    ) => {
                                       setArtist(value);
                                    }}
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
                                 <Button
                                    variant="outlined"
                                    disabled={artist === null}
                                    onClick={() => {
                                       if (artist !== null) {
                                          addArtist(artist);
                                          if (
                                             values["artistsIds"].findIndex(
                                                (idx) => idx === artist.id
                                             ) === -1
                                          )
                                             arrayHelpers.push(artist.id);
                                       }
                                    }}
                                    fullWidth
                                    color="primary"
                                 >
                                    Dodaj
                                 </Button>
                              </Grid>
                              <ArtistsTable
                                 artists={selectedArtists}
                                 deleteArtist={(id: number) => {
                                    removeArtist(id);
                                    setFieldValue(
                                       "artistsIds",
                                       values["artistsIds"].filter(
                                          (a) => a !== id
                                       )
                                    );
                                 }}
                              />
                           </Grid>
                        )}
                     />
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
                              <>
                                 {values["tracks"]?.length > 0 &&
                                    values["tracks"].map((track, idx) => (
                                       <>
                                          <Grid container spacing={2}>
                                             <Grid
                                                item
                                                container
                                                xs={12}
                                                md={11}
                                                spacing={2}
                                             >
                                                <Grid item xs={12} md={4}>
                                                   <Field
                                                      component={TextField}
                                                      id={`tracks.${idx}.title`}
                                                      name={`tracks.${idx}.title`}
                                                      label="Tytuł"
                                                      fullWidth
                                                   />
                                                </Grid>

                                                <Grid item xs={12} md={4}>
                                                   <Field
                                                      component={TextField}
                                                      id={`tracks.${idx}.year`}
                                                      name={`tracks.${idx}.year`}
                                                      label="Rok wydania"
                                                      fullWidth
                                                   />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                   <Field
                                                      component={TextField}
                                                      id={`tracks.${idx}.duration`}
                                                      name={`tracks.${idx}.duration`}
                                                      label="Długość"
                                                      fullWidth
                                                   />
                                                </Grid>
                                             </Grid>
                                             <Grid xs={12} md={1}>
                                                <IconButton
                                                   style={{ marginTop: 20 }}
                                                   onClick={() =>
                                                      arrayHelpers.remove(idx)
                                                   }
                                                >
                                                   <DeleteOutlined />
                                                </IconButton>
                                             </Grid>
                                          </Grid>
                                       </>
                                    ))}
                                 <Grid item xs={12}>
                                    <Button
                                       style={{ marginTop: 15 }}
                                       variant="outlined"
                                       fullWidth
                                       color="primary"
                                       onClick={() =>
                                          arrayHelpers.push({
                                             title: "",
                                             year: null,
                                             duration: "",
                                          })
                                       }
                                    >
                                       Dodaj
                                    </Button>
                                 </Grid>
                              </>
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
                           Edytuj
                        </Button>
                     </Grid>
                  </Grid>
               </Form>
            )}
         </Formik>
      </Paper>
   );
};

export default EditAlbumForm;
