import { Link, useLocation } from 'react-router-dom';
import { StyledHeader } from '../styles/Header.styled';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <StyledHeader
      levels={pathname === '/levels' ? 'true' : undefined}
      leaderboard={pathname === '/leaderboard' ? 'true' : undefined}
    >
      <Link to="/levels">Levels</Link>
      <Link to="/home">
        <img src="/logo-header.svg" alt="Where's Wally Logo" />
      </Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </StyledHeader>
  );
}
