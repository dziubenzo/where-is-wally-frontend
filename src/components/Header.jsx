import { Link, useLocation } from 'react-router-dom';
import { StyledHeader } from '../styles/Header.styled';

function Header() {
  const { pathname } = useLocation();
  return (
    <StyledHeader
      levels={pathname === '/levels' ? "true" : undefined}
      leaderboard={pathname === '/leaderboard' ? "true" : undefined}
    >
      <Link to="/levels">Levels</Link>
      <Link to="/">
        <img src="/logo-header.svg" alt="Where's Wally Logo" />
      </Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </StyledHeader>
  );
}

export default Header;
