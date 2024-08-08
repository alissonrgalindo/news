import axios from 'axios';
import { Article, Source } from '../services/types'; // Ensure this import matches your project's structure

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_SOURCES_URL = 'https://newsapi.org/v2/top-headlines/sources';

export const fetchTopHeadlines = async (country = 'us') => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        country,
        apiKey: NEWS_API_KEY,
      },
    });

    const articlesWithSource = response.data.articles.map((article: Article) => ({
      ...article,
      source: { name: 'NewsAPI' },
    }));

    return articlesWithSource;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(NEWS_API_SOURCES_URL, {
      params: {
        apiKey: NEWS_API_KEY,
      },
    });
    const categories = response.data.sources.map((source: Source) => source.category);
    return Array.from(new Set(categories));
  } catch (error) {
    console.error('Error fetching categories from NewsAPI:', error);
    return [];
  }
};
