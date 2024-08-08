export interface Article {
  title: string;
  description?: string;
  summary?: string;
  url: string;
  author?: string;
  source?: { name: string };
  publishedAt?: string;
  category?: string;
  section?: string;
  nytdsection?: string;
}

export interface NewsAPIResponse {
  articles: Article[];
}

export interface Source {
  category: string;
  name: string;
  id: string;
}

export interface GuardianArticle {
  webTitle: string;
  webUrl: string;
  fields?: {
    trailText?: string;
    category?: string;
  };
}

export interface GuardianAPIResponse {
  webTitle: string;
  fields: {
    trailText: string;
    byline: string;
  };
  webUrl: string;
  sectionName: string;
}

export interface NYTAPIResponse {
  title: string;
  abstract: string;
  byline: string;
  url: string;
  nytdsection: string;
}
