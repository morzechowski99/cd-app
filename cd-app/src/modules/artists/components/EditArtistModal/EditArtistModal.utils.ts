import { actions, selectors } from "modules/artists/store";
import { useDispatch, useSelector } from "react-redux";
import { object, SchemaOf, string } from "yup";

export interface EditArtistValues {
   name: string;
   surname: string;
   gender: string;
   musicCategory: string;
}

export const useGetInitialValues = (): EditArtistValues => {
   const artist = useSelector(selectors.getSelectedArtist);
   return {
      name: artist?.name || "",
      surname: artist?.surname || "",
      gender: artist?.gender || "",
      musicCategory: artist?.musicCategory || "",
   };
};

export const useValidationSchema = (): SchemaOf<EditArtistValues> => {
   return object().shape({
      name: string().required("Imię jest wymagane"),
      surname: string().required("Nazwisko jest wymagane"),
      gender: string().required("Pole wymagane"),
      musicCategory: string().required("Pole wymagane"),
   });
};

export const useOnSubmit = () => {
   const dispatch = useDispatch();
   const artist = useSelector(selectors.getSelectedArtist);
   return async (values: EditArtistValues) => {
      await dispatch(
         actions.editArtist({ id: artist?.id || 0, artist: values })
      );
      await dispatch(actions.getArtists());
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   const initialValues = useGetInitialValues();
   return { initialValues, validationSchema, onSubmit };
};
