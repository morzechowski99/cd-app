import {
   Dialog,
   DialogTitle,
   DialogContent,
   Box,
   Typography,
   IconButton,
   DialogActions,
   Grid,
   Button,
   MenuItem,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TextField } from "formik-material-ui";
import { useTheme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "modules/artists/store";
import { useForm } from "./AddArtistModal.utils";
import { Field, Form, Formik } from "formik";
import React from "react";
import Loader from "shared/components/Loader/Loader";

export interface AddArtistModalProps {}

const AddArtistModal = (props: AddArtistModalProps) => {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
   const isOpen = useSelector(selectors.isAddArtistDialogOpen);
   const dispatch = useDispatch();
   const formProps = useForm();

   const onClose = () => {
      dispatch(actions.closeAddArtistModal());
   };

   return (
      <Dialog
         aria-labelledby="info-dialog-title"
         open={isOpen}
         fullScreen={fullScreen}
         maxWidth="md"
         fullWidth
         scroll="body"
         onClose={() => {
            onClose();
         }}
      >
         <Formik {...formProps} validateOnBlur>
            {({ isSubmitting }) => (
               <Form>
                  <DialogTitle>
                     <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>
                           <Typography variant="h6">Dodaj artystę</Typography>
                        </Box>
                        <Box>
                           <IconButton
                              onClick={() => {
                                 onClose();
                              }}
                           >
                              <CloseIcon />
                           </IconButton>
                        </Box>
                     </Box>
                  </DialogTitle>
                  <DialogContent style={{ overflowX: "hidden" }}>
                     <Grid container spacing={2} justify="center">
                        {isSubmitting && (
                           <Box position="absolute" zIndex="modal" height="50%">
                              <Loader />
                           </Box>
                        )}
                        <Grid item xs={12} md={6}>
                           <Field
                              component={TextField}
                              id="name"
                              name="name"
                              label="Imię"
                              fullWidth
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <Field
                              component={TextField}
                              id="surname"
                              name="surname"
                              label="Nazwisko"
                              fullWidth
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <Field
                              component={TextField}
                              select
                              id="gender"
                              name="gender"
                              label="Płeć"
                              fullWidth
                           >
                              <MenuItem value="Mężczyzna">Mężczyzna</MenuItem>
                              <MenuItem value="Kobieta">Kobieta</MenuItem>
                           </Field>
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <Field
                              component={TextField}
                              select
                              id="musicCategory"
                              name="musicCategory"
                              label="Gatunek muzyczny"
                              fullWidth
                           >
                              <MenuItem value="Rap">Rap</MenuItem>
                              <MenuItem value="Blues">Blues</MenuItem>
                              <MenuItem value="Rock">Rock</MenuItem>
                              <MenuItem value="Pop">Pop</MenuItem>
                              <MenuItem value="Jazz">Jazz</MenuItem>
                              <MenuItem value="Metal">Metal</MenuItem>
                              <MenuItem value="Hard Rock">Hark Rock</MenuItem>
                              <MenuItem value="Trap">Trap</MenuItem>
                              <MenuItem value="Disco Polo">Disco Polo</MenuItem>
                           </Field>
                        </Grid>
                     </Grid>
                  </DialogContent>
                  <DialogActions>
                     <Box margin={2}>
                        <Button
                           type="submit"
                           color="primary"
                           variant="outlined"
                        >
                           Dodaj
                        </Button>
                     </Box>
                  </DialogActions>
               </Form>
            )}
         </Formik>
      </Dialog>
   );
};

export default AddArtistModal;
