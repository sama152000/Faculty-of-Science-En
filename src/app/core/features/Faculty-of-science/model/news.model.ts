 export interface News {
   id: number;
   title: string;
   content: string;
   excerpt: string;
   image: string;
   date: Date;
   author?: string;
   category?: string;
   slug?: string;
  type: 'news' | 'article';
  tags: string[];
  relatedIds?: number[];
 }