import { ButtonStyled } from "./styles";

export default function Button({children , type}) {
    return (
        <ButtonStyled type={type}>{children}</ButtonStyled>
    )
}