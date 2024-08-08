import React from "react";
import { Article } from "../services/types";
import ArticleCard from "./article-card";
import SkeletonCard from "./skeleton-card";

interface ArticleListProps {
  loading: boolean;
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ loading, articles }) => {
  const skeletons = React.useMemo(
    () => Array.from({ length: 5 }, (_, index) => <SkeletonCard key={index} />),
    []
  );

  if (loading) return <>{skeletons}</>;

  if (articles.length === 0) return <p>No articles found.</p>;

  // Define the keyframes in a style element
  const fadeInKeyframes = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{fadeInKeyframes}</style> {/* Corrected style inclusion */}
      {articles.map((article, index) => (
        <div
          key={article.url}
          style={{
            opacity: 0,
            animation: `fadeIn 0.5s forwards`,
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <ArticleCard article={article} />
        </div>
      ))}
    </>
  );
};

export default ArticleList;
