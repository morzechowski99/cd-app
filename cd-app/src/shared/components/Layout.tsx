import { Container, Content } from "./Layout.style";
import { PropsWithChildren } from "react";
import AppBar from "./AppBar/AppBar";
import Drawer from "./Drawer";

export interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
   return (
      <Container>
         <AppBar />
         <Drawer />
         <Content>{children}</Content>
      </Container>
   );
};

export default Layout;
