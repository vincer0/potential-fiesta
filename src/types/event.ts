import { EventGame } from "./event-game";

interface Event {
    category1Id: number;
    category1Name: string;
    category2Id: number;
    category2Name: string;
    category3Id: number;
    category3Name: string;
    eventId: number;
    eventName: string;
    eventStart: string;
    eventType: number;
    gamesCount: number;
    isCustomBetAvailable: boolean;
    eventGames: EventGame[];
}

export { type Event };