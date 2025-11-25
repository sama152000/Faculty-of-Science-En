export interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
  overview: string;
  responsibilities: string[];
  departments: string[];
  services: string[];
  head?: string;
  establishedYear?: number;
  staffCount?: number;
  budget?: string;
  achievements: string[];
  goals: string[];
}