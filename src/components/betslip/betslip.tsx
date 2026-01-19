"use client";
import { useAppStore } from "@/providers/store-provider";
import BetslipEntry from "./partials/betslip-entry";
import debounce from "lodash.debounce";
import React from "react";

const Betslip = () => {
  const betslip = useAppStore((state) => state.betslip);
  const updateTotalStake = useAppStore((state) => state.updateTotalStake);

  const handleOnInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateTotalStake(isNaN(value) ? 0 : value);
  }, 300);

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
      {betslip.selections.length > 0 && <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <p>Stawka:</p>
          <input type="number" className="border rounded" onInput={handleOnInput}/>
        </div>
        <div className="flex justify-between">
          <p>Kurs całkowity:</p>
          <p>{betslip.totalOdds.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Potencjalna wygrana:</p>
          <p>{betslip.totalWin.toFixed(2)}</p>
        </div>
        <div className="flex">
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Postaw zakład
          </button>
        </div>
      </div>}
    </div>
  );
};

export default Betslip;
