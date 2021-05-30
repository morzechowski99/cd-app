import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { selectors } from "modules/artists/store";
import React from "react";
import { useSelector } from "react-redux";
import ConfirmationDialog from "shared/components/ConfirmationDialog";
import { LoadingStatus } from "shared/types/enums";
import { useStyles } from "./ArtistsTable.styles";
import {
   useColumns,
   useRows,
   useOnDeleteDialogClose,
} from "./ArtistsTable.utils";

export interface ArtistsTableProps {}

const ArtistsTable = () => {
   const styles = useStyles();
   const rows = useRows();
   const columns = useColumns();
   const loading = useSelector(selectors.isLoading);
   const deleteOpen = useSelector(selectors.isDeleteDialogOpen);
   const artistSelected = useSelector(selectors.getSelectedArtist);
   const onClose = useOnDeleteDialogClose();
   return (
      <div className={styles.root}>
         <ConfirmationDialog
            keepMounted={false}
            open={deleteOpen}
            title="Potwierdź usunięcie"
            value={artistSelected?.id}
            content={`Czy na pewno chcesz usunać ${artistSelected?.name} ${artistSelected?.surname}?`}
            onClose={onClose}
         />
         <DataGrid
            disableSelectionOnClick
            rows={rows}
            columns={columns}
            loading={loading === LoadingStatus.Pending}
            components={{ Toolbar: GridToolbar }}
            rowsPerPageOptions={[5, 15, 25, 50, 100]}
         />
      </div>
   );
};

export default ArtistsTable;
