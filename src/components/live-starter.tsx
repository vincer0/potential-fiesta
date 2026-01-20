'use client';

import { startLiveOddsUpdates } from "@/live/live-odds-gate";

const LiveStarter = () => {
    startLiveOddsUpdates();
    return null;
}

export default LiveStarter;