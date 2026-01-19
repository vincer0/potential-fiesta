"use client";
import { useAppStore } from "@/providers/store-provider";
import BetslipEntry from "./partials/betslip-entry";

const Betslip = () => {
  const betslip = useAppStore((state) => state.betslip);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow">
        {betslip.selections.length === 0 ? (
          <p>Brak wybranych zakładów</p>
        ) : (
          <div className="flex flex-col gap-4 overflow-y-auto">
            {betslip.selections.map((selection) => (
              <BetslipEntry key={selection.outcomeId} selection={selection} />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <p>Stawka:</p>
          <input type="number" className="border rounded" />
        </div>
        <div className="flex justify-between">
          <p>Kurs całkowity:</p>
          <p>{betslip.totalOdds}</p>
        </div>
        <div className="flex justify-between">
          <p>Potencjalna wygrana:</p>
          <p>{betslip.totalWin}</p>
        </div>
        <div className="flex">
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Postaw zakład
          </button>
        </div>
      </div>
    </div>
  );
};

export default Betslip;
