import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
100% {background-position-x: 600%}
`;

export const StyledLevelsPage = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 48px;
  margin: 0 2em;

  @media (width <= ${(props) => props.theme.mobile}) {
    margin: 0 1em;
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

  h2 {
    position: absolute;
    left: -24px;
    font-weight: 700;
    background: transparent;
  }

  p {
    padding: 1em;
    font-weight: 500;
  }

  div {
    height: 100%;
    overflow: hidden;
    border-radius: 0 0 8px 8px;
    aspect-ratio: 16/9;

    a {
      text-decoration: none;
    }

    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 16/9;
      transform: scale(1.5);
      filter: contrast(1.2);
    }
  }

  .placeholder-div {
    height: 100%;
    overflow: hidden;
    border-radius: 0 0 8px 8px;
    aspect-ratio: 16/9;

    div {
      width: 3000px;
      aspect-ratio: 16/9;
      background: linear-gradient(
        -60deg,
        ${(props) => props.theme.colours.background} 30%,
        ${(props) => props.theme.colours.secondary} 40%,
        ${(props) => props.theme.colours.background} 50%
      );
      background-size: 40%;
      background-position-x: 100%;
      animation: ${shimmer} 10s infinite linear;
    }
  }

  @media (hover: hover) {
    div {
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
