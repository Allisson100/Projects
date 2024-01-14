import styled from "styled-components";

const HeaderContainer = styled.header `
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.secundary};
    display: flex;
    flex-direction: column;
    font-family: ${props => props.theme.fonts.primary};
    gap: .5rem;
    height: 10rem;
    justify-content: center;
    width: 100%;
`

export {
    HeaderContainer,
}