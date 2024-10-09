import API_URL from './API';
import { ApiError } from './helpers';

export type Character<name> = {
  _id: string;
  name: name;
  x: number;
  y: number;
};

export type Level = {
  _id: string;
  url_parameter: number;
  name: string;
  image_url: string;
  characters: [
    Character<'wally'>,
    Character<'wenda'>,
    Character<'wizard'>,
    Character<'odlaw'>,
  ];
  __v: number;
};

export type Player = {
  _id: string;
  nickname: string;
  level: Level;
  start_date: Date;
  end_date: Date;
  duration: number;
  __v: number;
};

export async function homePageLoader(): Promise<{
  levelsCount: number;
  playersCount: number;
  latestPlayer: number;
}> {
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

export async function levelsPageLoader(): Promise<Level[]> {
  const resLevels = await fetch(`${API_URL}/levels`);
  // Handle errors by triggering ErrorPage render with error status code and status text
  if (!resLevels.ok) {
    const error = new ApiError(resLevels.statusText, resLevels.status);
    throw error;
  }
  const levels: Level[] = await resLevels.json();
  return levels;
}

export async function leaderboardPageLoader(): Promise<{
  levels: Level[];
  players: Player[];
}> {
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
