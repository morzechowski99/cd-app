import { Toolbar } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { useStyles } from "./AlbumsTable.style";
import { useRows, useColumns } from "./AlbumsTable.utils";

export interface AlbumsTableProps {}

const AlbumsTable = () => {
   const rows = useRows();
   const styles = useStyles();
   const columns = useColumns();
   return (
      <div className={styles.root}>
         <DataGrid
            disableSelectionOnClick
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
         />
      </div>
   );
};

export default AlbumsTable;
