import { Grid, Typography, Container, IconButton } from "@material-ui/core";
import ArtistsTable from "../components/ArtistsTable/ArtistsTable";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store";
import DetailsModal from "../components/DetailsModal/DetailsModal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddArtistModal from "../components/AddArtistModal/AddArtistModal";
import EditArtistModal from "../components/EditArtistModal/EditArtistModal";

export interface ArtistsListProps {}

const ArtistsList = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(actions.getArtists());
      dispatch(actions.resetState());
   }, [dispatch]);

   return (
      <Container>
         <Grid container justify="space-between" style={{ marginTop: 30 }}>
            <DetailsModal />
            <AddArtistModal />
            <EditArtistModal />
            <Grid item>
               <Typography variant="h3">Lista artystów</Typography>
            </Grid>
            <Grid item>
               <IconButton
                  onClick={() => dispatch(actions.openAddArtistModal())}
               >
                  <AddCircleIcon color="primary" fontSize="large" />
               </IconButton>
            </Grid>
         </Grid>

         <ArtistsTable />
      </Container>
   );
};

export default ArtistsList;
