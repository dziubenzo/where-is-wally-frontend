import styled from 'styled-components';

export const StyledLeaderboardPage = styled.main`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 32px;

  .level-buttons {
    display: flex;
    justify-content: space-evenly;
  }
`;

export const LevelButton = styled.button`
  max-width: 175px;
  padding: 0.5em 1em;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colours.primary
      : props.theme.colours.background};
  color: ${(props) =>
    props.selected
      ? props.theme.colours.background
      : props.theme.colours.primary};
  border-radius: 16px;
  border: none;
  outline: ${(props) =>
    props.selected
      ? 'none'
      : `2px solid ${(props) => props.theme.colours.primary}`};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid white;
  }

  @media (hover: hover) {
    &:hover {
      background-color: ${(props) => props.theme.colours.primary};
      color: ${(props) => props.theme.colours.background};
      outline: none;
    }
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    max-width: 125px;
    font-size: 1rem;
    padding: 0.5em;
  }
`;

export const StyledLeaderboardTable = styled.table`
  th {
    font-weight: 600;
  }

  th,
  td {
    padding: 1em;
    border: 1px solid ${(props) => props.theme.colours.secondary};
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    th,
    td {
      font-size: ${(props) => props.theme.fontSizes.small};
      padding: 0.5em 0.3em;
    }
  }
`;
