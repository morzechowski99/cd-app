import { actions, selectors } from "modules/main/store";
import { useDispatch, useSelector } from "react-redux";
import { RegisterPayload } from "shared/services/Api";
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
   const dispatch = useDispatch();
   //@ts-ignore
   return async (values: RegisterFormValues, { validateForm }) => {
      var user: RegisterPayload = {
         name: values.name,
         surname: values.surname,
         email: values.email,
         password: values.password,
         login: values.login,
      };
      await dispatch(actions.registerUser(user));
      validateForm(values);
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};

export const useValidateEmail = () => {
   const emailExists = useSelector(selectors.emailExists);
   const dispatch = useDispatch();
   return (value: string) => {
      let error;
      if (emailExists) {
         error = "Podany adres emaile jest juz zajęty";
         dispatch(actions.resetEmailExists());
      }
      return error;
   };
};

export const useValidateLogin = () => {
   const loginExists = useSelector(selectors.loginExists);
   const dispatch = useDispatch();
   return (value: string) => {
      let error;
      if (loginExists) {
         error = "Podana nazwa użytkownika jest już zajęta";
         dispatch(actions.resetLoginExists());
      }
      return error;
   };
};
