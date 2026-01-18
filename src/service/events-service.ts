'use server';
import { fetchMockData } from "@/api/api";
import { mapEvents } from "@/mappers/event-mapper";

export async function fetchEvents() {
    const response = await fetchMockData();

    const { data } = response as { data: Array<any> };

    const mapped = mapEvents(data);
    
    return mapped;
}