import styled from 'styled-components';

export const StyledLevelPage = styled.main`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-between;
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
  border: 3px solid red;
  pointer-events: none;
`;
