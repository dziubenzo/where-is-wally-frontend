import { StyledHomePage } from '../styles/HomePage.styled';
import { useLoaderData } from 'react-router-dom';

function HomePage() {
  const { levelsCount, playersCount, latestPlayer } = useLoaderData();

  return (
    <StyledHomePage>
      <>
        <h2>Levels:</h2>
        <h1>{levelsCount}</h1>
        <h2>Leaderboard Entries:</h2>
        <h1>{playersCount}</h1>
        <h2>Latest Entry:</h2>
        <h1>{latestPlayer ? latestPlayer.nickname : 'No players...'}</h1>
      </>
    </StyledHomePage>
  );
}

export default HomePage;
