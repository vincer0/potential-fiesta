import { Outcome } from "./outcome";

interface EventGame {
    gameId: number;
    gameName: string;
    gameType: number;
    outcomes: Array<Outcome>;
}

export { type EventGame };