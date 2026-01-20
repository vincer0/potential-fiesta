'use client';
import { Event } from "@/types/event";
import React, { useEffect } from "react";
import { useAppStore } from "@/providers/store-provider";

interface StoreHydratorProps {
    mockedEvents: Event[];
}

const StoreHydrator = ({ mockedEvents }: StoreHydratorProps) => {
    const setGames = useAppStore((state) => (state.setGames));

    useEffect(() => {
        setGames(mockedEvents);
    }, [mockedEvents]);

    return null;
}

export default StoreHydrator;