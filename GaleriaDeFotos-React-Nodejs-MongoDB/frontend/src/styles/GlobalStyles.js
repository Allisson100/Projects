import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export default createGlobalStyle `
    * {
        box-sizing: border-box;
        margin: 0;
        outline: 0;
        padding: 0;
    }

    #root {
        height: 100%;
        min-height: 100vh;
        width: 100%;
    }

    body {
        background-color: ${props => props.theme.colors.primary};
    }
`