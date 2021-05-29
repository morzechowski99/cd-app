import { actions, selectors } from "modules/albums/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Artist } from "shared/types/interfaces";
import { object, string, SchemaOf, number, array } from "yup";

interface Track {
   id: number | null | undefined;
   title: string;
   year: number | null;
   duration: string;
}

export interface AddAlbumValues {
   title: string;
   version: string;
   year: number | null;
   tracks: Track[];
   artistsIds: number[];
}

export const useInitialValues = (): AddAlbumValues => {
   const album = useSelector(selectors.getSelectedAlbum);
   return {
      title: album?.title || "",
      version: album?.version || "",
      year: album?.year || null,
      tracks: album?.tracks || [],
      artistsIds: album?.artists.map((artist) => artist.id) || [],
   };
};

export const useValidationSchema = (): SchemaOf<AddAlbumValues> => {
   return object().shape({
      title: string().required("Tytuł jest wymagany"),
      version: string().required("Pole wymagane"),
      year: number().required("Pole wymagane").typeError("Rok musi być liczbą"),
      tracks: array().of(
         object().shape({
            id: number(),
            title: string().required("Tytuł jest wymagany"),
            year: number()
               .required("Pole wymagane")
               .typeError("Rok musi być liczbą")
               .nullable(),
            duration: string().required("Długość jest wymagana"),
         })
      ),
      artistsIds: array()
         .of(number().required())
         .min(1, "Musisz dodać co najmniej jednego artystę"),
   });
};

export const useOnSubmit = () => {
   const dispatch = useDispatch();
   const album = useSelector(selectors.getSelectedAlbum);
   return async (values: AddAlbumValues) => {
      if (album)
         await dispatch(actions.editAlbum({ id: album.id, album: values }));
      dispatch(actions.getAlbums());
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   const initialValues = useInitialValues();

   return { initialValues, validationSchema, onSubmit };
};

export const useSelectedArtists = (): [
   Artist[],
   (artist: Artist) => void,
   (id: number) => void
] => {
   const album = useSelector(selectors.getSelectedAlbum);
   const [selectedArtists, setSelectedArtists] = useState<Artist[]>(
      album?.artists || []
   );

   const addArtist = (artist: Artist) => {
      if (selectedArtists.findIndex((a) => a.id === artist.id) === -1)
         setSelectedArtists([...selectedArtists, artist]);
   };

   const removeArtist = (id: number) => {
      const newArtists = selectedArtists.filter((artist) => artist.id !== id);
      setSelectedArtists([...newArtists]);
   };

   return [selectedArtists, addArtist, removeArtist];
};
