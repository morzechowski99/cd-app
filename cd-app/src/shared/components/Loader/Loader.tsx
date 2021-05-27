import { HTMLAttributes } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { Container } from "./Loader.style";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
   label?: string;
   size?: number;
}

const Loader = ({ label, size = 100, ...props }: LoaderProps) => (
   <Container {...props}>
      <CircularProgress size={size} />
      <Typography variant="subtitle1" color="textPrimary">
         {label}
      </Typography>
   </Container>
);

export default Loader;
