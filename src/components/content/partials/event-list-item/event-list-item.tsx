import Outcome from "@/components/outcome/outcome";
import { Event } from "@/types/event";

interface EventListItemProps {
  event: Event;
}

const MAIN_MARKET_GROUP_TYPE_ID = 1;

const EventListItem = ({ event }: EventListItemProps) => {
  // Example: ID of the market group to show on list
  const mainMarketGroup = event.eventGames.find(
    (game) => game.gameType === MAIN_MARKET_GROUP_TYPE_ID
  );

  return (
    <div key={event.eventId} className="flex flex-col xl:flex-row p-4 border rounded gap-4 items-center justify-between">
      <div className="flex flex-col md:flex-row gap-2">
        <p>{event.eventStart}</p>
        <p className="font-semibold">{event.eventName}</p>
      </div>
      <div className="grid gap-4 grid-cols-3 w-full xl:w-[300px]">
        {mainMarketGroup &&
          mainMarketGroup.outcomes.map((game) => (
            <Outcome key={game.outcomeId} outcome={game} eventId={event.eventId} eventGameId={mainMarketGroup.gameId} />
          ))}
      </div>
    </div>
  );
};

export default EventListItem;
