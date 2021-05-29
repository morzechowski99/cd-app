import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { selectors } from "modules/albums/store";
import { useSelector } from "react-redux";
import ConfirmationDialog from "shared/components/ConfirmationDialog";
import { LoadingStatus } from "shared/types/enums";
import { useStyles } from "./AlbumsTable.style";
import {
   useRows,
   useColumns,
   useOnDeleteDialogClose,
} from "./AlbumsTable.utils";

export interface AlbumsTableProps {}

const AlbumsTable = () => {
   const rows = useRows();
   const styles = useStyles();
   const columns = useColumns();
   const loading = useSelector(selectors.isLoading);
   const deleteOpen = useSelector(selectors.isDeleteDialogOpen);
   const albumSelected = useSelector(selectors.getSelectedAlbum);
   const onClose = useOnDeleteDialogClose();
   return (
      <div className={styles.root}>
         <ConfirmationDialog
            keepMounted={false}
            open={deleteOpen}
            title="Potwierdź usunięcie"
            value={albumSelected?.id}
            content={`Czy na pewno chcesz usunać ${albumSelected?.title}? Spowoduje to trwałe usunięcie albumu wraz z utworami.`}
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

export default AlbumsTable;
