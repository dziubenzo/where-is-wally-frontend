import styled from 'styled-components';

type StyledHeaderProps = {
  levels: boolean;
  leaderboard: boolean;
};

export const StyledHeader = styled.header<StyledHeaderProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 64px;
  margin-bottom: 2em;

  a[href='/home'] {
    width: 125px;
  }

  a[href='/levels'] {
    background-color: ${(props) =>
      props.levels ? props.theme.colours.tertiary : 'none'};
  }

  a[href='/leaderboard'] {
    background-color: ${(props) =>
      props.leaderboard ? props.theme.colours.tertiary : 'none'};
  }

  a[href='/levels'],
  a[href='/leaderboard'] {
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration: none;
    padding: 0.2em 0.5em;
    border-radius: 8px;
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    gap: 0;

    a[href='/levels'],
    a[href='/leaderboard'] {
      padding: revert;
      font-size: revert;
    }

    a[href='/home'] {
      width: 75px;
    }
  }
`;
