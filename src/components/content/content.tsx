'use client';

import EventList from "./partials/event-list/event-list";

const Content = () => {
  return <div className="flex flex-col flex-grow">
    <div className="w-full mb-4 border-b">
        <p>Bets List</p>
    </div>
    <EventList />
  </div>;
};

export default Content;
