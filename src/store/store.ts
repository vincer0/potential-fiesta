import { Event } from "@/types/event";
import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";

export type AppState = {
    games: {
        items: Event[]
    },
    betslip: {
        selections: Event[],
        totalStake: number,
        totalWin: number,
    },
    drawerRight: {
        isOpen: boolean,
    },
};

export type AppStateActions = {
    setGames: (games: Event[]) => void;
    addToBetslip: (bet: {}) => void;
    updateTotalStake: (betId: string, stake: number) => void;
    removeFromBetslip: (betId: string) => void;
    toggleDrawerRight: (isOpen: boolean) => void;
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
    },
    drawerRight: {
        isOpen: false,
    },
};

export const createAppStore = (initState: AppState = defaultStore) => {
    return createStore<Store>()(
        immer((set) => ({
            ...initState,
            setGames: (newEvents) => set((state) => { 
                state.games.items = newEvents 
            }),
            addToBetslip: (bet) => {},
            updateTotalStake: (betId, stake) => {},
            removeFromBetslip: (betId) => {},
            toggleDrawerRight: (isOpen) => {},
        }))
    );
};