import {
   Grid,
   IconButton,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from "@material-ui/core";
import React from "react";
import { Artist } from "shared/types/interfaces";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

export interface ArtistsTableProps {
   artists: Artist[];
   deleteArtist: (id: number) => void;
}

const ArtistsTable = (props: ArtistsTableProps) => {
   return (
      <Grid item xs={12}>
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Imię</TableCell>
                     <TableCell>Nazwisko</TableCell>
                     <TableCell>Gatunek</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {props.artists.map((artist) => (
                     <TableRow key={artist.id}>
                        <TableCell>{artist.name}</TableCell>
                        <TableCell>{artist.surname}</TableCell>
                        <TableCell>{artist.musicCategory}</TableCell>
                        <TableCell>
                           <IconButton
                              onClick={() => props.deleteArtist(artist.id)}
                           >
                              <DeleteIcon />
                           </IconButton>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Grid>
   );
};

export default ArtistsTable;
