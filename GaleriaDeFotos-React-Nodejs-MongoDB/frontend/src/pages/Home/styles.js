import styled from "styled-components";

const HomeContainer = styled.main `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.secundary};
    font-family: ${props => props.theme.fonts.primary};
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
`

export {
    HomeContainer
}