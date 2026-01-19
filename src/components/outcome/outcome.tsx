'use client';
import clsx from 'clsx';
import { useAppStore } from '@/providers/store-provider';
import { type Outcome } from '@/types/outcome';

interface OutcomeProps {
    outcome: Outcome;
    eventId: number;
    eventGameId: number;
}

const Outcome = ({ outcome, eventId, eventGameId }: OutcomeProps) => {
  const addToBetslip = useAppStore((state) => state.addToBetslip);
  const removeFromBetslip = useAppStore((state) => state.removeFromBetslip);

  const handleOnClick = () => {
    if (outcome.isSelected) {
      removeFromBetslip(outcome.outcomeId, eventId, eventGameId);

      return;
    }

    addToBetslip(outcome.outcomeId, eventId, eventGameId);
  };
  
  return (
    <div className={clsx('p-2 rounded flex flex-col cursor-pointer', outcome.isSelected ? 'bg-blue-500 text-white hover:bg-blue-800' : 'bg-zinc-100 hover:bg-zinc-300')} onClick={handleOnClick}>
        <p className="text-[8px] text-center">{outcome.outcomeName}</p>
        <p className="text-center">{outcome.outcomeOdds}</p>
    </div>
  )
}

export default Outcome;