import Betslip from "@/components/betslip/betslip";
import Content from "@/components/content/content";
import Drawer from "@/components/drawer/drawer";
import StoreHydrator from "@/components/store-hydrator";
import { fetchEvents } from "@/service/events-service";

export default async function Home() {
  const events = await fetchEvents();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <StoreHydrator mockedEvents={events} />
      <main className="flex min-h-screen w-full items-center justify-between p-8 bg-white dark:bg-black sm:items-start">
        <Content />
        <Betslip />
        <Drawer />
      </main>
    </div>
  );
}
