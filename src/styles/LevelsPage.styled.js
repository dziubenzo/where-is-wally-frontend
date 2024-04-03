import styled from 'styled-components';

export const StyledLevelsPage = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 48px;

  @media (width <= ${(props) => props.theme.mobile}) {
    gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export const StyledLevelCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  outline: 2px solid ${(props) => props.theme.colours.secondary};
  border-radius: 8px;

  a {
    text-decoration: none;
  }

  h2 {
    position: absolute;
    left: -16px;
    font-weight: 700;
    background: transparent;
  }

  p {
    padding: 1em;
    font-weight: 500;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 0 0 8px 8px;
  }

  @media (hover: hover) {
    div {
      overflow: hidden;

      img {
        transition: all 1s ease;

        &:hover {
          filter: contrast(1.5);
          transform: scale(3);
        }
      }
    }
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    h2 {
      position: absolute;
      left: 8px;
      top: 8px;
      font-weight: 700;
      background: transparent;
    }
  }
`;
