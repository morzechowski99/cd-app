import { actions } from "modules/artists/store";
import { useDispatch } from "react-redux";
import { object, SchemaOf, string } from "yup";

export interface AddArtistValues {
   name: string;
   surname: string;
   gender: string;
   musicCategory: string;
}

export const initialValues: AddArtistValues = {
   name: "",
   surname: "",
   gender: "",
   musicCategory: "",
};

export const useValidationSchema = (): SchemaOf<AddArtistValues> => {
   return object().shape({
      name: string().required("Imię jest wymagane"),
      surname: string().required("Nazwisko jest wymagane"),
      gender: string().required("Pole wymagane"),
      musicCategory: string().required("Pole wymagane"),
   });
};

export const useOnSubmit = () => {
   const dispatch = useDispatch();
   return async (values: AddArtistValues) => {
      await dispatch(actions.createArtist(values));
      await dispatch(actions.getArtists());
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
