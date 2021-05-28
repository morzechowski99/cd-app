import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingStatus } from "shared/types/enums";
import { object, string, SchemaOf } from "yup";
import { actions, selectors } from "shared/store";

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
   const dispatch = useDispatch();
   return async (values: LoginFormValues) => {
      await dispatch(actions.auth.login(values));
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};

export const useError: () => boolean = () => {
   const status = useSelector(selectors.auth.getAuthStatus);

   const [errorVisible, setErrorVisible] = useState<boolean>(false);

   useEffect(() => {
      if (status === LoadingStatus.Failed) setErrorVisible(true);
      else setErrorVisible(false);
   }, [status]);

   return errorVisible;
};
