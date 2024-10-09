import API_URL from './API';
import { ApiError } from './helpers';

export async function homePageLoader() {
  const [resLevelsCount, resPlayersCount, resLatestPlayer] = await Promise.all([
    fetch(`${API_URL}/levels/count`),
    fetch(`${API_URL}/players/count`),
    fetch(`${API_URL}/players/latest`),
  ]);
  // Handle errors by triggering ErrorPage render with error status code and status text
  if (!resLevelsCount.ok) {
    const error = new ApiError(
      resLevelsCount.statusText,
      resLevelsCount.status,
    );
    throw error;
  }
  if (!resPlayersCount.ok) {
    const error = new ApiError(
      resPlayersCount.statusText,
      resPlayersCount.status,
    );
    throw error;
  }
  if (!resLatestPlayer.ok) {
    const error = new ApiError(
      resLatestPlayer.statusText,
      resLatestPlayer.status,
    );
    throw error;
  }
  const [levelsCount, playersCount, latestPlayer] = await Promise.all([
    await resLevelsCount.json(),
    await resPlayersCount.json(),
    await resLatestPlayer.json(),
  ]);
  return { levelsCount, playersCount, latestPlayer };
}

export async function levelsPageLoader() {
  const resLevels = await fetch(`${API_URL}/levels`);
  // Handle errors by triggering ErrorPage render with error status code and status text
  if (!resLevels.ok) {
    const error = new ApiError(resLevels.statusText, resLevels.status);
    throw error;
  }
  const levels = await resLevels.json();
  return levels;
}

export async function leaderboardPageLoader() {
  const [resLevels, resPlayers] = await Promise.all([
    fetch(`${API_URL}/levels`),
    fetch(`${API_URL}/players`),
  ]);
  // Handle errors by triggering ErrorPage render with error status code and status text
  if (!resLevels.ok) {
    const error = new ApiError(resLevels.statusText, resLevels.status);
    throw error;
  }
  if (!resPlayers.ok) {
    const error = new ApiError(resPlayers.statusText, resPlayers.status);
    throw error;
  }
  const [levels, players] = await Promise.all([
    await resLevels.json(),
    await resPlayers.json(),
  ]);

  return { levels, players };
}
