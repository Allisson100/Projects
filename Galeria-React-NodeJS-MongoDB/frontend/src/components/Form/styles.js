import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
`

const DropArea = styled.div`
    width: 80%;
    height: 25rem;
    border: 5px dashed #ccc;
    text-align: center;
    padding: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const FileInput = styled.input` 
    display: none;
`;

const Label = styled.label`
    &:hover {
        cursor: pointer;
    }
`

export {
    FormContainer,
    FileInput,
    Label,
    DropArea,
}