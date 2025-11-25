import { Injectable } from '@angular/core';
import { Service } from '../model/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private services: Service[] = [
    {
      id: '1',
      name: 'Laboratory Testing Services',
      description: 'Comprehensive analytical and testing services for research and industry',
      icon: 'fas fa-flask',
      category: 'Research Services',
      overview: 'Our state-of-the-art laboratories provide comprehensive testing and analytical services for academic research, industrial applications, and quality control. We offer advanced instrumentation and expert analysis across multiple scientific disciplines.',
      features: [
        'Chemical Analysis and Characterization',
        'Microbiological Testing',
        'Environmental Sample Analysis',
        'Material Testing and Characterization',
        'Quality Control Services',
        'Research Collaboration Support'
      ],
      requirements: [
        'Sample submission form',
        'Clear testing specifications',
        'Payment confirmation',
        'Safety data sheets (if applicable)'
      ],
      duration: '3-7 working days',
      cost: 'Varies by test type',
      contactPerson: 'Dr. Ahmed Hassan',
      contactEmail: 'lab.services@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1234',
      isActive: true
    },
    {
      id: '2',
      name: 'Scientific Consultation',
      description: 'Expert consultation services for research projects and industrial applications',
      icon: 'fas fa-user-tie',
      category: 'Consultation Services',
      overview: 'Our faculty experts provide professional consultation services to support research projects, industrial problem-solving, and scientific development initiatives. We offer specialized knowledge across all scientific disciplines.',
      features: [
        'Research Project Design',
        'Data Analysis and Interpretation',
        'Technical Problem Solving',
        'Method Development',
        'Scientific Writing Support',
        'Grant Application Assistance'
      ],
      requirements: [
        'Project description',
        'Consultation request form',
        'Timeline specifications',
        'Budget approval'
      ],
      duration: 'Flexible scheduling',
      cost: 'Hourly rates apply',
      contactPerson: 'Prof. Fatma El-Zahra',
      contactEmail: 'consultation@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1235',
      isActive: true
    },
    {
      id: '3',
      name: 'Training Programs',
      description: 'Professional development and training programs in scientific fields',
      icon: 'fas fa-graduation-cap',
      category: 'Educational Services',
      overview: 'We offer comprehensive training programs designed to enhance scientific skills and knowledge for students, researchers, and professionals. Our programs combine theoretical knowledge with practical hands-on experience.',
      features: [
        'Laboratory Skills Training',
        'Research Methodology Workshops',
        'Scientific Writing Courses',
        'Data Analysis Training',
        'Safety and Compliance Training',
        'Continuing Education Programs'
      ],
      requirements: [
        'Registration form',
        'Educational background verification',
        'Training fee payment',
        'Attendance commitment'
      ],
      duration: '1-4 weeks',
      cost: 'Program-specific fees',
      contactPerson: 'Dr. Mohamed Abdel Rahman',
      contactEmail: 'training@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1236',
      isActive: true
    },
    {
      id: '4',
      name: 'Equipment Rental',
      description: 'Scientific equipment and instrumentation rental services',
      icon: 'fas fa-microscope',
      category: 'Equipment Services',
      overview: 'Access to advanced scientific equipment and instrumentation for research, education, and industrial applications. Our rental services provide cost-effective solutions for specialized equipment needs.',
      features: [
        'Advanced Analytical Instruments',
        'Research Equipment',
        'Field Testing Equipment',
        'Specialized Software Access',
        'Technical Support Included',
        'Flexible Rental Terms'
      ],
      requirements: [
        'Equipment rental agreement',
        'Security deposit',
        'User qualification verification',
        'Insurance coverage'
      ],
      duration: 'Daily, weekly, or monthly',
      cost: 'Equipment-specific rates',
      contactPerson: 'Eng. Sarah Ahmed',
      contactEmail: 'equipment@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1237',
      isActive: true
    },
    {
      id: '5',
      name: 'Environmental Monitoring',
      description: 'Environmental assessment and monitoring services',
      icon: 'fas fa-leaf',
      category: 'Environmental Services',
      overview: 'Comprehensive environmental monitoring and assessment services to support environmental protection, compliance, and sustainability initiatives. We provide expert analysis and reporting for various environmental parameters.',
      features: [
        'Air Quality Monitoring',
        'Water Quality Assessment',
        'Soil Analysis',
        'Biodiversity Surveys',
        'Environmental Impact Assessment',
        'Compliance Reporting'
      ],
      requirements: [
        'Site access permissions',
        'Monitoring specifications',
        'Sampling protocols agreement',
        'Reporting requirements'
      ],
      duration: 'Project-dependent',
      cost: 'Quote-based pricing',
      contactPerson: 'Dr. Nadia Ibrahim',
      contactEmail: 'environment@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1238',
      isActive: true
    },
    {
      id: '6',
      name: 'Research Collaboration',
      description: 'Collaborative research partnerships and joint projects',
      icon: 'fas fa-handshake',
      category: 'Research Services',
      overview: 'We facilitate collaborative research partnerships between our faculty, students, and external organizations. Our collaboration services support joint research projects, knowledge exchange, and innovation development.',
      features: [
        'Joint Research Projects',
        'Knowledge Transfer Programs',
        'Innovation Development',
        'Publication Support',
        'Conference Organization',
        'International Partnerships'
      ],
      requirements: [
        'Research proposal',
        'Partnership agreement',
        'Resource allocation plan',
        'Timeline and milestones'
      ],
      duration: 'Project-specific',
      cost: 'Negotiable terms',
      contactPerson: 'Prof. Omar Hassan',
      contactEmail: 'research@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1239',
      isActive: true
    }
  ];

  private categories = [
    'All Services',
    'Research Services',
    'Consultation Services',
    'Educational Services',
    'Equipment Services',
    'Environmental Services'
  ];

  getAll(): Service[] {
    return this.services;
  }

  getById(id: string): Service | undefined {
    return this.services.find(s => s.id === id);
  }

  getByCategory(category: string): Service[] {
    if (category === 'All Services') {
      return this.services;
    }
    return this.services.filter(s => s.category === category);
  }

  getCategories(): string[] {
    return this.categories;
  }

  getActiveServices(): Service[] {
    return this.services.filter(s => s.isActive);
  }

  searchServices(query: string): Service[] {
    const q = query.toLowerCase();
    return this.services.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  }
}