'use client';

import OutcomesWrapper from "@/components/outcomes-wrapper/outcomes-wrapper";

interface EventListItemProps {
  eventId: number;
  eventStart: string;
  eventName: string;
}

const EventListItem = ({ eventId, eventStart, eventName }: EventListItemProps) => {  
  console.log("Rendering EventListItem for eventId:", eventId);

  return (
    <div className="flex flex-col xl:flex-row p-4 border rounded gap-4 items-center justify-between">
      <div className="flex flex-col md:flex-row gap-2">
        <p>{eventStart}</p>
        <p className="font-semibold">{eventName}</p>
      </div>
      <OutcomesWrapper eventId={eventId} />
    </div>
  );
};

export default EventListItem;
