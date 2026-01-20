"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/providers/store-provider";

const LiveStarter = () => {
  const oucomes = useAppStore((state) => state.eventGameOutcomes);
  const updateOutcomeOdds = useAppStore((state) => state.updateOutcomeOdds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const keys = Object.keys(oucomes);
      if (!keys.length) return;

      const randomIndex = Math.floor(Math.random() * keys.length);
      const id = Number(keys[0]); // TODO: hadrdcoded for testing purposes
      const outcome = oucomes[id];
      if (!outcome) return;

      const multiplier = Math.random() * (1.1 - 0.9) + 0.9;
      const newOdds = Number((outcome.outcomeOdds * multiplier).toFixed(2));

      updateOutcomeOdds(id, newOdds);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [updateOutcomeOdds, oucomes]);

  return null;
};

export default LiveStarter;
