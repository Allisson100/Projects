import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
`;

const FilesContainer = styled.div `
    width: 80%;
`

const List = styled.ul `
    list-style: none;
    display: flex;
    flex-direction: column;
`

const Item = styled.li`
    display: flex;
    height: 3.5rem;
    border: 2px solid ${props => props.theme.colors.secundary};
    border-radius: 1rem;
    padding: .5rem;
    align-items: center;
    gap: 1rem;

    @media screen and (max-width: 1100px) {
        justify-content: space-between;
    }
`

const FileName = styled.span`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    /* Estilização da barra de rolagem */
    &::-webkit-scrollbar {
        height: 5px; /* Largura da barra de rolagem */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888; /* Cor do polegar da barra de rolagem */
        border-radius: 6px; /* Borda arredondada do polegar */
    }

    &::-webkit-scrollbar-track {
        background-color: #f1f1f1; /* Cor de fundo da barra de rolagem */
        border-radius: 6px; /* Borda arredondada da trilha da barra de rolagem */
    }

    @media screen and (max-width: 1100px) {
        width: 60%;
    }
`

const FileSize = styled.span`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const Loading = styled.div`
    width: 40%;
    height: 80%;
    background-color: ${props => props.theme.colors.secundary};
    overflow: hidden;
    position: relative;
    border-radius: 1rem;

    &::before {
        content: '';
        display: block;
        height: 100%;
        background-color: ${props => props.theme.colors.loading};
        animation: ${loadingAnimation} 1s linear forwards;
        border-radius: 1rem;
    }

    @media screen and (max-width: 1100px) {
        display: none;
    }
`

const CloseIcon = styled.span `
    &:hover {
        cursor: pointer;
    }
`

export {
    FilesContainer,
    List,
    Item,
    FileName,
    FileSize,
    Loading,
    CloseIcon,
}