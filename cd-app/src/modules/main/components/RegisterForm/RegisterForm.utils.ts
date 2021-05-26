import { object, string, SchemaOf, ref } from "yup";

export interface RegisterFormValues {
   login: string;
   password: string;
   passwordConfirm: string;
   name: string;
   surname: string;
   email: string;
}

export const initialValues: RegisterFormValues = {
   login: "",
   password: "",
   passwordConfirm: "",
   name: "",
   surname: "",
   email: "",
};

export const useValidationSchema = (): SchemaOf<RegisterFormValues> => {
   return object().shape({
      login: string().required("Nazwa użytkownika jest wymagana"),
      password: string()
         .required("Hasło jest wymagane")
         .min(8, "Hasło musi mieć co najmniej 8 znaków")
         .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Hasło musi zawierać wielką literę, małą literę, cyfrę oraz znak specjalny"
         ),
      passwordConfirm: string()
         .required("Pole wymagane")
         .oneOf([ref("password"), null], "Podane hasła nie są identyczne"),
      name: string().required("Pole wymagane"),
      surname: string().required("Pole wymagane"),
      email: string().required("Pole wymagane").email("Zły format email"),
   });
};

export const useOnSubmit = () => {
   return async (values: RegisterFormValues) => {};
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
