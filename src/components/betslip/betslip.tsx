"use client";
import { useAppStore } from "@/providers/store-provider";
import BetslipEntry from "./partials/betslip-entry";
import debounce from "lodash.debounce";
import React from "react";

const Betslip = () => {
  const { totalOdds, totalWin, selections, message, locked, acceptMessage } =
    useAppStore((state) => state.betslip);
  const updateTotalStake = useAppStore((state) => state.updateTotalStake);
  const acceptAllOdds = useAppStore((state) => state.acceptAllOdds);
  const clearBetslip = useAppStore((state) => state.clearBetslip);

  const handleOnInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateTotalStake(isNaN(value) ? 0 : value);
  }, 300);

  const handleOnAcceptOdds = () => {
    acceptAllOdds();
  };

  const handlePlaceBetslip = () => {
    if (locked) {
      alert("Nie można postawić zakładu.");

      return;
    }

    if (selections.length === 0) {
      alert("Brak wybranych zakładów!");

      return;
    }

    if (totalWin <= 0) {
      alert("Nieprawidłowa stawka!");

      return;
    }

    alert("Zakład został postawiony!");
    clearBetslip();
  };

  return (
    <div className="betslip flex flex-col h-[calc(100%-28px-16px)] md:h-full"> 
      <div>
        {message && (
          <div className="p-2 bg-red-300 mb-2 rounded text-red-800">
            {message}
          </div>
        )}
        {acceptMessage && (
          <div className="p-2 flex flex-col mb-2 bg-orange-300">
            <div className="mb-4 rounded text-orange-800">{acceptMessage}</div>
            <button
              onClick={handleOnAcceptOdds}
              className="p-2 w-full bg-orange-100 text-orange-800"
            >
              Akceptuję
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col overflow-y-auto mb-4 flex-grow"> 
        {selections.length === 0 ? (
          <p>Brak wybranych zakładów</p>
        ) : (
          <div className="flex flex-col gap-4 overflow-y-auto">
            {selections.map((selection) => (
              <BetslipEntry key={selection.outcomeId} selection={selection} />
            ))}
          </div>
        )}
      </div>
      {selections.length > 0 && (
        <div className="flex flex-col border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <p>Stawka:</p>
            <input
              type="number"
              className="border rounded"
              onInput={handleOnInput}
            />
          </div>
          <div className="flex justify-between">
            <p>Kurs całkowity:</p>
            <p>{totalOdds.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Potencjalna wygrana:</p>
            <p>{totalWin.toFixed(2)}</p>
          </div>
          <div className="flex">
            <button
              onClick={handlePlaceBetslip}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Postaw zakład
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Betslip;
