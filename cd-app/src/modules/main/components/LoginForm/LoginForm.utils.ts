import { object, string, SchemaOf } from "yup";

export interface LoginFormValues {
   login: string;
   password: string;
}

export const initialValues: LoginFormValues = {
   login: "",
   password: "",
};

export const useValidationSchema = (): SchemaOf<LoginFormValues> => {
   return object().shape({
      login: string().required("Nazwa użytkownika jest wymagana"),
      password: string().required("Hasło jest wymagane"),
   });
};

export const useOnSubmit = () => {
   return async (values: LoginFormValues) => {};
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
