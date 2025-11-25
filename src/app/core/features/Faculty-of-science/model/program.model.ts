export interface Program {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'bachelor' | 'master' | 'phd' | 'diploma';
  duration: string;
  overview: string;
  objectives: string[];
  requirements: string[];
  courses: string[];
  careerOpportunities: string[];
  admissionRequirements: string[];
  fees?: string;
  coordinator?: string;
  department: string;
  creditsRequired: number;
  isActive: boolean;
}