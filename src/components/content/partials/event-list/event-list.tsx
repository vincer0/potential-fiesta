import { useAppStore } from "@/providers/store-provider";
import EventListItem from "../event-list-item/event-list-item";

const EventList = () => {
  const eventListItems = useAppStore((state) => state.list.items);

  return (
    <div className="flex flex-col gap-4">
      {eventListItems.map((event) => (
        <EventListItem
          key={event.eventId}
          eventId={event.eventId}
          eventName={event.eventName}
          eventStart={event.eventStart}
        />
      ))}
    </div>
  );
};

export default EventList;
