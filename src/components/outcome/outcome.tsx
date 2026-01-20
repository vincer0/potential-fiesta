"use client";
import clsx from "clsx";
import { useAppStore } from "@/providers/store-provider";
import { type Outcome } from "@/types/outcome";

interface OutcomeProps {
  outcomeId: number;
  eventId: number;
  eventGameId: number;
}

const Outcome = ({ outcomeId, eventId, eventGameId }: OutcomeProps) => {
  const { outcomeOdds, isSelected, outcomeName } = useAppStore((state) => state.eventGameOutcomes[outcomeId]);
  const addToBetslip = useAppStore((state) => state.addToBetslip);
  const removeFromBetslip = useAppStore((state) => state.removeFromBetslip);

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
