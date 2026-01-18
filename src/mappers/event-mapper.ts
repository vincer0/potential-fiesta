import { Event } from "@/types/event";
import { EventGame } from "@/types/event-game";
import { Outcome } from "@/types/outcome";

const mapOutcomes = (rawOutcomes: Array<any>): Outcome[] =>
  rawOutcomes.map((rawOutcome) => ({
    outcomeId: rawOutcome.outcomeId,
    outcomeName: rawOutcome.outcomeName,
    outcomeOdds: rawOutcome.outcomeOdds,
    outComePosition: rawOutcome.outComePosition,
  }));

const mapEventGames = (rawEventGames: Array<any>): EventGame[] =>
  rawEventGames.map((rawGame) => ({
    gameId: rawGame.gameId,
    gameName: rawGame.gameName,
    gameType: rawGame.gameType,
    outcomes: mapOutcomes(rawGame.outcomes),
  }));

const mapEvents = (data: Array<any>): Event[] =>
  data.map((rawEvent) => ({
    category1Id: rawEvent.category1Id,
    category1Name: rawEvent.category1Name,
    category2Id: rawEvent.category2Id,
    category2Name: rawEvent.category2Name,
    category3Id: rawEvent.category3Id,
    category3Name: rawEvent.category3Name,
    eventId: rawEvent.eventId,
    eventName: rawEvent.eventName,
    eventStart: rawEvent.eventStart,
    eventType: rawEvent.eventType,
    gamesCount: rawEvent.gamesCount,
    isCustomBetAvailable: rawEvent.isCustomBetAvailable,
    eventGames: mapEventGames(rawEvent.eventGames),
  }));

export { mapEvents };
