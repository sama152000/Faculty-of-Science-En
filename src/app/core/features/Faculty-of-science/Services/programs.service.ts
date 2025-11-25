import { Injectable } from '@angular/core';
import { Program } from '../model/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  private programs: Program[] = [
    {
      id: '1',
      name: 'Bachelor of Science in Geology',
      description: 'Comprehensive undergraduate program in geological sciences',
      icon: 'fas fa-mountain',
      level: 'bachelor',
      duration: '4 years (8 semesters)',
      overview: 'The Bachelor of Science in Geology program provides students with a comprehensive understanding of Earth sciences, including mineralogy, petrology, structural geology, and environmental geology. Students gain hands-on experience through fieldwork and laboratory studies.',
      objectives: [
        'Understand fundamental geological principles',
        'Develop field and laboratory skills',
        'Apply geological knowledge to real-world problems',
        'Prepare for careers in geology and related fields',
        'Foster critical thinking and analytical skills'
      ],
      requirements: [
        'High school diploma with science background',
        'Minimum 70% in mathematics and sciences',
        'Pass entrance examination',
        'Medical fitness certificate'
      ],
      courses: [
        'Physical Geology',
        'Mineralogy',
        'Petrology',
        'Structural Geology',
        'Sedimentology',
        'Geophysics',
        'Hydrogeology',
        'Environmental Geology',
        'Field Geology',
        'Geological Mapping'
      ],
      careerOpportunities: [
        'Geological Consultant',
        'Mining Engineer',
        'Environmental Geologist',
        'Petroleum Geologist',
        'Hydrogeologist',
        'Research Scientist',
        'Government Geologist',
        'Academic Researcher'
      ],
      admissionRequirements: [
        'Secondary school certificate (Science)',
        'Minimum grade of 70% in mathematics',
        'Minimum grade of 70% in physics',
        'English proficiency test',
        'Personal interview'
      ],
      fees: '15,000 EGP per year',
      coordinator: 'Dr. Mohamed Abdel Rahman',
      department: 'Geology Department',
      creditsRequired: 144,
      isActive: true
    },
    {
      id: '2',
      name: 'Bachelor of Science in Mathematics',
      description: 'Pure and applied mathematics program with strong analytical focus',
      icon: 'fas fa-calculator',
      level: 'bachelor',
      duration: '4 years (8 semesters)',
      overview: 'The Mathematics program offers a rigorous education in pure and applied mathematics, developing strong analytical and problem-solving skills. Students explore various mathematical fields and their applications in science, technology, and industry.',
      objectives: [
        'Master fundamental mathematical concepts',
        'Develop logical reasoning and proof techniques',
        'Apply mathematical methods to solve problems',
        'Prepare for advanced studies or careers',
        'Foster mathematical communication skills'
      ],
      requirements: [
        'High school diploma with mathematics focus',
        'Minimum 75% in mathematics',
        'Strong analytical thinking skills',
        'Pass entrance examination'
      ],
      courses: [
        'Calculus I & II',
        'Linear Algebra',
        'Abstract Algebra',
        'Real Analysis',
        'Complex Analysis',
        'Differential Equations',
        'Probability and Statistics',
        'Numerical Analysis',
        'Discrete Mathematics',
        'Mathematical Modeling'
      ],
      careerOpportunities: [
        'Data Analyst',
        'Actuary',
        'Financial Analyst',
        'Research Mathematician',
        'Statistics Specialist',
        'Software Developer',
        'Academic Researcher',
        'Consultant'
      ],
      admissionRequirements: [
        'Secondary school certificate (Science/Math)',
        'Minimum grade of 75% in mathematics',
        'Minimum grade of 65% in physics',
        'Aptitude test in mathematics',
        'Academic interview'
      ],
      fees: '12,000 EGP per year',
      coordinator: 'Prof. Ibrahim El-Sayed',
      department: 'Mathematics Department',
      creditsRequired: 132,
      isActive: true
    },
    {
      id: '3',
      name: 'Bachelor of Science in Physics',
      description: 'Comprehensive physics program covering theoretical and experimental aspects',
      icon: 'fas fa-atom',
      level: 'bachelor',
      duration: '4 years (8 semesters)',
      overview: 'The Physics program provides a thorough understanding of physical laws and principles, combining theoretical knowledge with experimental skills. Students explore classical and modern physics, preparing them for careers in research, technology, and education.',
      objectives: [
        'Understand fundamental physics principles',
        'Develop experimental and theoretical skills',
        'Apply physics to technological applications',
        'Prepare for advanced studies or careers',
        'Foster scientific inquiry and innovation'
      ],
      requirements: [
        'High school diploma with physics and mathematics',
        'Minimum 70% in physics and mathematics',
        'Strong problem-solving abilities',
        'Laboratory safety awareness'
      ],
      courses: [
        'Classical Mechanics',
        'Electromagnetism',
        'Quantum Mechanics',
        'Thermodynamics',
        'Optics',
        'Nuclear Physics',
        'Solid State Physics',
        'Mathematical Physics',
        'Experimental Physics',
        'Computational Physics'
      ],
      careerOpportunities: [
        'Research Physicist',
        'Medical Physicist',
        'Engineering Physicist',
        'Data Scientist',
        'Technology Consultant',
        'Academic Researcher',
        'Government Scientist',
        'Industrial Physicist'
      ],
      admissionRequirements: [
        'Secondary school certificate (Science)',
        'Minimum grade of 70% in physics',
        'Minimum grade of 70% in mathematics',
        'Laboratory skills assessment',
        'Academic interview'
      ],
      fees: '14,000 EGP per year',
      coordinator: 'Dr. Ahmed Mahmoud',
      department: 'Physics Department',
      creditsRequired: 140,
      isActive: true
    },
    {
      id: '4',
      name: 'Bachelor of Science in Chemistry',
      description: 'Comprehensive chemistry program with laboratory emphasis',
      icon: 'fas fa-flask',
      level: 'bachelor',
      duration: '4 years (8 semesters)',
      overview: 'The Chemistry program offers extensive training in all areas of chemistry, emphasizing both theoretical understanding and practical laboratory skills. Students gain experience in modern analytical techniques and chemical research methods.',
      objectives: [
        'Master fundamental chemical principles',
        'Develop laboratory and analytical skills',
        'Understand chemical processes and reactions',
        'Apply chemistry to real-world problems',
        'Prepare for careers in chemistry and related fields'
      ],
      requirements: [
        'High school diploma with chemistry focus',
        'Minimum 70% in chemistry and mathematics',
        'Laboratory safety certification',
        'Pass entrance examination'
      ],
      courses: [
        'General Chemistry',
        'Organic Chemistry',
        'Inorganic Chemistry',
        'Physical Chemistry',
        'Analytical Chemistry',
        'Biochemistry',
        'Environmental Chemistry',
        'Polymer Chemistry',
        'Spectroscopy',
        'Chemical Safety'
      ],
      careerOpportunities: [
        'Analytical Chemist',
        'Research Chemist',
        'Quality Control Specialist',
        'Environmental Chemist',
        'Pharmaceutical Chemist',
        'Industrial Chemist',
        'Academic Researcher',
        'Chemical Consultant'
      ],
      admissionRequirements: [
        'Secondary school certificate (Science)',
        'Minimum grade of 70% in chemistry',
        'Minimum grade of 65% in mathematics',
        'Laboratory safety test',
        'Personal interview'
      ],
      fees: '16,000 EGP per year',
      coordinator: 'Prof. Sarah Ali',
      department: 'Chemistry Department',
      creditsRequired: 148,
      isActive: true
    },
    {
      id: '5',
      name: 'Bachelor of Science in Botany and Microbiology',
      description: 'Integrated program in plant sciences and microbiology',
      icon: 'fas fa-seedling',
      level: 'bachelor',
      duration: '4 years (8 semesters)',
      overview: 'This interdisciplinary program combines botany and microbiology, providing students with comprehensive knowledge of plant biology, microbial systems, and their interactions. Students gain practical experience in modern biotechnology techniques.',
      objectives: [
        'Understand plant and microbial biology',
        'Develop biotechnology skills',
        'Apply knowledge to environmental issues',
        'Prepare for careers in life sciences',
        'Foster research and innovation skills'
      ],
      requirements: [
        'High school diploma with biology focus',
        'Minimum 70% in biology and chemistry',
        'Interest in environmental sciences',
        'Laboratory experience preferred'
      ],
      courses: [
        'Plant Physiology',
        'Microbiology',
        'Plant Taxonomy',
        'Bacteriology',
        'Mycology',
        'Virology',
        'Plant Biotechnology',
        'Environmental Microbiology',
        'Ecology',
        'Molecular Biology'
      ],
      careerOpportunities: [
        'Microbiologist',
        'Plant Biologist',
        'Biotechnology Specialist',
        'Environmental Scientist',
        'Research Scientist',
        'Quality Control Analyst',
        'Agricultural Consultant',
        'Academic Researcher'
      ],
      admissionRequirements: [
        'Secondary school certificate (Science)',
        'Minimum grade of 70% in biology',
        'Minimum grade of 65% in chemistry',
        'Practical skills assessment',
        'Academic interview'
      ],
      fees: '15,500 EGP per year',
      coordinator: 'Dr. Norhan El-Sayed',
      department: 'Botany and Microbiology Department',
      creditsRequired: 146,
      isActive: true
    },
    {
      id: '6',
      name: 'Master of Science in Environmental Sciences',
      description: 'Advanced graduate program in environmental research and management',
      icon: 'fas fa-globe-americas',
      level: 'master',
      duration: '2 years (4 semesters)',
      overview: 'The Master\'s program in Environmental Sciences provides advanced training in environmental research, assessment, and management. Students conduct original research and develop expertise in environmental problem-solving.',
      objectives: [
        'Conduct advanced environmental research',
        'Develop expertise in environmental assessment',
        'Apply scientific methods to environmental problems',
        'Prepare for doctoral studies or professional careers',
        'Contribute to environmental knowledge and solutions'
      ],
      requirements: [
        'Bachelor\'s degree in relevant field',
        'Minimum GPA of 3.0',
        'Research experience preferred',
        'English proficiency'
      ],
      courses: [
        'Advanced Environmental Chemistry',
        'Environmental Modeling',
        'Ecosystem Ecology',
        'Environmental Impact Assessment',
        'Climate Change Science',
        'Environmental Policy',
        'Research Methods',
        'Thesis Research'
      ],
      careerOpportunities: [
        'Environmental Consultant',
        'Research Scientist',
        'Environmental Manager',
        'Policy Analyst',
        'Academic Researcher',
        'Government Environmental Specialist',
        'NGO Program Manager',
        'Environmental Educator'
      ],
      admissionRequirements: [
        'Bachelor\'s degree (minimum 3.0 GPA)',
        'GRE scores (recommended)',
        'Three letters of recommendation',
        'Statement of purpose',
        'Research proposal',
        'English proficiency test'
      ],
      fees: '25,000 EGP per year',
      coordinator: 'Prof. Yasmin El-Sherbiny',
      department: 'Environmental Research Center',
      creditsRequired: 36,
      isActive: true
    }
  ];

  getAll(): Program[] {
    return this.programs;
  }

  getById(id: string): Program | undefined {
    return this.programs.find(p => p.id === id);
  }

  getByLevel(level: string): Program[] {
    return this.programs.filter(p => p.level === level);
  }

  getByDepartment(department: string): Program[] {
    return this.programs.filter(p => p.department === department);
  }

  getActivePrograms(): Program[] {
    return this.programs.filter(p => p.isActive);
  }

  searchPrograms(query: string): Program[] {
    const q = query.toLowerCase();
    return this.programs.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q)
    );
  }

  getProgramLevels(): string[] {
    return ['bachelor', 'master', 'phd', 'diploma'];
  }

  getTotalCredits(): number {
    return this.programs.reduce((sum, p) => sum + p.creditsRequired, 0);
  }
}