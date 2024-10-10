import * as styled from 'styled-components';

const GlobalStyle = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-style: normal;
    background-color: ${(props) => props.theme.colours.background};
    color: ${(props) => props.theme.colours.primary};

    @supports (scrollbar-width: auto) {
      scrollbar-color: ${(props) => props.theme.colours.primary}
        ${(props) => props.theme.colours.background};
      scrollbar-width: scroll;
    }

    @supports selector(::-webkit-scrollbar) {
      &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colours.primary};
      }

      &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colours.background};
      }
    }
  }

  *:focus-visible {
    outline: 3px solid ${(props) => props.theme.colours.primary};
  }

  body {
    display: flex;
    justify-content: center;
    overflow-y: scroll;
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
