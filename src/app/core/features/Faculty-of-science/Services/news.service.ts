import { Injectable } from '@angular/core';
import { News } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private news: News[] = [
    {
      id: 1,
      title: 'Breakthrough in Quantum Chemistry',
      content: 'The Faculty of Science team has achieved new milestones in quantum reaction studies, paving the way for next-generation materials. This groundbreaking research, led by our Chemistry Department, represents a significant advancement in understanding molecular interactions at the quantum level. The research team, comprising both faculty and graduate students, has been working on this project for over two years, utilizing state-of-the-art computational methods and experimental techniques. The findings have been published in a prestigious international journal and are expected to have far-reaching implications for materials science, drug discovery, and renewable energy applications.',
      excerpt: 'The Faculty of Science team has achieved new milestones in quantum reaction studies, paving the way for next-generation materials.',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-10-10'),
      author: 'Dr. Ahmed Hassan',
      category: 'Research',
      type: 'news',
      tags: ['Chemistry', 'Quantum', 'Research', 'Materials Science'],
      relatedIds: [2, 5]
    },
    {
      id: 2,
      title: 'Environmental Awareness Week Success',
      content: 'Students and staff collaborated to promote green initiatives across Luxor University through engaging campus events. The week-long celebration featured workshops on sustainable living, tree planting ceremonies, and presentations on climate change mitigation strategies. Over 500 students participated in various activities, including a recycling drive that collected over 2 tons of materials. The Environmental Science Department organized expert talks on renewable energy, biodiversity conservation, and sustainable agriculture. Local environmental organizations also participated, creating a platform for community engagement and awareness.',
      excerpt: 'Students and staff collaborated to promote green initiatives across Luxor University through engaging campus events.',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-09-28'),
      author: 'Dr. Sarah Mohamed',
      category: 'Events',
      type: 'news',
      tags: ['Environment', 'Sustainability', 'Students', 'Community'],
      relatedIds: [3, 6]
    },
    {
      id: 3,
      title: 'Students Win National Award',
      content: 'Our computer science students earned first place in the national programming competition, demonstrating excellence in software development and algorithmic thinking.',
      excerpt: 'Our computer science students earned first place in the national programming competition.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-09-05'),
      author: 'Dr. Omar Ali',
      category: 'Achievement',
      type: 'news',
      tags: ['Computer Science', 'Competition', 'Students', 'Achievement'],
      relatedIds: [4, 7]
    },
    {
      id: 4,
      title: 'Annual Biology Conference 2025',
      content: 'Experts from around Egypt joined to present new research in genetics, ecology, and bioinformatics. The three-day conference attracted over 200 researchers, academics, and industry professionals. Keynote speakers included internationally renowned biologists who shared insights on cutting-edge research in CRISPR gene editing, marine ecology, and computational biology. Our faculty presented 15 research papers, with several receiving recognition for their innovative approaches. The conference also featured poster sessions where graduate students showcased their research projects, fostering collaboration and knowledge exchange within the scientific community.',
      excerpt: 'Experts from around Egypt joined to present new research in genetics, ecology, and bioinformatics.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-09-05'),
      author: 'Prof. Omar Ali',
      category: 'Conference',
      type: 'news',
      tags: ['Biology', 'Conference', 'Research', 'Genetics'],
      relatedIds: [3, 7]
    },
    {
      id: 5,
      title: 'Student Innovation Fair Highlights',
      content: 'Our students showcased creative solutions and inventions in the annual Faculty Innovation Challenge. The event featured over 50 projects spanning multiple disciplines, from AI-powered diagnostic tools to sustainable energy solutions. First place went to a team that developed a low-cost water purification system using locally available materials. The fair attracted industry representatives who offered internships and collaboration opportunities to promising students. This year\'s theme focused on "Technology for Social Good," encouraging students to develop solutions that address real-world problems in their communities.',
      excerpt: 'Our students showcased creative solutions and inventions in the annual Faculty Innovation Challenge.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-08-20'),
      author: 'Dr. Fatima Al-Rashid',
      category: 'Innovation',
      type: 'news',
      tags: ['Innovation', 'Students', 'Technology', 'Competition'],
      relatedIds: [1, 8]
    },
    {
      id: 6,
      title: 'Understanding Quantum Mechanics in Modern Chemistry',
      content: 'This comprehensive article explores the fundamental principles of quantum mechanics and their applications in modern chemistry. Quantum mechanics has revolutionized our understanding of chemical bonding, molecular structure, and reaction mechanisms. The article discusses key concepts such as wave-particle duality, quantum superposition, and entanglement, and how these principles apply to chemical systems. It also covers recent advances in quantum chemistry software and computational methods that allow researchers to predict molecular properties and design new materials with unprecedented accuracy.',
      excerpt: 'A comprehensive exploration of quantum mechanics principles and their applications in modern chemistry.',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-09-15'),
      author: 'Prof. Ahmed Hassan',
      category: 'Academic',
      type: 'article',
      tags: ['Quantum Mechanics', 'Chemistry', 'Theory', 'Education'],
      relatedIds: [1, 9]
    },
    {
      id: 7,
      title: 'Climate Change and Biodiversity Conservation',
      content: 'This article examines the complex relationship between climate change and biodiversity loss, focusing on conservation strategies for the 21st century. Climate change poses unprecedented challenges to global biodiversity, with rising temperatures, changing precipitation patterns, and extreme weather events threatening ecosystems worldwide. The article discusses various conservation approaches, including protected area management, species reintroduction programs, and ecosystem restoration techniques. It also highlights the role of local communities in conservation efforts and the importance of integrating traditional ecological knowledge with modern scientific methods.',
      excerpt: 'Examining the relationship between climate change and biodiversity loss, with focus on conservation strategies.',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-08-30'),
      author: 'Dr. Sarah Mohamed',
      category: 'Environmental',
      type: 'article',
      tags: ['Climate Change', 'Biodiversity', 'Conservation', 'Environment'],
      relatedIds: [2, 10]
    },
    {
      id: 8,
      title: 'Advances in Genetic Engineering and CRISPR Technology',
      content: 'This article provides an in-depth look at recent advances in genetic engineering, with particular focus on CRISPR-Cas9 technology and its applications. CRISPR has revolutionized genetic research by providing a precise, efficient, and relatively inexpensive method for editing genes. The article covers the history of genetic engineering, the discovery and development of CRISPR technology, and its current applications in medicine, agriculture, and biotechnology. It also discusses ethical considerations and future prospects for genetic engineering, including potential treatments for genetic diseases and the development of genetically modified crops.',
      excerpt: 'An in-depth exploration of CRISPR technology and recent advances in genetic engineering applications.',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: new Date('2025-07-25'),
      author: 'Prof. Omar Ali',
      category: 'Biotechnology',
      type: 'article',
      tags: ['CRISPR', 'Genetic Engineering', 'Biotechnology', 'Medicine'],
      relatedIds: [3, 11]
    }
  ];

  getAll(): News[] {
    return this.news;
  }

  getById(id: number): News | undefined {
    return this.news.find(item => item.id === id);
  }

  getByType(type: 'news' | 'article'): News[] {
    return this.news.filter(item => item.type === type);
  }

  getRelatedNews(id: number): News[] {
    const currentItem = this.getById(id);
    if (!currentItem || !currentItem.relatedIds) {
      return [];
    }

    return currentItem.relatedIds
      .map(relatedId => this.getById(relatedId))
      .filter(item => item !== undefined) as News[];
  }

  getLatest(count: number = 3): News[] {
    return this.news
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, count);
  }
}
