export interface Clue {
  id: string;
  riddle: string;
  answer: string;
  hint: string;
}

export interface HeistMission {
  id: string;
  title: string;
  description: string;
  targetItem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  clues: Clue[];
}

export const HEIST_MISSIONS: HeistMission[] = [
  {
    id: "mona-lisa",
    title: "The Louvre Infiltration",
    description: "Break into the Louvre Museum after hours to steal the Mona Lisa. The security system is heavily encrypted.",
    targetItem: "The Mona Lisa",
    difficulty: "Easy",
    clues: [
      {
        id: "c1",
        riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answer: "echo",
        hint: "Sound bouncing off"
      },
      {
        id: "c2",
        riddle: "The more of this there is, the less you see. What is it?",
        answer: "darkness",
        hint: "Opposite of light"
      },
      {
        id: "c3",
        riddle: "I have keys but open no doors. I have space but no room. You can enter but outside you cannot go. What am I?",
        answer: "keyboard",
        hint: "You are pressing my buttons right now"
      }
    ]
  },
  {
    id: "area-51",
    title: "Area 51 Vault",
    description: "Infiltrate the most secure government facility to steal the alien core reactor before they move it off-world.",
    targetItem: "Alien Core Reactor",
    difficulty: "Medium",
    clues: [
      {
        id: "a1",
        riddle: "I am always hungry, I must always be fed. The finger I touch, will soon turn red. What am I?",
        answer: "fire",
        hint: "Hot hot hot"
      },
      {
        id: "a2",
        riddle: "I can be cracked, made, told, and played. What am I?",
        answer: "joke",
        hint: "Ha ha ha"
      },
      {
        id: "a3",
        riddle: "What belongs to you but other people use it more than you do?",
        answer: "name",
        hint: "John, Jane, Doe..."
      },
      {
        id: "a4",
        riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        answer: "map",
        hint: "Navigation"
      }
    ]
  }
];
