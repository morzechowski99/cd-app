import {
   Dialog,
   DialogTitle,
   DialogContent,
   Box,
   Typography,
   IconButton,
   Grid,
   Table,
   TableContainer,
   Paper,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "modules/albums/store";

export interface DetailsProps {}

const Details = (props: DetailsProps) => {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
   const isOpen = useSelector(selectors.isDetailsOpen);
   const dispatch = useDispatch();
   const album = useSelector(selectors.getSelectedAlbum);

   const onClose = () => {
      dispatch(actions.closeDetailsModal());
   };

   return (
      <Dialog
         aria-labelledby="info-dialog-title"
         open={isOpen}
         fullScreen={fullScreen}
         maxWidth="lg"
         fullWidth
         scroll="body"
         onClose={() => {
            onClose();
         }}
      >
         <DialogTitle>
            <Box display="flex" alignItems="center">
               <Box flexGrow={1}>
                  <Typography variant="h6">Szczegóły albumu</Typography>
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
            <Grid container spacing={2} justify="space-between">
               <Grid item xs={12} md={4}>
                  <Box minHeight={40}>
                     <Typography variant="subtitle2">Nazwa</Typography>
                     <Typography variant="subtitle1">{album?.title}</Typography>
                  </Box>
               </Grid>

               <Grid item xs={12} md={4}>
                  <Box minHeight={40}>
                     <Typography variant="subtitle2">Wersja</Typography>
                     <Typography variant="subtitle1">
                        {album?.version}
                     </Typography>
                  </Box>
               </Grid>

               <Grid item xs={12} md={4}>
                  <Box minHeight={40}>
                     <Typography variant="subtitle2">Rok Wydania</Typography>
                     <Typography variant="subtitle1">{album?.year}</Typography>
                  </Box>
               </Grid>
            </Grid>
            <Typography variant="h6">Artyści:</Typography>

            {album?.artists.map((artist) => {
               return <div>{`${artist.name} ${artist.surname}`}</div>;
            })}
            <Typography variant="h6">Utwory:</Typography>
            <TableContainer component={Paper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Tytuł</TableCell>
                        <TableCell>Rok Wydania</TableCell>
                        <TableCell>Czas trwania</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {album?.tracks.map((track) => (
                        <TableRow key={track.id}>
                           <TableCell>{track.title}</TableCell>
                           <TableCell>{track.year}</TableCell>
                           <TableCell>{track.duration}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </DialogContent>
      </Dialog>
   );
};

export default Details;
