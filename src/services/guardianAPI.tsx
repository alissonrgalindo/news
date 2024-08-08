import axios from "axios";
import { Article, GuardianAPIResponse } from "./types";

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY
const GUARDIAN_API_URL = "https://content.guardianapis.com/search";
const GUARDIAN_SECTIONS_URL = "https://content.guardianapis.com/sections";

export const fetchGuardianArticles = async (query = ""): Promise<Article[]> => {
  try {
    const response = await axios.get(GUARDIAN_API_URL, {
      params: {
        q: query,
        "api-key": GUARDIAN_API_KEY,
        "show-fields": "trailText,byline",
      },
    });

    return response.data.response.results.map((item: GuardianAPIResponse) => ({
      title: item.webTitle,
      description: item.fields.trailText,
      author: item.fields.byline,
      url: item.webUrl,
      source: { name: "The Guardian" },
      category: item.sectionName,
    }));
  } catch (error) {
    console.error("Error fetching articles from The Guardian:", error);
    return [];
  }
};

export const fetchGuardianCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(GUARDIAN_SECTIONS_URL, {
      params: {
        "api-key": GUARDIAN_API_KEY,
      },
    });
    return response.data.response.results.map(
      (section: { webTitle: string }) => section.webTitle
    );
  } catch (error) {
    console.error("Error fetching categories from The Guardian:", error);
    return [];
  }
};
