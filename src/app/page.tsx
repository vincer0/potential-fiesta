import Content from "@/components/content/content";
import StoreHydrator from "@/components/store-hydrator";
import { fetchEvents } from "@/service/events-service";

export default async function Home() {
  const events = await fetchEvents();

  console.log('events', events);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <StoreHydrator mockedEvents={events} />
      <main className="flex min-h-screen w-full flex-col items-center justify-between p-8 bg-white dark:bg-black sm:items-start">
        <Content />
        <div className="betslip">betsltip</div>
        <div className="drawer-right">drawer</div>
      </main>
    </div>
  );
}
