import styled from 'styled-components';

export const StyledErrorPage = styled.main`
  text-align: center;

  img {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 600px;
    background-color: revert;
    filter: ${(props) => props.theme.colours.secondaryIcon};
    opacity: 0.3;
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    img {
      max-width: 90vw;
    }
  }
`;
