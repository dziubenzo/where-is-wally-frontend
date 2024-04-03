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
    cursor: crosshair;
  }
`;

export const StyledSelector = styled.div`
  position: absolute;
  top: ${(props) => props.coordinates.y}px;
  left: ${(props) => props.coordinates.x}px;
  background: transparent;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 3px dashed ${(props) => props.theme.colours.primary};
  pointer-events: none;
`;

export const StyledMenu = styled.div`
  position: absolute;
  top: ${(props) => props.coordinates.y + 40}px;
  left: ${(props) => props.coordinates.x - 110}px;
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
