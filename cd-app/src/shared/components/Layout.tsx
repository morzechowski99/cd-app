import { Container, Content } from './Layout.style'
import { PropsWithChildren } from 'react'
import AppBar from "./AppBar/AppBar";

export interface LayoutProps {
    
}
 
const Layout = ({children} : PropsWithChildren<LayoutProps>) => {
    return <Container>
        <AppBar/>
        <Content>
            {children}
        </Content>
    </Container>;
}
 
export default Layout;