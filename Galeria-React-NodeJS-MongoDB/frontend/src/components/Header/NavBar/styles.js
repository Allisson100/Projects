import styled from "styled-components";

const NavbarContainer = styled.nav `
    align-items: center;
    display: flex;
    height: 15%;
    justify-content: center;
    width: 100%;
`

const List = styled.ul `
    align-items: center;
    display: flex;
    gap: 4rem;
    height: 100%;
    justify-content: center;
    list-style: none;
`
const Item = styled.li `
    border-bottom: ${(props) => props.$pathname === props.$to ? `2px solid ${props.theme.colors.secundary}` : "none"};
    font-size: ${props => props.theme.sizes.medium};
    
    a{
        color: inherit;
        text-decoration: none;
    }
`

export {
    NavbarContainer,
    List,
    Item,
}