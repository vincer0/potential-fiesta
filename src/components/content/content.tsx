'use client';

import EventList from "./partials/event-list/event-list";

const Content = () => {
  return <div className="flex flex-col flex-grow h-full overflow-hidden">
    <div className="flex-grow overflow-y-auto">
      <EventList />
    </div>
  </div>;
};

export default Content;
