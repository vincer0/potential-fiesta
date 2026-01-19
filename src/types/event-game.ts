import { Outcome } from "./outcome";

interface EventGame {
    gameId: number;
    gameName: string;
    gameType: number;
    outcomes: Outcome[];
}

export { type EventGame };