import React from "react";
import { useAppStore } from "@/providers/store-provider";
import EventListItem from "../event-list-item/event-list-item";

const EventList = () => {
  const { games } = useAppStore((state) => state);

  console.log("games in content", games);
  return (
    <div className="flex flex-col gap-4">
      {games.items.map((game) => <EventListItem key={game.eventId} event={game} />)}
    </div>
  );
};

export default EventList;
