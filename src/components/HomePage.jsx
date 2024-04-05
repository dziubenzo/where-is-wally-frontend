import { StyledHomePage } from '../styles/HomePage.styled';
import { useLoaderData, useNavigation } from 'react-router-dom';

function HomePage() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const { levelsCount, playersCount, latestPlayer } = useLoaderData();

  return (
    <StyledHomePage>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h2>Levels:</h2>
          <h1>{levelsCount}</h1>
          <h2>Leaderboard Entries:</h2>
          <h1>{playersCount}</h1>
          <h2>Latest Entry:</h2>
          <h1>{latestPlayer ? latestPlayer.nickname : 'No players yet :('}</h1>
        </>
      )}
    </StyledHomePage>
  );
}

export default HomePage;
