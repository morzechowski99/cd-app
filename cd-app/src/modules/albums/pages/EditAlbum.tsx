import { Container, makeStyles } from "@material-ui/core";
import { paths } from "config";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { actions, selectors } from "../store";
import EditAlbumForm from "../components/EditAlbumForm/EditAlbumForm";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(5),
   },
}));

export interface EditAlbumProps {}

const EditAlbum = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(actions.getArtists());
   }, [dispatch]);
   const classes = useStyles();
   const isEdited = useSelector(selectors.isEdited);
   const selectedAlbum = useSelector(selectors.getSelectedAlbum);
   if (isEdited || !selectedAlbum) return <Redirect to={paths.albums} />;
   return (
      <Container className={classes.root} maxWidth="lg">
         <EditAlbumForm />
      </Container>
   );
};

export default EditAlbum;
