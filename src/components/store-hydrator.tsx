'use client';
import { Event } from "@/types/event";
import React, { useEffect } from "react";
import { useAppStore } from "@/providers/store-provider";

interface StoreHydratorProps {
    mockedEvents: Event[];
}

// This component is used to hydrate the store with server data
const StoreHydrator = ({ mockedEvents }: StoreHydratorProps) => {
    const { setGames } = useAppStore((state) => (state));

    useEffect(() => {
        setGames(mockedEvents);
    }, [mockedEvents]);

    return null;
}

export default StoreHydrator;