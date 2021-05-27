import { styled, Theme } from "@material-ui/core";

const TOOLBAR_HEIGHT = 73;

export const Container = styled("div")({
   minHeight: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,
   display: "flex",
});

export const Content = styled("main")({
   flexGrow: 1,
   paddingTop: 60,
   padding: 24,
});
