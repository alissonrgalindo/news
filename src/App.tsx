import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  fetchTopHeadlines,
  fetchCategories as fetchNewsAPICategories,
} from "./services/newsAPI";
import {
  fetchGuardianArticles,
  fetchGuardianCategories,
} from "./services/guardianAPI";
import { fetchNYTimesArticles } from "./services/nytAPI";
import { Article } from "./services/types";
import Filter from "@/components/filter";
import ArticleList from "@/components/article-list";
import { ModeToggle } from "./components/mode-toggle";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const [sources] = useState<string[]>([
    "NewsAPI",
    "The Guardian",
    "The New York Times",
  ]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          newsAPICategories,
          headlines,
          guardianArticles,
          guardianCategories,
          nyTimesArticles,
        ] = await Promise.all([
          fetchNewsAPICategories(),
          fetchTopHeadlines(),
          fetchGuardianArticles(""),
          fetchGuardianCategories(),
          fetchNYTimesArticles(),
        ]);

        const allArticles = [
          ...headlines,
          ...guardianArticles,
          ...nyTimesArticles,
        ];

        const nytCategories = nyTimesArticles.map(
          (article) => article.category
        );

        const uniqueCategories = Array.from(
          new Set([
            ...newsAPICategories,
            ...guardianCategories,
            ...nytCategories,
          ])
        ).filter(Boolean) as string[];

        const uniqueAuthors = Array.from(
          new Set(allArticles.map((article) => article.author).filter(Boolean))
        ) as string[];

        setCategories(uniqueCategories);
        setAuthors(uniqueAuthors);
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesQuery = article.title
        ? article.title.toLowerCase().includes(query.toLowerCase())
        : false;

      const matchesSource =
        selectedSources.length === 0 ||
        (article.source?.name && selectedSources.includes(article.source.name));

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(article.category || "");

      const matchesAuthor =
        selectedAuthors.length === 0 ||
        selectedAuthors.includes(article.author || "");

      const matchesDate =
        (!startDate ||
          (article.publishedAt &&
            new Date(article.publishedAt) >= startDate)) &&
        (!endDate ||
          (article.publishedAt && new Date(article.publishedAt) <= endDate));

      return (
        matchesQuery &&
        matchesSource &&
        matchesCategory &&
        matchesAuthor &&
        matchesDate
      );
    });
  }, [
    query,
    articles,
    selectedSources,
    selectedCategories,
    selectedAuthors,
    startDate,
    endDate,
  ]);

  return (
    <div className="py-4">
      <div className="max-w-[800px] p-6 m-auto border rounded-s mt-4 mb-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome to your personal newsletter
            </h2>
            <ModeToggle />
          </div>
          <p className="text-muted-foreground">
            Here you can filter by Author, Category, Date, and Source
          </p>
        </div>
        <div className="flex items-center mt-4 gap-4">
          <Input
            className="max-w-[350px]"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Filter
            sources={sources}
            categories={categories}
            authors={authors}
            selectedSources={selectedSources}
            selectedCategories={selectedCategories}
            selectedAuthors={selectedAuthors}
            startDate={startDate}
            endDate={endDate}
            setSelectedSources={setSelectedSources}
            setSelectedCategories={setSelectedCategories}
            setSelectedAuthors={setSelectedAuthors}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
      <div className="max-w-[800px] p-6 m-auto border rounded-s mt-4 mb-4">
        <ArticleList loading={loading} articles={filteredArticles} />
      </div>
    </div>
  );
};

export default App;
