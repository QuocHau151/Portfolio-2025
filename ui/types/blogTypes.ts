export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  publishedDate: string;
  readTime: number;
  isFeatured?: boolean;
}

export type Category = {
  id: string;
  name: string;
  slug: string;
};
