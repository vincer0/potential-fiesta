"use client";
import Outcome from "@/components/content/partials/outcome/outcome";
import { useAppStore } from "@/providers/store-provider";
import { useMemo } from "react";

interface OutcomeWrapperProps {
  eventId: number;
}

const MAIN_EVENT_GAME_TYPE = 1; // Define the main event game type (this should be provided from api or smth - which game should show up on the list)

const OutcomesWrapper = ({ eventId }: OutcomeWrapperProps) => {
  const eventGames = useAppStore((state) => state.eventGames[eventId]);
  const mainEventGame = useMemo(() => {
    if (!eventGames || eventGames.length === 0) {
      return null;
    }

  return eventGames.find((game) => game.gameType === MAIN_EVENT_GAME_TYPE);
  }, [eventGames]);

  console.log("OutcomesWrapper rendering for eventId:", mainEventGame);

  return (
    <div className="grid gap-4 grid-cols-3 w-full xl:w-[300px]">
      {mainEventGame &&
        mainEventGame.outcomes.map((outcome) => (
          <Outcome
            key={outcome.outcomeId}
            outcomeId={outcome.outcomeId}
            eventId={eventId}
            eventGameId={eventGames[0].gameId}
          />
        ))}
    </div>
  );
};

export default OutcomesWrapper;
