import styled from 'styled-components';

export const StyledLevelPage = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .game-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    text-align: center;

    button {
      width: 125px;
      padding: 0.5em;
      border-radius: 16px;
      font-size: ${(props) => props.theme.fontSizes.standard};
      background-color: ${(props) => props.theme.colours.background};
      color: ${(props) => props.theme.colours.primary};
      outline: 2px solid ${(props) => props.theme.colours.primary};
      border: none;
      cursor: pointer;

      &:focus-visible {
        outline: 4px solid ${(props) => props.theme.colours.primary};
      }
    }

    span {
      font-weight: 600;
      font-size: ${(props) => props.theme.fontSizes.medium};
      letter-spacing: 1px;
      font-family: 'Reddit Mono', monospace;
    }
  }

  img {
    width: 100%;
    border-radius: 8px;
    cursor: crosshair;
  }

  @media (hover: hover) {
    .game-info {
      button:hover {
        outline: none;
        background-color: ${(props) => props.theme.colours.primary};
        color: ${(props) => props.theme.colours.background};
      }
    }
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    .game-info {
      p {
        font-size: ${(props) => props.theme.fontSizes.small};
      }

      button {
        width: revert;
      }
    }
  }
`;

export const StyledSelector = styled.div.attrs((props) => ({
  style: {
    top: `${props.coordinates.y}px`,
    left: `${props.coordinates.x}px`,
  },
}))`
  position: absolute;
  background: transparent;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 3px dashed ${(props) => props.theme.colours.primary};
  pointer-events: none;
  z-index: 1;
`;

export const StyledCharacterMarker = styled.div.attrs((props) => ({
  style: {
    top: `${props.position.pixelY}px`,
    left: `${props.position.pixelX}px`,
  },
}))`
  position: absolute;
  background: transparent;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 3px solid green;
  pointer-events: none;
`;

export const StyledHintMarker = styled.div.attrs((props) => ({
  style: {
    top: `${props.position.pixelY}px`,
    left: `${props.position.pixelX}px`,
  },
}))`
  position: absolute;
  background: transparent;
  width: ${(props) => props.size.sizeX}px;
  height: ${(props) => props.size.sizeY}px;
  border: 3px solid ${(props) => props.hintcolour};
  pointer-events: none;
`;

export const StyledMenu = styled.div.attrs((props) => ({
  style: {
    top: `${props.coordinates.y + 40}px`,
    left: `${props.coordinates.x - 185}px`,
  },
}))`
  width: 400px;
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 16px;
  background-color: transparent;
  z-index: 1;
`;

export const StyledSelectorButton = styled.button`
  width: 100px;
  height: 150px;
  border: none;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colours.primary};
  color: ${(props) => props.theme.colours.background};
  overflow: hidden;

  img {
    height: 100%;
    background: transparent;
    cursor: pointer;
  }

  &:focus-visible {
    outline: 3px solid ${(props) => props.theme.colours.background};
  }

  @media (hover: hover) {
    img {
      transform-origin: 50% 0%;
      transition: transform 0.5s ease-in;

      &:hover {
        transform: scale(1.5);
      }
    }
  }
`;

export const StyledZoomer = styled.div.attrs((props) => ({
  style: {
    top: `${props.coordinates.y - 300}px`,
    left: `${props.coordinates.x - 300}px`,
  },
}))`
  display: flex;
  height: 300px;
  width: 300px;
  position: absolute;
  overflow: hidden;
  outline: 2px solid ${(props) => props.theme.colours.primary};
  border-radius: 32px;
  pointer-events: none;
  z-index: 1;

  @media (width <= ${(props) => props.theme.mobile}) {
    display: none !important;
  }
`;

export const MagnifiedImage = styled.img.attrs((props) => ({
  style: {
    transformOrigin: `${props.zoom.percentX}% ${props.zoom.percentY}%`,
  },
}))`
  transform: scale(7);
  filter: contrast(130%);
  padding: 1.4em; // This ensures that the transform-origin-based zooming works well everywhere for the scale of 7 by ensuring that the centre of the zoom is always where the cursor points
`;

export const StyledGameOverModal = styled.dialog`
  display: none;

  &[open] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    aspect-ratio: 1 / 1;
    border: none;
    outline: 4px solid ${(props) => props.theme.colours.primary};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 8px;

    form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;

      label {
        cursor: pointer;
      }

      input {
        font-size: ${(props) => props.theme.fontSizes.standard};
        width: 20ch;
        padding: 0.5em;
        border: none;
        outline: 2px solid ${(props) => props.theme.colours.primary};
        border-radius: 8px;
        text-align: center;

        &:focus-visible {
          outline: 3px solid ${(props) => props.theme.colours.primary};
        }
      }
    }

    p {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }

    .result-span {
      font-size: ${(props) => props.theme.fontSizes.large};
      font-weight: 600;
      letter-spacing: 2px;
      background-color: ${(props) => props.theme.colours.primary};
      color: ${(props) => props.theme.colours.background};
      padding: 2em 0.75em;
      border-radius: 50%;
    }

    button {
      max-width: 200px;
      padding: 0.5em;
      border-radius: 16px;
      font-size: ${(props) => props.theme.fontSizes.medium};
      background-color: ${(props) => props.theme.colours.primary};
      color: ${(props) => props.theme.colours.background};
      border: none;
      cursor: pointer;

      &:focus-visible {
        outline: 3px solid white;
      }
    }

    .record-submitted-btn {
      max-width: 250px;

      &:focus-visible {
        outline: none;
      }
    }

    span {
      font-weight: 600;
    }

    .error-message {
      text-align: center;

      p {
        font-size: ${(props) => props.theme.fontSizes.standard};
        color: red;
      }

      a {
        text-decoration-color: red;
        text-underline-offset: 0.4em;
      }
    }

    &::backdrop {
      backdrop-filter: blur(2px);
    }
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    &[open] {
      width: calc(100% - 1em);
      height: 60%;
    }
  }
`;
