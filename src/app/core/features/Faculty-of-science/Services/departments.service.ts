import { Injectable } from '@angular/core';
import { Department } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departments: Department[] = [
    {
      id: '1',
      name: 'Geology',
      icon: 'fa-solid fa-earth-africa',
      order: 1,
      description: 'Studying the Earth\'s structure, materials, and processes',
      overview: 'The Department of Geology at the Faculty of Science, Luxor University, combines advanced academic education with intensive fieldwork in one of the world\'s richest geological and archaeological regions.',
      vision: 'The Department of Geology at the Faculty of Science, Luxor University, strives to achieve leadership and excellence in geological education, scientific research, community service, knowledge production, and sustainable development at both local and international levels.',
      mission: `The Department of Geology is committed to attaining excellence and global competitiveness through:
1. Delivering high-quality educational programs that enrich scientific knowledge and contribute to human development at local and regional levels.
2. Graduating highly competent professionals capable of providing advanced scientific, consulting, and research services to society and the environment.
3. Conducting outstanding scientific research that addresses community challenges, supported by specialized service units.
4. Offering developmental and technical services to companies, factories, and industries in Luxor Governorate and surrounding regions.
5. Fostering creativity, innovation, and entrepreneurial skills among students and graduates to support sustainable development goals.`,
      objectives: [
        'Provide distinguished geological education',
        'Conduct field-based and applied research',
        'Support natural resource management',
        'Contribute to solving environmental and developmental challenges'
      ],
      courses: [
        'Mineralogy', 'Petrology', 'Structural Geology', 'Sedimentology',
        'Geophysics', 'Hydrogeology', 'Environmental Geology', 'Archaeological Geology'
      ],
      researchAreas: [
        'Mineral Resources',
        'Groundwater Management',
        'Environmental Geology',
        'Archaeological Geology and Heritage',
        'Seismology and Geological Hazards'
      ],
      programs: [
        'Bachelor of Science in Geology',
        'Bachelor of Science in Geology and Chemistry',
        'Bachelor of Science in Geophysics'
      ],
      headOfDepartment: 'Dr. Mohamed Abdel Rahman',
      establishedYear: 2018,
      studentCount: 285,
      facultyCount: 21
    },
    {
      id: '2',
      name: 'Mathematics',
      icon: 'fa-solid fa-calculator',
      order: 2,
      description: 'Exploring patterns, structures, and logical reasoning',
      overview: 'The Department of Mathematics offers distinguished programs in pure and applied mathematics with a focus on developing analytical and critical thinking skills.',
      vision: 'The Department of Mathematics at the Faculty of Science, Luxor University, aspires to achieve leadership and excellence in education, scientific research, community service, knowledge production, and sustainable development.',
      mission: `The Department of Mathematics is committed to attaining distinction and international competitiveness through:
1. Offering high-quality educational programs that enrich human knowledge and contribute to intellectual and cultural advancement.
2. Producing highly skilled graduates capable of delivering advanced scientific, consulting, and research services.
3. Conducting distinguished scientific research that addresses societal challenges.
4. Providing developmental and technical services to companies and industries in Luxor and neighboring areas.
5. Nurturing creativity, innovation, and entrepreneurial skills to support sustainable development pathways.`,
      objectives: [
        'Provide comprehensive education in pure and applied mathematics',
        'Develop critical thinking and problem-solving skills',
        'Foster research in mathematical sciences',
        'Prepare graduates for diverse career opportunities',
        'Contribute to mathematical knowledge and applications'
      ],
      courses: [
        'Calculus I', 'Calculus II', 'Linear Algebra', 'Abstract Algebra',
        'Real Analysis', 'Complex Analysis', 'Differential Equations', 'Discrete Mathematics',
        'Probability and Statistics', 'Numerical Analysis', 'Topology', 'Geometry'
      ],
      researchAreas: [
        'Pure Mathematics (Algebra, Analysis, Geometry)',
        'Applied Mathematics (Modeling, Optimization)',
        'Mathematical Physics',
        'Statistics and Data Analysis',
        'Computational Mathematics'
      ],
      programs: ['Bachelor of Science in Mathematics'],
      headOfDepartment: 'Prof. Ibrahim El-Sayed',
      establishedYear: 2018,
      studentCount: 310,
      facultyCount: 24
    },
    {
      id: '3',
      name: 'Physics',
      icon: 'fa-solid fa-atom',
      order: 3,
      description: 'Investigating the fundamental laws of nature and the universe',
      overview: 'The Department of Physics provides comprehensive education in classical and modern physics using advanced laboratories and research facilities.',
      vision: 'The Department of Physics strives to lead in the fields of education, scientific research, community service, knowledge production, and sustainable development.',
      mission: `The Department is committed to achieving excellence and global competitiveness through delivering high-quality education, graduating competent professionals, conducting outstanding research, providing technical services, and cultivating innovation among students.`,
      objectives: [
        'Provide fundamental understanding of physical laws and principles',
        'Develop experimental and theoretical skills in physics',
        'Foster research in physics and its applications',
        'Prepare students for careers in science, technology, and education',
        'Contribute to advancements in physical sciences'
      ],
      courses: [
        'Classical Mechanics', 'Electromagnetism', 'Quantum Mechanics', 'Thermodynamics',
        'Optics', 'Nuclear Physics', 'Solid State Physics', 'Particle Physics',
        'Mathematical Physics', 'Computational Physics', 'Astrophysics', 'Biophysics'
      ],
      researchAreas: [
        'Theoretical Physics',
        'Experimental Physics',
        'Applied Physics',
        'Medical Physics',
        'Renewable Energy Physics'
      ],
      programs: ['Bachelor of Science in Physics'],
      headOfDepartment: 'Dr. Ahmed Mahmoud',
      establishedYear: 2018,
      studentCount: 295,
      facultyCount: 22
    },
    {
      id: '4',
      name: 'Chemistry',
      icon: 'fa-solid fa-flask',
      order: 4,
      description: 'Understanding matter and its transformations',
      overview: 'The Department of Chemistry offers modern laboratories and specialized faculty across all chemistry disciplines with strong industrial consulting units.',
      vision: 'The Department of Chemistry strives to achieve leadership and excellence in education, scientific research, community service, knowledge production, and sustainable development.',
      mission: `Committed to excellence through high-quality education, graduating skilled professionals, distinguished research (e.g., Soap and Detergents Industry Consulting Unit), industrial services, and fostering innovation.`,
      objectives: [
        'Provide comprehensive education in chemical sciences',
        'Develop laboratory and analytical skills',
        'Foster research in chemistry and its applications',
        'Prepare students for careers in industry, research, and education',
        'Contribute to chemical knowledge and industrial advancements'
      ],
      courses: [
        'General Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry',
        'Analytical Chemistry', 'Biochemistry', 'Polymer Chemistry', 'Environmental Chemistry',
        'Medicinal Chemistry', 'Computational Chemistry', 'Spectroscopy', 'Electrochemistry'
      ],
      researchAreas: [
        'Organic Synthesis',
        'Analytical Chemistry',
        'Environmental Chemistry',
        'Industrial Chemistry',
        'Biochemistry and Biotechnology'
      ],
      programs: ['Bachelor of Science in Chemistry'],
      headOfDepartment: 'Prof. Sarah Ali',
      establishedYear: 2018,
      studentCount: 320,
      facultyCount: 26
    },
    {
      id: '5',
      name: 'Botany and Microbiology',
      icon: 'fa-solid fa-seedling',
      order: 5,
      description: 'Studying plants, microorganisms, and their environmental interactions',
      overview: 'The Department focuses on plant sciences and microbiology with applications in environment, industry, and biotechnology.',
      vision: 'The Department of Botany and Microbiology aspires to lead in education, scientific research, community service, knowledge production, and sustainable development.',
      mission: `Achieving excellence through distinguished educational programs, scientific research, consulting services, and nurturing creativity and innovation.`,
      objectives: [
        'Provide education in botany and microbiology',
        'Develop skills in plant and microbial sciences',
        'Foster research in biodiversity and biotechnology',
        'Prepare students for careers in environmental science and biotechnology',
        'Contribute to understanding of plant-microbe interactions'
      ],
      courses: [
        'Plant Physiology', 'Microbiology', 'Plant Taxonomy', 'Bacteriology',
        'Mycology', 'Virology', 'Plant Biotechnology', 'Environmental Microbiology',
        'Ecology', 'Genetics', 'Biochemistry', 'Molecular Biology'
      ],
      researchAreas: [
        'Plant Biotechnology',
        'Microbial Ecology',
        'Environmental Microbiology',
        'Plant Pathology',
        'Biodiversity and Conservation'
      ],
      programs: [
        'Bachelor of Science in Botany and Chemistry',
        'Bachelor of Science in Botany and Microbiology',
        'Bachelor of Science in Microbiology and Chemistry'
      ],
      headOfDepartment: 'Dr. Norhan El-Sayed',
      establishedYear: 2018,
      studentCount: 340,
      facultyCount: 28
    },
    {
      id: '6',
      name: 'Zoology',
      icon: 'fa-solid fa-fish',
      order: 6,
      description: 'Exploring animal biology, behavior, and ecosystems',
      overview: 'The Department offers comprehensive study of animal life from cellular to ecological levels with emphasis on biodiversity and conservation.',
      vision: 'The Department of Zoology strives to achieve leadership and excellence in education, scientific research, community service, knowledge production, and sustainable development.',
      mission: `Committed to high-quality education, graduating skilled professionals, distinguished research, community services, and supporting sustainable development goals.`,
      objectives: [
        'Provide comprehensive education in zoology and animal sciences',
        'Develop skills in animal biology and ecology',
        'Foster research in biodiversity and conservation',
        'Prepare students for careers in wildlife management and research',
        'Contribute to understanding of animal behavior and ecosystems'
      ],
      courses: [
        'Animal Physiology', 'Ecology', 'Animal Behavior', 'Genetics',
        'Developmental Biology', 'Evolutionary Biology', 'Marine Biology', 'Entomology',
        'Ichthyology', 'Ornithology', 'Mammalogy', 'Conservation Biology'
      ],
      researchAreas: [
        'Animal Ecology',
        'Behavioral Biology',
        'Conservation Biology',
        'Evolutionary Biology',
        'Aquatic Biology'
      ],
      programs: [
        'Bachelor of Science in Zoology',
        'Bachelor of Science in Zoology and Chemistry'
      ],
      headOfDepartment: 'Dr. Reham Mohamed',
      establishedYear: 2018,
      studentCount: 270,
      facultyCount: 19
    }
  ];

  getAll(): Department[] { return this.departments; }
  getById(id: string): Department | undefined {
    return this.departments.find(d => d.id === id);
  }
  getByOrder(order: number): Department | undefined {
    return this.departments.find(d => d.order === order);
  }
  getTopDepartments(count = 6): Department[] {
    return this.departments.sort((a, b) => a.order - b.order).slice(0, count);
  }
  getDepartmentsByStudentCount(): Department[] {
    return this.departments.sort((a, b) => (b.studentCount || 0) - (a.studentCount || 0));
  }
  getTotalStudents(): number {
    return this.departments.reduce((sum, d) => sum + (d.studentCount || 0), 0);
  }
  getTotalFaculty(): number {
    return this.departments.reduce((sum, d) => sum + (d.facultyCount || 0), 0);
  }
  searchDepartments(query: string): Department[] {
    const q = query.toLowerCase();
    return this.departments.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.programs?.some(p => p.toLowerCase().includes(q))
    );
  }
}