import styled from 'styled-components';

export const StyledLevelPage = styled.main`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-around;
  }

  img {
    width: 100%;
    border-radius: 8px;
    cursor: crosshair;
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
`;

export const StyledMenu = styled.div.attrs((props) => ({
  style: {
    top: `${props.coordinates.y + 40}px`,
    left: `${props.coordinates.x - 110}px`,
  },
}))`
  position: absolute;
  width: 250px;
  height: 80px;
  display: flex;
  gap: 16px;
  background-color: transparent;
`;

export const MenuButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colours.primary};
  color: ${(props) => props.theme.colours.background};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${(props) => props.theme.colours.background};
  }
`;

export const StyledZoomer = styled.div.attrs((props) => ({
  style: {
    top: `${props.coordinates.y - 200}px`,
    left: `${props.coordinates.x - 200}px`,
  },
}))`
  height: 200px;
  width: 200px;
  position: absolute;
  overflow: hidden;
  outline: 2px solid ${(props) => props.theme.colours.primary};
  border-radius: 32px;
  pointer-events: none;

  @media (width <= ${(props) => props.theme.mobile}) {
    display: none !important;
  }
`;

export const MagnifiedImage = styled.img.attrs((props) => ({
  style: {
    transformOrigin: `${props.zoom.percentX}% ${props.zoom.percentY}%`,
  },
}))`
  transform: scale(10);
  filter: contrast(130%);
  padding: 0.65em; // This ensures that the transform-origin-based zooming works well everywhere for the scale of 10 by ensuring that the centre of the zoom is always where the cursor points
`;
