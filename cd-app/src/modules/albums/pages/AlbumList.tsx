import { Container, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AlbumsTable from "../components/AlbumsTable/AlbumsTable";
import { actions } from "../store";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DetailsModal from "../components/DetailsModal/DetailsModal";
import { useRedirect } from "shared/hooks/useRedirect";
import { paths } from "config";

export interface AlbumListProps {}

const AlbumList = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(actions.getAlbums());
   }, [dispatch]);

   useEffect(() => {
      dispatch(actions.resetState());
   }, [dispatch]);

   const goToAddAlbum = useRedirect(paths.addAlbum);

   return (
      <Container>
         <Grid container justify="space-between" style={{ marginTop: 30 }}>
            <DetailsModal />
            <Grid item>
               <Typography variant="h3">Lista albumów</Typography>
            </Grid>
            <Grid item>
               <IconButton onClick={goToAddAlbum}>
                  <AddCircleIcon color="primary" fontSize="large" />
               </IconButton>
            </Grid>
         </Grid>

         <AlbumsTable />
      </Container>
   );
};

export default AlbumList;
