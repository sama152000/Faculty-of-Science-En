import { Injectable } from '@angular/core';
import { Sector } from '../model/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  private sectors: Sector[] = [
    {
      id: '1',
      name: 'Academic Affairs Sector',
      description: 'Managing academic programs, curriculum, and educational quality',
      icon: 'fas fa-graduation-cap',
      overview: 'The Academic Affairs Sector is responsible for overseeing all academic activities within the Faculty of Science, including curriculum development, academic standards, student assessment, and educational quality assurance.',
      responsibilities: [
        'Curriculum development and review',
        'Academic program management',
        'Student assessment and evaluation',
        'Faculty development programs',
        'Academic quality assurance',
        'Accreditation processes'
      ],
      departments: [
        'Geology Department',
        'Mathematics Department',
        'Physics Department',
        'Chemistry Department',
        'Botany and Microbiology Department',
        'Zoology Department'
      ],
      services: [
        'Academic program planning',
        'Curriculum advisory services',
        'Faculty training programs',
        'Student academic support',
        'Quality assessment'
      ],
      head: 'Prof. Dr. Ahmed El-Masry',
      establishedYear: 2018,
      staffCount: 45,
      budget: '2.5 Million EGP',
      achievements: [
        'Successful NAQAAE accreditation',
        'Implementation of new assessment methods',
        'Development of interdisciplinary programs',
        'Faculty development initiatives'
      ],
      goals: [
        'Enhance academic excellence',
        'Improve student outcomes',
        'Strengthen faculty capabilities',
        'Expand research integration'
      ]
    },
    {
      id: '2',
      name: 'Research and Graduate Studies Sector',
      description: 'Promoting research excellence and graduate education',
      icon: 'fas fa-microscope',
      overview: 'The Research and Graduate Studies Sector focuses on advancing scientific research, supporting graduate programs, and fostering innovation within the faculty. We coordinate research activities and provide support for postgraduate studies.',
      responsibilities: [
        'Research strategy development',
        'Graduate program oversight',
        'Research funding coordination',
        'Publication and dissemination',
        'International collaboration',
        'Innovation and technology transfer'
      ],
      departments: [
        'Research Administration',
        'Graduate Studies Office',
        'Innovation and Technology Transfer',
        'International Relations'
      ],
      services: [
        'Research proposal development',
        'Grant application support',
        'Graduate student supervision',
        'Research collaboration facilitation',
        'Publication assistance'
      ],
      head: 'Prof. Dr. Fatma El-Zahra',
      establishedYear: 2018,
      staffCount: 32,
      budget: '3.2 Million EGP',
      achievements: [
        'Increased research publications by 40%',
        'Secured major research grants',
        'Established international partnerships',
        'Launched innovation incubator'
      ],
      goals: [
        'Increase research output',
        'Enhance graduate programs',
        'Strengthen industry partnerships',
        'Promote innovation culture'
      ]
    },
    {
      id: '3',
      name: 'Student Affairs and Services Sector',
      description: 'Supporting student life, welfare, and extracurricular activities',
      icon: 'fas fa-users',
      overview: 'The Student Affairs and Services Sector is dedicated to enhancing student experience through comprehensive support services, extracurricular activities, and welfare programs that contribute to holistic student development.',
      responsibilities: [
        'Student welfare and support',
        'Extracurricular activities coordination',
        'Student counseling services',
        'Career guidance and placement',
        'Student organizations oversight',
        'Campus life enhancement'
      ],
      departments: [
        'Student Services Office',
        'Counseling and Guidance Center',
        'Career Development Center',
        'Student Activities Office'
      ],
      services: [
        'Academic advising',
        'Personal counseling',
        'Career planning',
        'Scholarship assistance',
        'Student activity coordination'
      ],
      head: 'Dr. Mona Hassan',
      establishedYear: 2018,
      staffCount: 28,
      budget: '1.8 Million EGP',
      achievements: [
        'Established comprehensive counseling services',
        'Launched career development programs',
        'Increased student engagement by 60%',
        'Implemented student feedback systems'
      ],
      goals: [
        'Improve student satisfaction',
        'Enhance career readiness',
        'Strengthen student support',
        'Expand extracurricular opportunities'
      ]
    },
    {
      id: '4',
      name: 'Administrative and Financial Affairs Sector',
      description: 'Managing administrative operations and financial resources',
      icon: 'fas fa-building',
      overview: 'The Administrative and Financial Affairs Sector ensures efficient management of the faculty\'s administrative operations, financial resources, human resources, and infrastructure to support academic and research activities.',
      responsibilities: [
        'Financial planning and management',
        'Human resources administration',
        'Infrastructure maintenance',
        'Administrative operations',
        'Procurement and contracts',
        'Legal and compliance matters'
      ],
      departments: [
        'Financial Affairs Office',
        'Human Resources Department',
        'Administrative Services',
        'Facilities Management'
      ],
      services: [
        'Budget planning and control',
        'HR services and support',
        'Facility maintenance',
        'Procurement services',
        'Administrative support'
      ],
      head: 'Mr. Khaled Ibrahim',
      establishedYear: 2018,
      staffCount: 52,
      budget: '4.1 Million EGP',
      achievements: [
        'Implemented digital administrative systems',
        'Improved financial transparency',
        'Enhanced facility infrastructure',
        'Streamlined administrative processes'
      ],
      goals: [
        'Optimize resource utilization',
        'Enhance operational efficiency',
        'Improve service quality',
        'Strengthen financial sustainability'
      ]
    },
    {
      id: '5',
      name: 'Community Service and Environmental Development Sector',
      description: 'Connecting with community and promoting environmental sustainability',
      icon: 'fas fa-leaf',
      overview: 'The Community Service and Environmental Development Sector focuses on building strong community partnerships, promoting environmental awareness, and contributing to sustainable development initiatives in the region.',
      responsibilities: [
        'Community outreach programs',
        'Environmental awareness campaigns',
        'Sustainable development projects',
        'Public education initiatives',
        'Partnership development',
        'Social responsibility programs'
      ],
      departments: [
        'Community Relations Office',
        'Environmental Programs Unit',
        'Public Education Center',
        'Partnership Development Office'
      ],
      services: [
        'Community education programs',
        'Environmental consulting',
        'Public awareness campaigns',
        'Partnership facilitation',
        'Volunteer coordination'
      ],
      head: 'Dr. Yasmin El-Sherbiny',
      establishedYear: 2019,
      staffCount: 24,
      budget: '1.5 Million EGP',
      achievements: [
        'Launched environmental awareness programs',
        'Established community partnerships',
        'Implemented sustainability initiatives',
        'Organized public education campaigns'
      ],
      goals: [
        'Strengthen community engagement',
        'Promote environmental sustainability',
        'Expand partnership network',
        'Increase social impact'
      ]
    }
  ];

  getAll(): Sector[] {
    return this.sectors;
  }

  getById(id: string): Sector | undefined {
    return this.sectors.find(s => s.id === id);
  }

  searchSectors(query: string): Sector[] {
    const q = query.toLowerCase();
    return this.sectors.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.responsibilities.some(r => r.toLowerCase().includes(q))
    );
  }

  getTotalStaff(): number {
    return this.sectors.reduce((sum, s) => sum + (s.staffCount || 0), 0);
  }

  getSectorsByStaffCount(): Sector[] {
    return this.sectors.sort((a, b) => (b.staffCount || 0) - (a.staffCount || 0));
  }
}