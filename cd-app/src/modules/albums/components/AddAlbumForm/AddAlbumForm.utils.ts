import { actions } from "modules/albums/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Artist } from "shared/types/interfaces";
import { object, string, SchemaOf, number, array } from "yup";

interface Track {
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

export const initialValues: AddAlbumValues = {
   title: "",
   version: "",
   year: null,
   tracks: [{ title: "", year: null, duration: "" }],
   artistsIds: [],
};

export const useValidationSchema = (): SchemaOf<AddAlbumValues> => {
   return object().shape({
      title: string().required("Tytuł jest wymagany"),
      version: string().required("Pole wymagane"),
      year: number().required("Pole wymagane").typeError("Rok musi być liczbą"),
      tracks: array().of(
         object().shape({
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
   return async (values: AddAlbumValues) => {
      await dispatch(actions.createAlbum(values));
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};

export const useSelectedArtists = (): [
   Artist[],
   (artist: Artist) => void,
   (id: number) => void
] => {
   const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);

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
