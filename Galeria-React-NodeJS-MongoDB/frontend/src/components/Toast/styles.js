import styled from "styled-components";

const ToastContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40%;

    display: ${(props) => props.$isVisible ? 'flex' : 'none'};
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: .5rem;

    text-align: center;
`

const ToastText = styled.div`
    width: 100%;
    height: 80px;
    background-color:${(props) => props.$status === 'success' ? 'green' : 'red'};
    font-family: ${(props) => props.theme.fonts.primary};
    color: ${(props) => props.theme.colors.secundary};

    border-radius: 1rem;

    transition: opacity 3s linear;

    opacity: ${(props) => props.$isVisible ? 1 : 0};
    
    display: flex;
    justify-content: center;
    align-items: center;
`

export {
    ToastContainer,
    ToastText
}