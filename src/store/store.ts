import { Event } from "@/types/event";
import { BetslipSelection } from "@/types/betslip-selection";
import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";

export type AppState = {
  games: {
    items: Event[];
  };
  list: {
    items: { eventId: number; eventName: string; eventStart: string }[];
  };
  // TODO: consider add type
  eventGames: {
    [eventId: number]: {
      gameId: number;
      gameName: string;
      gameType: number;
      outcomes: { outcomeId: number }[];
    }[];
  };
  eventGameOutcomes: {
    [eventGameId: number]: {
      outcomeOdds: number;
      isSelected: boolean;
      outcomeName: string;
    };
  };
  betslip: {
    selections: BetslipSelection[];
    totalStake: number;
    totalWin: number;
    totalOdds: number;
    message: string;
    locked: boolean;
    conflicts: number[];
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
  updateOutcomeOdds: (outcomeId: number, newOdds: number) => void;
};

export type Store = AppState & AppStateActions;

export const defaultStore: AppState = {
  games: {
    items: [],
  },
  list: {
    items: [],
  },
  eventGames: {},
  eventGameOutcomes: {},
  betslip: {
    selections: [],
    totalStake: 0,
    totalWin: 0,
    totalOdds: 1,
    message: "",
    locked: false,
    conflicts: [],
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

          state.list.items = newEvents.map((event) => ({
            eventId: event.eventId,
            eventName: event.eventName,
            eventStart: event.eventStart,
          }));

          state.eventGames = {};

          newEvents.forEach((event) => {
            state.eventGames[event.eventId] = event.eventGames.map((eg) => ({
              gameId: eg.gameId,
              gameType: eg.gameType,
              gameName: eg.gameName,
              outcomes: eg.outcomes.map((outcome) => ({
                outcomeId: outcome.outcomeId,
              })),
            }));
          });

          state.eventGameOutcomes = {};
          newEvents.forEach((event) => {
            event.eventGames.forEach((eg) => {
              eg.outcomes.forEach((outcome) => {
                state.eventGameOutcomes[outcome.outcomeId] = {
                  outcomeOdds: outcome.outcomeOdds,
                  isSelected: outcome.isSelected,
                  outcomeName: outcome.outcomeName,
                };
              });
            });
          });
        }),
      addToBetslip: (outcomeId, eventId, eventGameId) =>
        set((state) => {
          const eventAlreadyInBetslip = state.betslip.selections.find(
            (sel) => sel.eventId === eventId,
          );

          if (eventAlreadyInBetslip) {
            state.betslip.message =
              "Można dodać tylko jeden zakład z danego wydarzenia.";
            state.betslip.locked = true;
            state.betslip.conflicts.push(eventId);
          }

          const outcomeDetails = state.eventGameOutcomes[outcomeId];

          const event = state.games.items.find((e) => e.eventId === eventId);
          if (!event) return;

          const eventGame = state.eventGames[eventId][0];

          state.betslip.selections.push({
            eventId,
            eventGameId,
            outcomeId,
            outcomeOdds: outcomeDetails.outcomeOdds,
            outcomeName: outcomeDetails.outcomeName,
            eventName: event.eventName,
            eventGameName: eventGame.gameName,
            sport: event.category1Name,
            country: event.category2Name,
            tournament: event.category3Name,
            eventStart: event.eventStart,
          });

          state.eventGameOutcomes[outcomeId].isSelected = true;
        }),
      removeFromBetslip: (outcomeId, eventId, eventGameId) =>
        set((state) => {
          const selectionIndex = state.betslip.selections.findIndex(
            (selection) => selection.outcomeId === outcomeId,
          );

          if (selectionIndex !== -1) {
            if (state.betslip.conflicts.includes(eventId)) {
              state.betslip.conflicts = state.betslip.conflicts.filter(
                (id) => id !== eventId,
              );

              if (state.betslip.conflicts.length === 0) {
                state.betslip.message = "";
                state.betslip.locked = false;
              }
            }

            state.betslip.selections.splice(selectionIndex, 1);
            state.eventGameOutcomes[outcomeId].isSelected = false;

            state.betslip.totalOdds = 1;

            state.betslip.selections.forEach((sel) => {
              state.betslip.totalOdds *= sel.outcomeOdds;
            });

            state.betslip.totalWin =
              state.betslip.totalStake * state.betslip.totalOdds;
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
          state.betslip.message = "";
          state.betslip.locked = false;
          state.betslip.conflicts = [];

          Object.keys(state.eventGameOutcomes).forEach((outcomeId) => {
            state.eventGameOutcomes[parseInt(outcomeId)].isSelected = false;
          });
        }),
      toggleDrawerRight: (isOpen) =>
        set((state) => {
          state.drawerRight.isOpen = isOpen;
        }),
      updateOutcomeOdds: (outcomeId, newOdds) =>
        set((state) => {
          // TODO: check for betslip, if odds changed - block button, show notification
          state.eventGameOutcomes[outcomeId].outcomeOdds = newOdds;
        }),
    })),
  );
};
