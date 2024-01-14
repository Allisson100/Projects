import styled from "styled-components";

const ImageStyled = styled.img`
    width: 100%;
    display: block;
    border-radius: 1rem;
    transition: .2s;
    filter: brightness(0.6);
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
        filter: brightness(1);
    }

    &:active {
        transform: scale(0.98);
    }
`

export {
    ImageStyled
}