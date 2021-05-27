import { styled } from "@material-ui/core";

export const Container = styled("div")(({ theme }) => ({
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
   alignItems: "center",
   height: "100%",
   width: "100%",
   "& > .MuiCircularProgress-root": {
      marginBottom: theme.spacing(2),
   },
}));
