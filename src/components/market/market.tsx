'use client';
import { Outcome } from '@/types/outcome';

interface MarketProps {
    market: Outcome;
}

const Market = ({ market }: MarketProps) => {
  return (
    <div className="bg-zinc-100 p-2 rounded flex flex-col cursor-pointer hover:bg-zinc-200">
        <p className="text-[8px] text-center">{market.outcomeName}</p>
        <p className="text-center">{market.outcomeOdds}</p>
    </div>
  )
}

export default Market;