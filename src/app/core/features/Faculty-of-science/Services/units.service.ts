import { Injectable } from '@angular/core';
import { UnitCenter } from '../model/unit-center.model';

@Injectable({
  providedIn: 'root'
})
export class UnitsCentersService {
  private unitsAndCenters: UnitCenter[] = [
    // Units
    {
      id: '1',
      name: 'Quality Assurance Unit',
      type: 'unit',
      description: 'Ensuring academic excellence and continuous improvement',
      icon: 'fas fa-award',
      overview: 'The Quality Assurance Unit is responsible for maintaining and improving the quality of education, research, and services provided by the Faculty of Science. We implement quality standards, conduct assessments, and support continuous improvement initiatives.',
      objectives: [
        'Implement quality assurance standards',
        'Monitor academic performance',
        'Support accreditation processes',
        'Facilitate continuous improvement',
        'Ensure compliance with regulations'
      ],
      services: [
        'Academic program evaluation',
        'Faculty performance assessment',
        'Student satisfaction surveys',
        'Quality improvement planning',
        'Accreditation support'
      ],
      facilities: [
        'Assessment center',
        'Data analysis laboratory',
        'Meeting rooms',
        'Documentation center'
      ],
      director: 'Dr. Amira Mostafa',
      establishedYear: 2019,
      location: 'Administration Building, 2nd Floor',
      contactEmail: 'qa@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1240',
      isActive: true
    },
    {
      id: '2',
      name: 'Information Technology Unit',
      type: 'unit',
      description: 'Managing IT infrastructure and digital services',
      icon: 'fas fa-laptop',
      overview: 'The IT Unit provides comprehensive technology support for the faculty, including network management, software licensing, technical support, and digital infrastructure development.',
      objectives: [
        'Maintain IT infrastructure',
        'Provide technical support',
        'Manage digital resources',
        'Ensure cybersecurity',
        'Support digital transformation'
      ],
      services: [
        'Network administration',
        'Software support',
        'Hardware maintenance',
        'Cybersecurity services',
        'Digital training'
      ],
      facilities: [
        'Server room',
        'IT support center',
        'Computer laboratories',
        'Network infrastructure'
      ],
      director: 'Eng. Khaled Ahmed',
      establishedYear: 2018,
      location: 'IT Building, Ground Floor',
      contactEmail: 'it@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1241',
      website: 'https://it.science.luxor.edu.eg',
      isActive: true
    },
    {
      id: '3',
      name: 'Student Affairs Unit',
      type: 'unit',
      description: 'Supporting student life and academic success',
      icon: 'fas fa-users',
      overview: 'The Student Affairs Unit is dedicated to supporting student success through comprehensive services including academic advising, extracurricular activities, and student welfare programs.',
      objectives: [
        'Support student academic success',
        'Organize extracurricular activities',
        'Provide student counseling',
        'Facilitate student services',
        'Promote student engagement'
      ],
      services: [
        'Academic advising',
        'Student counseling',
        'Activity coordination',
        'Scholarship assistance',
        'Career guidance'
      ],
      facilities: [
        'Student service center',
        'Counseling rooms',
        'Activity halls',
        'Study areas'
      ],
      director: 'Dr. Mona Hassan',
      establishedYear: 2018,
      location: 'Student Services Building',
      contactEmail: 'students@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1242',
      isActive: true
    },
    // Centers
    {
      id: '4',
      name: 'Environmental Research Center',
      type: 'center',
      description: 'Advanced research in environmental sciences and sustainability',
      icon: 'fas fa-globe-americas',
      overview: 'The Environmental Research Center conducts cutting-edge research in environmental sciences, climate change, and sustainability. We collaborate with national and international institutions to address environmental challenges.',
      objectives: [
        'Conduct environmental research',
        'Monitor environmental changes',
        'Develop sustainable solutions',
        'Provide environmental consulting',
        'Train environmental specialists'
      ],
      services: [
        'Environmental monitoring',
        'Research collaboration',
        'Consulting services',
        'Training programs',
        'Policy development support'
      ],
      facilities: [
        'Environmental laboratories',
        'Field research stations',
        'Data analysis center',
        'Conference facilities'
      ],
      director: 'Prof. Yasmin El-Sherbiny',
      establishedYear: 2020,
      location: 'Research Complex, Building C',
      contactEmail: 'environment@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1243',
      website: 'https://erc.science.luxor.edu.eg',
      isActive: true
    },
    {
      id: '5',
      name: 'Biotechnology Research Center',
      type: 'center',
      description: 'Innovation in biotechnology and life sciences',
      icon: 'fas fa-dna',
      overview: 'The Biotechnology Research Center focuses on advanced research in biotechnology, molecular biology, and biomedical applications. We develop innovative solutions for health, agriculture, and industry.',
      objectives: [
        'Advance biotechnology research',
        'Develop biomedical applications',
        'Support agricultural innovation',
        'Foster industry partnerships',
        'Train biotechnology professionals'
      ],
      services: [
        'Molecular analysis',
        'Genetic testing',
        'Bioprocess development',
        'Research collaboration',
        'Technology transfer'
      ],
      facilities: [
        'Molecular biology labs',
        'Cell culture facilities',
        'Bioinformatics center',
        'Pilot plant facility'
      ],
      director: 'Dr. Rania Farouk',
      establishedYear: 2021,
      location: 'Research Complex, Building B',
      contactEmail: 'biotech@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1244',
      website: 'https://btc.science.luxor.edu.eg',
      isActive: true
    },
    {
      id: '6',
      name: 'Materials Science Center',
      type: 'center',
      description: 'Research and development in advanced materials',
      icon: 'fas fa-atom',
      overview: 'The Materials Science Center conducts research in advanced materials, nanotechnology, and materials characterization. We develop new materials for various applications and provide materials testing services.',
      objectives: [
        'Develop advanced materials',
        'Conduct materials research',
        'Provide characterization services',
        'Support industrial applications',
        'Train materials scientists'
      ],
      services: [
        'Materials characterization',
        'Nanomaterials synthesis',
        'Materials testing',
        'Consulting services',
        'Research partnerships'
      ],
      facilities: [
        'Characterization laboratories',
        'Synthesis facilities',
        'Testing equipment',
        'Clean room facilities'
      ],
      director: 'Prof. Mahmoud Abdel Aziz',
      establishedYear: 2022,
      location: 'Research Complex, Building A',
      contactEmail: 'materials@science.luxor.edu.eg',
      contactPhone: '+20 95 237 1245',
      isActive: true
    }
  ];

  getAll(): UnitCenter[] {
    return this.unitsAndCenters;
  }

  getUnits(): UnitCenter[] {
    return this.unitsAndCenters.filter(uc => uc.type === 'unit');
  }

  getCenters(): UnitCenter[] {
    return this.unitsAndCenters.filter(uc => uc.type === 'center');
  }

  getById(id: string): UnitCenter | undefined {
    return this.unitsAndCenters.find(uc => uc.id === id);
  }

  getActive(): UnitCenter[] {
    return this.unitsAndCenters.filter(uc => uc.isActive);
  }

  searchUnitsAndCenters(query: string): UnitCenter[] {
    const q = query.toLowerCase();
    return this.unitsAndCenters.filter(uc =>
      uc.name.toLowerCase().includes(q) ||
      uc.description.toLowerCase().includes(q) ||
      uc.type.toLowerCase().includes(q)
    );
  }
}