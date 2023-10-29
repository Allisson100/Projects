import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100%;
        height: 100vh;
        display: flex;
    }

    #root {
        width: 100%
    }
`

export default Global