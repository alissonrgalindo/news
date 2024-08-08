import React from "react";
import { Article } from "../services/types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block transition-colors duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
  >
    <article className="p-4 border-b">
      <header>
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {article.title}
        </h3>
      </header>
      <p className="text-sm text-muted-foreground py-2">
        {article.description || article.summary}
      </p>
      {article.source?.name && (
        <p className="text-sm italic font-bold text-muted-foreground">
          Source: {article.source.name}
        </p>
      )}
    </article>
  </a>
);

export default ArticleCard;
