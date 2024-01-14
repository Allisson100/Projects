import styled from "styled-components"

const MainContainer = styled.div `
  height: 100%;
  padding: 0 2rem;
  width: 100%;
  position: relative;

  @media screen and (max-width: 600px) {
    padding: 0;
  }
`

export {
    MainContainer,
}