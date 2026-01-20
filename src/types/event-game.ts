import { Outcome } from "./outcome";

interface EventGame {
    gameId: number;
    gameName: string;
    gameType: number;
}

interface EventGameHeavy extends EventGame {
    outcomes: Outcome[];
}

interface EventGameLight extends EventGame {
    outcomes: { outcomeId: number }[];
}

export { type EventGame, type EventGameHeavy, type EventGameLight };