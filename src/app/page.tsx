import Betslip from "@/components/betslip/betslip";
import Content from "@/components/content/content";
import Drawer from "@/components/drawer/drawer";
import HamburgerButton from "@/components/hamburger-button";
import StoreHydrator from "@/components/store-hydrator";
import { fetchEvents } from "@/service/events-service";

export default async function Home() {
  const events = await fetchEvents();

  return (
    <div className="flex items-center justify-center font-sans h-full">
      <StoreHydrator mockedEvents={events} />
      <main className="flex h-full w-full items-center justify-between p-8 bg-white sm:items-start gap-8">
        <Content />
        <div className="hidden md:block p-4 border rounded h-full w-[300px]">
          <Betslip />
        </div>
        <Drawer />
        <HamburgerButton />
      </main>
    </div>
  );
}
