import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 64px;
  margin-bottom: 2em;

  a[href='/'] {
    width: 125px;
  }

  a[href='/levels'],
  a[href='/leaderboard'] {
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration: none;
    padding: 0.2em 0.5em;
    border-radius: 8px;
  }

  @media (hover: hover) {
    a[href='/levels'],
    a[href='/leaderboard'] {
      transition: background-color 0.2s ease-in;

      &:hover {
        background-color: ${(props) => props.theme.colours.tertiary};
      }
    }
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    gap: 0;

    a[href='/levels'],
    a[href='/leaderboard'] {
      padding: revert;
      font-size: revert;
    }

    a[href='/'] {
      width: 75px;
    }
  }
`;
