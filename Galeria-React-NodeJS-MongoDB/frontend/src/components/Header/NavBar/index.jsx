import { Link, useLocation } from "react-router-dom";
import { Item, List, NavbarContainer } from "./styles";

export default function NavBar() {

    const { pathname } = useLocation()

    return (
        <NavbarContainer>
            <List>
                <Item $pathname={pathname} $to='/'>
                    <Link to='/'>Home</Link>
                </Item>
                <Item $pathname={pathname} $to='/gallery'>
                    <Link to='/gallery'>Gallery</Link>
                </Item>
            </List>
        </NavbarContainer>
    )
}