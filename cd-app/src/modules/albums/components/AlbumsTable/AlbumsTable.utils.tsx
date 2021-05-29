import { IconButton } from "@material-ui/core";
import {
   GridCellParams,
   GridColDef,
   GridRowsProp,
} from "@material-ui/data-grid";
import { actions, selectors } from "modules/albums/store";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import DetailsIcon from "@material-ui/icons/Details";
import { useRedirect } from "shared/hooks/useRedirect";
import { paths } from "config";

export const useColumns = (): GridColDef[] => {
   const onSelect = useOnSelect();
   const onDeleteSelect = useOnDeleteSelect();
   const onEditSelect = useOnEditSelect();
   return [
      {
         field: "title",
         headerName: "Tytuł",
         flex: 1,
      },
      {
         field: "version",
         headerName: "Wersja",
         flex: 1,
      },
      {
         field: "year",
         headerName: "Rok wydania",
         flex: 1,
      },
      {
         field: "edit",
         headerName: "Edytuj",
         sortable: false,
         filterable: false,
         flex: 0.4,
         renderCell: (params: GridCellParams) => {
            const id = Number.parseInt(params.row.id as string);
            return (
               <IconButton onClick={() => onEditSelect(id)}>
                  <EditIcon />
               </IconButton>
            );
         },
      },
      {
         field: "details",
         headerName: "Szczegóły",
         sortable: false,
         filterable: false,
         flex: 0.5,
         renderCell: (params: GridCellParams) => {
            const id = Number.parseInt(params.row.id as string);
            return (
               <IconButton onClick={() => onSelect(id)}>
                  <DetailsIcon />
               </IconButton>
            );
         },
      },
      {
         field: "delete",
         headerName: "Usuń",
         sortable: false,
         filterable: false,
         flex: 0.4,
         renderCell: (params: GridCellParams) => {
            const id = Number.parseInt(params.row.id as string);
            return (
               <IconButton onClick={() => onDeleteSelect(id)}>
                  <DeleteIcon />
               </IconButton>
            );
         },
      },
   ];
};

export const useRows = (): GridRowsProp => {
   const albums = useSelector(selectors.getAlbums);
   return albums.map((album) => ({
      id: album.id,
      title: album.title,
      version: album.version,
      year: album.year,
   }));
};

const useOnSelect = () => {
   const dispatch = useDispatch();
   const albums = useSelector(selectors.getAlbums);
   return (id: number) => {
      const album = albums.find((album) => album.id === id);
      if (album !== undefined) {
         dispatch(actions.selectAlbum(album));
         dispatch(actions.openDetailsModal());
      }
   };
};

const useOnEditSelect = () => {
   const dispatch = useDispatch();
   const redirect = useRedirect(paths.editAlbum);
   const albums = useSelector(selectors.getAlbums);
   return (id: number) => {
      const album = albums.find((album) => album.id === id);
      if (album !== undefined) {
         dispatch(actions.selectAlbum(album));
         redirect();
      }
   };
};

const useOnDeleteSelect = () => {
   const dispatch = useDispatch();
   const albums = useSelector(selectors.getAlbums);
   return (id: number) => {
      const album = albums.find((album) => album.id === id);
      if (album !== undefined) {
         dispatch(actions.selectAlbum(album));
         dispatch(actions.openDeleteModal());
      }
   };
};

export const useOnDeleteDialogClose = () => {
   const dispatch = useDispatch();
   return async (result: boolean, value: any) => {
      if (result === true) {
         if (value !== undefined) {
            await dispatch(actions.deleteAlbum(value as number));
         }
      } else dispatch(actions.closeDeleteModal());
   };
};
