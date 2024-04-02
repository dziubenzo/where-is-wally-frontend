import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.primary};
  }
`;

export default GlobalStyle;
