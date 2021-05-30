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
import { actions, selectors } from "modules/artists/store";

export interface DetailsProps {}

const Details = (props: DetailsProps) => {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
   const isOpen = useSelector(selectors.isDetailsOpen);
   const dispatch = useDispatch();
   const artist = useSelector(selectors.getSelectedArtist);

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
                  <Typography variant="h6">Szczegóły artysty</Typography>
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
                     <Typography variant="subtitle2">Imię</Typography>
                     <Typography variant="subtitle1">{artist?.name}</Typography>
                  </Box>
               </Grid>

               <Grid item xs={12} md={4}>
                  <Box minHeight={40}>
                     <Typography variant="subtitle2">Nazwisko</Typography>
                     <Typography variant="subtitle1">
                        {artist?.surname}
                     </Typography>
                  </Box>
               </Grid>

               <Grid item xs={12} md={4}>
                  <Box minHeight={40}>
                     <Typography variant="subtitle2">Płeć</Typography>
                     <Typography variant="subtitle1">
                        {artist?.gender}
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
            <Typography variant="h6">Albumy:</Typography>
            <TableContainer component={Paper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Tytuł</TableCell>
                        <TableCell>Wersja</TableCell>
                        <TableCell>Rok wydania</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {artist?.albums.map((album) => (
                        <TableRow key={album.id}>
                           <TableCell>{album.title}</TableCell>
                           <TableCell>{album.version}</TableCell>
                           <TableCell>{album.year}</TableCell>
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
