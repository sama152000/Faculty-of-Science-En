export interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: Date;
  location?: string;
  category?: string;
  slug?: string;
}