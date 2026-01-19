import { Event } from "@/types/event";
import { BetslipSelection } from "@/types/betslip-selection";
import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";

export type AppState = {
  games: {
    items: Event[];
  };
  betslip: {
    selections: BetslipSelection[];
    totalStake: number;
    totalWin: number;
    totalOdds: number;
  };
  drawerRight: {
    isOpen: boolean;
  };
};

export type AppStateActions = {
  setGames: (games: Event[]) => void;
  addToBetslip: (
    outcomeId: number,
    eventId: number,
    eventGameId: number,
  ) => void;
  updateTotalStake: (stake: number) => void;
  removeFromBetslip: (
    outcomeId: number,
    eventId: number,
    eventGameId: number,
  ) => void;
  toggleDrawerRight: (isOpen: boolean) => void;
  clearBetslip: () => void;
};

export type Store = AppState & AppStateActions;

export const defaultStore: AppState = {
  games: {
    items: [],
  },
  betslip: {
    selections: [],
    totalStake: 0,
    totalWin: 0,
    totalOdds: 0,
  },
  drawerRight: {
    isOpen: false,
  },
};

export const createAppStore = (initState: AppState = defaultStore) => {
  return createStore<Store>()(
    immer((set) => ({
      ...initState,
      setGames: (newEvents) =>
        set((state) => {
          state.games.items = newEvents;
        }),
      addToBetslip: (outcomeId, eventId, eventGameId) =>
        set((state) => {
          const eventExistsInBetslip = state.betslip.selections.find(
            (selection) => selection.eventId == eventId,
          );

          if (eventExistsInBetslip) {
            // TODO activate modal with message?
            return;
          }

          const existsInBetslip = state.betslip.selections.find(
            (selection) => selection.outcomeId === outcomeId,
          );

          if (existsInBetslip) {
            // TODO activate modal with message?
            return;
          }

          const allEvents = state.games.items;

          const existingEvent = allEvents.find(
            (event) => event.eventId === eventId,
          );

          if (!existingEvent) return;

          const existingGame = existingEvent.eventGames.find(
            (game) => game.gameId === eventGameId,
          );

          if (!existingGame) return;

          const existingOutcome = existingGame.outcomes.find(
            (outcome) => outcome.outcomeId === outcomeId,
          );

          if (!existingOutcome) return;

          const newSelection: BetslipSelection = {
            eventId,
            eventGameId,
            outcomeId,
            outcomeName: existingOutcome.outcomeName,
            outcomeOdds: existingOutcome.outcomeOdds,
            sport: existingEvent.category1Name,
            country: existingEvent.category2Name,
            tournament: existingEvent.category3Name,
            eventStart: existingEvent.eventStart,
            eventGameName: existingGame.gameName,
            eventName: existingEvent.eventName,
          };

          state.betslip.selections.push(newSelection);
          state.betslip.totalOdds += existingOutcome.outcomeOdds;
          state.betslip.totalWin =
            state.betslip.totalStake * state.betslip.totalOdds;

          existingOutcome.isSelected = true;
        }),
      removeFromBetslip: (outcomeId, eventId, eventGameId) =>
        set((state) => {
          const selectionIndex = state.betslip.selections.findIndex(
            (selection) => selection.outcomeId === outcomeId,
          );

          if (selectionIndex !== -1) {
            const selection = state.betslip.selections[selectionIndex];
            state.betslip.totalOdds -= selection.outcomeOdds;
            state.betslip.totalWin =
              state.betslip.totalStake * state.betslip.totalOdds;

            const allEvents = state.games.items;
            const existingEvent = allEvents.find(
              (event) => event.eventId === eventId,
            );
            if (!existingEvent) return;

            const existingGame = existingEvent.eventGames.find(
              (game) => game.gameId === eventGameId,
            );
            if (!existingGame) return;

            const existingOutcome = existingGame.outcomes.find(
              (outcome) => outcome.outcomeId === outcomeId,
            );
            if (!existingOutcome) return;

            state.betslip.selections.splice(selectionIndex, 1);
            existingOutcome.isSelected = false;
          }
        }),
      updateTotalStake: (stake) =>
        set((state) => {
          state.betslip.totalStake = stake;
          state.betslip.totalWin = stake * state.betslip.totalOdds;
        }),
      clearBetslip: () =>
        set((state) => {
          state.betslip.selections = [];
          state.betslip.totalStake = 0;
          state.betslip.totalWin = 0;
          state.betslip.totalOdds = 0;

          state.games.items.forEach((event) => {
            event.eventGames.forEach((game) => {
              game.outcomes.forEach((outcome) => {
                outcome.isSelected = false;
              });
            });
          });
        }),
      toggleDrawerRight: (isOpen) =>
        set((state) => {
          state.drawerRight.isOpen = isOpen;
        }),
    })),
  );
};
