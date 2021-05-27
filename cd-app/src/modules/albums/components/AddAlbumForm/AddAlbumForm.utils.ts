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
   return async (values: AddAlbumValues) => {};
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
