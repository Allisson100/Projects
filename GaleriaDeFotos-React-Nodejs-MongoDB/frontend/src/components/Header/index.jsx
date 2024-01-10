import Logo from "./Logo";
import NavBar from "./NavBar";
import { HeaderContainer } from "./styles";

export default function Header () {
    return (
        <HeaderContainer>
            <Logo />
            <NavBar />
        </HeaderContainer>
    )
}