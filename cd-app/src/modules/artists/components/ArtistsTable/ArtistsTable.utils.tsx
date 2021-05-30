import { IconButton } from "@material-ui/core";
import {
   GridCellParams,
   GridColDef,
   GridRowsProp,
} from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import DetailsIcon from "@material-ui/icons/Details";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "modules/artists/store";

export const useColumns = (): GridColDef[] => {
   const onSelect = useOnSelect();
   const onDeleteSelect = useOnDeleteSelect();
   const onEditSelect = useOnEditSelect();
   return [
      {
         field: "name",
         headerName: "Imię",
         flex: 1,
      },
      {
         field: "surname",
         headerName: "Nazwisko",
         flex: 1,
      },
      {
         field: "gender",
         headerName: "Płeć",
         flex: 1,
      },
      {
         field: "musicCategory",
         headerName: "Gatunek",
         flex: 1,
      },
      {
         field: "edit",
         headerName: "Edytuj",
         sortable: false,
         filterable: false,
         flex: 0.7,
         renderCell: (params: GridCellParams) => {
            const id = Number.parseInt(params.row.id as string);
            return (
               <IconButton color="primary" onClick={() => onEditSelect(id)}>
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
         flex: 0.7,
         renderCell: (params: GridCellParams) => {
            const id = Number.parseInt(params.row.id as string);
            return (
               <IconButton color="primary" onClick={() => onSelect(id)}>
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
         flex: 0.7,
         renderCell: (params: GridCellParams) => {
            const id = Number.parseInt(params.row.id as string);

            return (
               <IconButton
                  color="primary"
                  disabled={!(params.value as boolean)}
                  onClick={() => onDeleteSelect(id)}
               >
                  <DeleteIcon />
               </IconButton>
            );
         },
      },
   ];
};

export const useRows = (): GridRowsProp => {
   const artists = useSelector(selectors.getArtists);
   return artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      surname: artist.surname,
      gender: artist.gender,
      musicCategory: artist.musicCategory,
      delete: artist.deletable,
   }));
};

const useOnDeleteSelect = () => {
   const dispatch = useDispatch();
   const artists = useSelector(selectors.getArtists);
   return (id: number) => {
      const artist = artists.find((artist) => artist.id === id);
      if (artist !== undefined) {
         dispatch(actions.selectArtist(artist));
         dispatch(actions.openDeleteModal());
      }
   };
};

export const useOnDeleteDialogClose = () => {
   const dispatch = useDispatch();
   return async (result: boolean, value: any) => {
      if (result === true) {
         if (value !== undefined) {
            await dispatch(actions.deleteArtist(value as number));
         }
      } else dispatch(actions.closeDeleteModal());
   };
};

const useOnSelect = () => {
   const dispatch = useDispatch();
   const artists = useSelector(selectors.getArtists);
   return (id: number) => {
      const artist = artists.find((artist) => artist.id === id);
      if (artist !== undefined) {
         dispatch(actions.selectArtist(artist));
         dispatch(actions.openDetailsModal());
      }
   };
};

const useOnEditSelect = () => {
   const dispatch = useDispatch();
   const artists = useSelector(selectors.getArtists);
   return (id: number) => {
      const artist = artists.find((artist) => artist.id === id);
      if (artist !== undefined) {
         dispatch(actions.selectArtist(artist));
         dispatch(actions.openEditModal());
      }
   };
};
