import { Container, makeStyles, Typography } from "@material-ui/core";
import { paths } from "config";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import AddAlbumForm from "../components/AddAlbumForm/AddAlbumForm";
import { actions, selectors } from "../store";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(5),
   },
}));

export interface AddAlbumProps {}

const AddAlbum = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(actions.getArtists());
   }, [dispatch]);
   const classes = useStyles();
   const isCreated = useSelector(selectors.isCreated);
   if (isCreated) return <Redirect to={paths.albums} />;
   return (
      <Container className={classes.root} maxWidth="lg">
         <AddAlbumForm />
      </Container>
   );
};

export default AddAlbum;
