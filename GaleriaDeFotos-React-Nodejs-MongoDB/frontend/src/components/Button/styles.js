import styled from "styled-components";

const ButtonStyled = styled.button `
    padding: 1rem;
    height: 50px;
    display: flex;

    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.secundary};
    border: 2px solid ${props => props.theme.colors.secundary};
    border-radius: 1rem;
    transition: .2s;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    &:active {
        cursor: pointer;
        transform: scale(0.95);
    }
`

export {
    ButtonStyled,
}