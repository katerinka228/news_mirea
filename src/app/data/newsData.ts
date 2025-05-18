import newsData from './news.json';
import type { NewsItem } from './types';

export async function getAllNews(): Promise<NewsItem[]> {
    return newsData;
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;
    return newsData.find((item) => item.id === numericId) || null;
}