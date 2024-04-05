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
