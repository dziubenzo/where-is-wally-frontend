import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    background-color: ${(props) => props.theme.colours.background};
    color: ${(props) => props.theme.colours.primary};
  }

  *:focus-visible {
    outline: 3px solid ${(props) => props.theme.colours.primary};
  }

  body {
    display: flex;
    justify-content: center;
  }

  #root {
    display: grid;
    grid-template-rows: min-content auto min-content;
    place-items: center;
    min-height: 100svh;
    max-width: 1200px;
    padding: 0 1em 1em 1em;
  }
`;

export default GlobalStyle;
