export type Player = {
  id: string; // The socket id / presence id
  name: string;
  isHost: boolean;
  score: number;
};

export type GameState = 'lobby' | 'playing' | 'postgame';

export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  points: Point[];
  color: string;
  size: number;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  isCorrectGuess: boolean;
  system: boolean;
};
