import axios from "axios";
import { Article, NYTAPIResponse } from "./types";

const NYTIMES_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;
const NYTIMES_API_URL = "https://api.nytimes.com/svc/mostpopular/v2/emailed";


// Reuse Article type defined in Guardian API
export const fetchNYTimesArticles = async (
  period = 7
): Promise<Article[]> => {
  try {
    const response = await axios.get(`${NYTIMES_API_URL}/${period}.json`, {
      params: {
        "api-key": NYTIMES_API_KEY,
      },
    });

    return response.data.results.map((item: NYTAPIResponse) => ({
      title: item.title,
      description: item.abstract,
      author: item.byline,
      url: item.url,
      source: { name: "The New York Times" },
      category: item.nytdsection,
    }));
  } catch (error) {
    console.error("Error fetching articles from The New York Times:", error);
    return [];
  }
};
