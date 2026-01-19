"use client";
import { useAppStore } from "@/providers/store-provider";
import { BetslipSelection } from "@/types/betslip-selection";

interface BetslipEntryProps {
  selection: BetslipSelection;
}

const BetslipEntry = ({ selection }: BetslipEntryProps) => {
  const removeFromBetslip = useAppStore((state) => state.removeFromBetslip);

  const handleOnRemoveEntry = () => {
    removeFromBetslip(
      selection.outcomeId,
      selection.eventId,
      selection.eventGameId,
    );
  };

  return (
    <div className="border p-2 rounded">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="font-semibold">{selection.outcomeName}</p>
          <p className="bg-blue-500 rounded px-2 text-white">
            {selection.outcomeOdds}
          </p>
          <button className="cursor-pointer" onClick={handleOnRemoveEntry}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <p className="text-sm">{selection.eventGameName}</p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex flex-col">
        <p className="font-semibold">{selection.eventName}</p>
        <div className="flex justify-between">
          <p className="text-xs">
            {selection.sport} - {selection.country} - {selection.tournament}
          </p>
          <p className="text-xs text-right">{selection.eventStart}</p>
        </div>
      </div>
    </div>
  );
};

export default BetslipEntry;
