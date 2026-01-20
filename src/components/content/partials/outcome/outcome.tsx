"use client";
import clsx from "clsx";
import { useAppStore } from "@/providers/store-provider";
import { useEffect, useState } from "react";
import { UpdateDirection } from "@/types/update-direction";

interface OutcomeProps {
  outcomeId: number;
  eventId: number;
  eventGameId: number;
}

const Outcome = ({ outcomeId, eventId, eventGameId }: OutcomeProps) => {
  const { outcomeOdds, isSelected, outcomeName, lastDirection, lastUpdate } = useAppStore((state) => state.eventGameOutcomes[outcomeId]);
  const addToBetslip = useAppStore((state) => state.addToBetslip);
  const removeFromBetslip = useAppStore((state) => state.removeFromBetslip);
  const [animate, setAnimate] = useState<UpdateDirection>(null);

  useEffect(() => {
    if (!lastDirection) {
      return;
    }

    setAnimate(lastDirection);
    const timeout = setTimeout(() => setAnimate(null), 500);

    return () => clearTimeout(timeout);
  }, [lastUpdate]); // Trigger animation on lastUpdate change and not on lastDirection directly (up -> up = no change)

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
        animate === "up" && "animate-odds-up",
        animate === "down" && "animate-odds-down",
      )}
      onClick={handleOnClick}
    >
      <p className="text-[8px] text-center">{outcomeName}</p>
      <p className="text-center">{outcomeOdds.toFixed(2)}</p>
    </div>
  );
};

export default Outcome;
