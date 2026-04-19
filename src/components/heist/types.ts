export type Team = 'Alpha' | 'Bravo';

export type HeistPlayer = {
  id: string; // The socket id / presence id
  name: string;
  isHost: boolean;
  team: Team;
};

export type HeistGameState = 'lobby' | 'playing' | 'postgame';

export type TeamProgress = {
  teamId: Team;
  currentClueIndex: number;
};
