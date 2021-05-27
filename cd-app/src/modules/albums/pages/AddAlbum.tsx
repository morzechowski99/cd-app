import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AddAlbumForm from "../components/AddAlbumForm/AddAlbumForm";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(5),
   },
}));

export interface AddAlbumProps {}

const AddAlbum = () => {
   const classes = useStyles();
   return (
      <Container className={classes.root} maxWidth="lg">
         <AddAlbumForm />
      </Container>
   );
};

export default AddAlbum;
