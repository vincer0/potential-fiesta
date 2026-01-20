"use client";
import clsx from "clsx";
import { useAppStore } from "@/providers/store-provider";
import { type Outcome } from "@/types/outcome";
import { useEffect } from "react";
import {
  LiveOddsUpdate,
  subscribeToLiveOdds,
  unsubscribeFromLiveOdds,
} from "@/live/live-odds-gate";

interface OutcomeProps {
  outcomeId: number;
  eventId: number;
  eventGameId: number;
}

const Outcome = ({ outcomeId, eventId, eventGameId }: OutcomeProps) => {
  const { outcomeOdds, isSelected, outcomeName } = useAppStore((state) => state.eventGameOutcomes[outcomeId]);
  const addToBetslip = useAppStore((state) => state.addToBetslip);
  const removeFromBetslip = useAppStore((state) => state.removeFromBetslip);
  const updateOutcomeOdds = useAppStore((state) => state.updateOutcomeOdds);

  useEffect(() => {
    const subId = subscribeToLiveOdds((update: LiveOddsUpdate) => {
      if (
        update.outcomeId === outcomeId &&
        update.eventId === eventId &&
        update.eventGameId === eventGameId
      ) {
        console.log("Received live odds update:", update);
        updateOutcomeOdds(
          outcomeId,
          update.newOdds,
        );
      }
    });

    return () => {
      unsubscribeFromLiveOdds(subId);
    };
  }, [outcomeId, eventId, eventGameId, updateOutcomeOdds]);

  const handleOnClick = () => {
    if (isSelected) {
      removeFromBetslip(outcomeId, eventId, eventGameId);

      return;
    }

    addToBetslip(outcomeId, eventId, eventGameId);
  };

  return (
    <div
      className={clsx(
        "p-2 rounded flex flex-col cursor-pointer",
        isSelected
          ? "bg-blue-500 text-white hover:bg-blue-800"
          : "bg-zinc-100 hover:bg-zinc-300",
      )}
      onClick={handleOnClick}
    >
      <p className="text-[8px] text-center">{outcomeName}</p>
      <p className="text-center">{outcomeOdds.toFixed(2)}</p>
    </div>
  );
};

export default Outcome;
