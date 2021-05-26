import { useState } from "react";
import { TextField, TextFieldProps } from "formik-material-ui";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

interface PasswordFieldProps extends TextFieldProps {}

const PasswordField = (props: PasswordFieldProps) => {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

   const toggleIsPasswordVisible = () =>
      setIsPasswordVisible((isVisible) => !isVisible);

   return (
      <TextField
         type={isPasswordVisible ? "text" : "password"}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton onClick={toggleIsPasswordVisible} edge="end">
                     {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
               </InputAdornment>
            ),
         }}
         {...props}
      />
   );
};

export default PasswordField;
