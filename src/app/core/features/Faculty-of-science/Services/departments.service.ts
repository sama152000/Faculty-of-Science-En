import { Injectable } from '@angular/core';
import { Department } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departments: Department[] = [
    {
      id: '1',
      name: 'Physics',
      icon: 'fa-solid fa-atom',
      order: 1,
      description: 'Exploring the fundamental laws of nature and the universe',
      overview: 'The Physics Department at Luxor University offers comprehensive programs in classical and modern physics, preparing students for careers in research, education, and industry.',
      vision: 'To be a leading center of excellence in physics education and research in Egypt and the Middle East.',
      mission: 'To provide high-quality education in physics, conduct cutting-edge research, and contribute to technological advancement and scientific understanding.',
      objectives: [
        'Provide comprehensive physics education',
        'Conduct innovative research in various physics fields',
        'Foster collaboration with industry and research institutions',
        'Develop students\' analytical and problem-solving skills'
      ],
      courses: [
        'Classical Mechanics',
        'Quantum Physics',
        'Electromagnetic Theory',
        'Thermodynamics',
        'Nuclear Physics',
        'Particle Physics'
      ],
      researchAreas: [
        'Quantum Computing',
        'Nanotechnology',
        'Renewable Energy Physics',
        'Medical Physics',
        'Astrophysics'
      ],
      headOfDepartment: 'Dr. Ahmed Hassan',
      establishedYear: 1950,
      studentCount: 450,
      facultyCount: 25
    },
    {
      id: '2',
      name: 'Chemistry',
      icon: 'fa-solid fa-flask',
      order: 2,
      description: 'Understanding matter and its transformations',
      overview: 'Our Chemistry Department provides state-of-the-art facilities and expert faculty to explore chemical principles and their applications.',
      vision: 'To advance chemical sciences through excellence in education, research, and innovation.',
      mission: 'To educate future chemists, conduct groundbreaking research, and serve society through chemical knowledge and applications.',
      objectives: [
        'Deliver high-quality chemistry education',
        'Promote interdisciplinary research',
        'Support sustainable chemistry practices',
        'Develop industry partnerships'
      ],
      courses: [
        'Organic Chemistry',
        'Inorganic Chemistry',
        'Physical Chemistry',
        'Analytical Chemistry',
        'Biochemistry',
        'Polymer Chemistry'
      ],
      researchAreas: [
        'Green Chemistry',
        'Medicinal Chemistry',
        'Materials Science',
        'Environmental Chemistry',
        'Catalysis'
      ],
      headOfDepartment: 'Dr. Sarah Mohamed',
      establishedYear: 1952,
      studentCount: 380,
      facultyCount: 22
    },
    {
      id: '3',
      name: 'Biology',
      icon: 'fa-solid fa-dna',
      order: 3,
      description: 'Studying life and living organisms',
      overview: 'The Biology Department offers diverse programs covering molecular biology to ecology, with modern laboratories and field research opportunities.',
      vision: 'To be a premier institution for biological sciences education and research.',
      mission: 'To advance understanding of life sciences through teaching, research, and community service.',
      objectives: [
        'Provide comprehensive biology education',
        'Conduct cutting-edge biological research',
        'Promote biodiversity conservation',
        'Foster biotechnology innovation'
      ],
      courses: [
        'Molecular Biology',
        'Genetics',
        'Ecology',
        'Microbiology',
        'Physiology',
        'Biotechnology'
      ],
      researchAreas: [
        'Genomics',
        'Biodiversity Conservation',
        'Medical Biotechnology',
        'Plant Biotechnology',
        'Neuroscience'
      ],
      headOfDepartment: 'Prof. Omar Ali',
      establishedYear: 1955,
      studentCount: 520,
      facultyCount: 30
    },
    {
      id: '4',
      name: 'Geology',
      icon: 'fa-solid fa-earth-africa',
      order: 4,
      description: 'Investigating Earth\'s structure and processes',
      overview: 'Our Geology Department combines classroom learning with extensive field work to understand Earth\'s dynamic systems.',
      vision: 'To lead in geological sciences education and contribute to sustainable Earth resource management.',
      mission: 'To educate geologists, conduct geological research, and promote environmental stewardship.',
      objectives: [
        'Provide excellent geology education',
        'Conduct field-based research',
        'Support natural resource management',
        'Advance geological knowledge'
      ],
      courses: [
        'Mineralogy',
        'Petrology',
        'Structural Geology',
        'Sedimentology',
        'Geophysics',
        'Hydrogeology'
      ],
      researchAreas: [
        'Mineral Resources',
        'Groundwater Management',
        'Earthquake Studies',
        'Climate Change Geology',
        'Remote Sensing'
      ],
      headOfDepartment: 'Dr. Fatima Al-Rashid',
      establishedYear: 1960,
      studentCount: 280,
      facultyCount: 18
    },
    {
      id: '5',
      name: 'Mathematics',
      icon: 'fa-solid fa-calculator',
      order: 5,
      description: 'Exploring patterns, structures, and logical reasoning',
      overview: 'The Mathematics Department offers rigorous programs in pure and applied mathematics, preparing students for diverse careers.',
      vision: 'To be a center of mathematical excellence fostering innovation and critical thinking.',
      mission: 'To provide superior mathematics education and conduct research that advances mathematical knowledge.',
      objectives: [
        'Deliver comprehensive mathematics education',
        'Promote mathematical research',
        'Support interdisciplinary applications',
        'Develop computational skills'
      ],
      courses: [
        'Calculus',
        'Linear Algebra',
        'Abstract Algebra',
        'Real Analysis',
        'Statistics',
        'Discrete Mathematics'
      ],
      researchAreas: [
        'Pure Mathematics',
        'Applied Mathematics',
        'Statistics',
        'Mathematical Modeling',
        'Cryptography'
      ],
      headOfDepartment: 'Prof. Mohamed Ibrahim',
      establishedYear: 1950,
      studentCount: 320,
      facultyCount: 20
    },
    {
      id: '6',
      name: 'Computer Science',
      icon: 'fa-solid fa-laptop-code',
      order: 6,
      description: 'Advancing computational thinking and technology',
      overview: 'Our Computer Science Department provides cutting-edge education in software development, AI, and computer systems.',
      vision: 'To be a leading computer science department driving technological innovation and digital transformation.',
      mission: 'To educate computer scientists, conduct innovative research, and contribute to technological advancement.',
      objectives: [
        'Provide state-of-the-art CS education',
        'Foster innovation in computing',
        'Promote industry collaboration',
        'Advance AI and machine learning research'
      ],
      courses: [
        'Data Structures',
        'Algorithms',
        'Software Engineering',
        'Database Systems',
        'Artificial Intelligence',
        'Computer Networks'
      ],
      researchAreas: [
        'Artificial Intelligence',
        'Machine Learning',
        'Cybersecurity',
        'Data Science',
        'Software Engineering',
        'Computer Vision'
      ],
      headOfDepartment: 'Dr. Youssef Ahmed',
      establishedYear: 1985,
      studentCount: 600,
      facultyCount: 35
    },
    {
      id: '7',
      name: 'Botany',
      icon: 'fa-solid fa-seedling',
      order: 7,
      description: 'Studying plant life and ecosystems',
      overview: 'The Botany Department focuses on plant sciences, from molecular plant biology to ecosystem ecology.',
      vision: 'To advance plant sciences for sustainable agriculture and environmental conservation.',
      mission: 'To educate botanists, conduct plant research, and promote plant biodiversity conservation.',
      objectives: [
        'Provide comprehensive botany education',
        'Conduct plant science research',
        'Support sustainable agriculture',
        'Conserve plant biodiversity'
      ],
      courses: [
        'Plant Physiology',
        'Plant Taxonomy',
        'Plant Ecology',
        'Plant Biotechnology',
        'Mycology',
        'Ethnobotany'
      ],
      researchAreas: [
        'Plant Biotechnology',
        'Medicinal Plants',
        'Plant Ecology',
        'Crop Improvement',
        'Plant Pathology'
      ],
      headOfDepartment: 'Dr. Nour El-Din Hassan',
      establishedYear: 1965,
      studentCount: 250,
      facultyCount: 15
    },
    {
      id: '8',
      name: 'Zoology',
      icon: 'fa-solid fa-fish',
      order: 8,
      description: 'Understanding animal behavior and biology',
      overview: 'Our Zoology Department offers comprehensive study of animal life, from cellular to ecosystem levels.',
      vision: 'To be a leading zoology department advancing animal science knowledge and conservation.',
      mission: 'To educate zoologists, conduct animal research, and promote wildlife conservation.',
      objectives: [
        'Provide excellent zoology education',
        'Conduct animal biology research',
        'Support wildlife conservation',
        'Advance veterinary science knowledge'
      ],
      courses: [
        'Animal Physiology',
        'Animal Behavior',
        'Evolutionary Biology',
        'Entomology',
        'Ichthyology',
        'Ornithology'
      ],
      researchAreas: [
        'Animal Behavior',
        'Conservation Biology',
        'Evolutionary Biology',
        'Marine Biology',
        'Wildlife Management'
      ],
      headOfDepartment: 'Dr. Amira Saleh',
      establishedYear: 1968,
      studentCount: 300,
      facultyCount: 20
    },
    {
      id: '9',
      name: 'Microbiology',
      icon: 'fa-solid fa-microscope',
      order: 9,
      description: 'Exploring microscopic life forms',
      overview: 'The Microbiology Department studies microorganisms and their applications in health, industry, and environment.',
      vision: 'To be a center of excellence in microbiology research and education.',
      mission: 'To advance microbiological knowledge through education and research for societal benefit.',
      objectives: [
        'Provide comprehensive microbiology education',
        'Conduct microbial research',
        'Support public health initiatives',
        'Advance biotechnology applications'
      ],
      courses: [
        'General Microbiology',
        'Medical Microbiology',
        'Industrial Microbiology',
        'Virology',
        'Immunology',
        'Molecular Microbiology'
      ],
      researchAreas: [
        'Medical Microbiology',
        'Food Microbiology',
        'Environmental Microbiology',
        'Microbial Biotechnology',
        'Antimicrobial Resistance'
      ],
      headOfDepartment: 'Prof. Karim Mahmoud',
      establishedYear: 1975,
      studentCount: 220,
      facultyCount: 16
    },
    {
      id: '10',
      name: 'Environmental Science',
      icon: 'fa-solid fa-water',
      order: 10,
      description: 'Protecting and understanding our environment',
      overview: 'Our Environmental Science Department addresses critical environmental challenges through interdisciplinary approaches.',
      vision: 'To lead in environmental education and research for sustainable development.',
      mission: 'To educate environmental scientists and promote sustainable environmental practices.',
      objectives: [
        'Provide environmental science education',
        'Conduct environmental research',
        'Promote sustainable development',
        'Support environmental policy'
      ],
      courses: [
        'Environmental Chemistry',
        'Environmental Biology',
        'Environmental Geology',
        'Environmental Policy',
        'Sustainable Development',
        'Climate Change Science'
      ],
      researchAreas: [
        'Climate Change',
        'Water Resources',
        'Air Quality',
        'Waste Management',
        'Environmental Impact Assessment',
        'Sustainable Energy'
      ],
      headOfDepartment: 'Dr. Layla Hassan',
      establishedYear: 1990,
      studentCount: 350,
      facultyCount: 24
    }
  ];

  getAll(): Department[] {
    return this.departments;
  }

  getById(id: string): Department | undefined {
    return this.departments.find(dept => dept.id === id);
  }

  getByOrder(order: number): Department | undefined {
    return this.departments.find(dept => dept.order === order);
  }

  getTopDepartments(count: number = 6): Department[] {
    return this.departments
      .sort((a, b) => a.order - b.order)
      .slice(0, count);
  }

  getDepartmentsByStudentCount(): Department[] {
    return this.departments
      .sort((a, b) => (b.studentCount || 0) - (a.studentCount || 0));
  }

  getTotalStudents(): number {
    return this.departments.reduce((total, dept) => total + (dept.studentCount || 0), 0);
  }

  getTotalFaculty(): number {
    return this.departments.reduce((total, dept) => total + (dept.facultyCount || 0), 0);
  }

  searchDepartments(query: string): Department[] {
    const lowerQuery = query.toLowerCase();
    return this.departments.filter(dept =>
      dept.name.toLowerCase().includes(lowerQuery) ||
      dept.description.toLowerCase().includes(lowerQuery) ||
      dept.researchAreas.some(area => area.toLowerCase().includes(lowerQuery))
    );
  }
}