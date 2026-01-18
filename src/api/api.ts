'use server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function fetchMockData() {
    const filePath = join(process.cwd(), 'src', 'api', 'betting_dashboard_data.json');
    const fileContents = await readFile(filePath, 'utf8');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: JSON.parse(fileContents),
            });
        }, 1000); // Simulate network delay
    });
};