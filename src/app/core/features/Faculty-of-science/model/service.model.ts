export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  overview: string;
  features: string[];
  requirements: string[];
  duration?: string;
  cost?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
}