'use client';
import { useStore } from 'zustand';
import React, { type ReactNode, useState, useContext } from 'react';

import { type Store, createAppStore } from '@/store/store';

export type StoreApi = ReturnType<typeof createAppStore>;

export const StoreContext = React.createContext<StoreApi | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [store] = useState(() => createAppStore());

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
};

export const useAppStore = <T,>(
  selector: (store: Store) => T,
): T => {
  const counterStoreContext = useContext(StoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}