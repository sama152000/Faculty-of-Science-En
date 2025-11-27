import { Injectable } from '@angular/core';
import { News } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private news: News[] = [
    {
      id: 1,
      title: 'Volunteerism Awareness Seminar with Egyptian Red Crescent',
      content: `As part of the Faculty of Science’s continuous efforts to promote volunteerism and community service, a highly successful awareness seminar was held in collaboration with the Egyptian Red Crescent Society and the Directorate of Social Solidarity in Luxor.

Speakers:
• Mr. Omar Hassan Hanafy – Volunteer Member & University Outreach Coordinator, Egyptian Red Crescent
• Dr. Hala Ali Nazir – Head of the Solidarity Unit, Directorate of Social Solidarity – Luxor

The seminar covered first aid basics, emergency response, fire safety protocols, and the vital role of volunteer work in community development. The event saw outstanding student participation and interaction.

Under the patronage of Prof. Sabreen Abdel-Gelil (President of Luxor University) and supervised by Prof. Mohamed Abdullah Abbas (Dean), Assoc. Prof. Rokia El-Omari, Assoc. Prof. Nagwa Hussein, and Mr. Wajdi Mounir.`,
      excerpt: 'A highly engaging volunteerism awareness seminar was organized in collaboration with the Egyptian Red Crescent, focusing on first aid and community service.',
      image: './assets/new1.jpg',
      date: new Date('2025-11-20'),
      author: 'Faculty of Science Media Team',
      category: 'Community Service',
      type: 'news',
      tags: ['Volunteerism', 'Red Crescent', 'Community', 'Awareness']
    },
    {
      id: 2,
      title: '52nd Anniversary of the Glorious October Victory Celebration',
      content: `The Faculty of Science proudly commemorated the 52nd anniversary of the October Victory with a grand patriotic ceremony under the patronage of Prof. Sabreen Abdel-Gelil and Prof. Mohamed Abdullah Abbas.

The celebration featured:
• Egyptian National Anthem
• Quranic recitation & patriotic poetry
• National songs
• An inspiring seminar titled “Egypt: The Place and the Prestige” by Prof. Ahmed Abdel-Bary (Physics Department)

Nearly 120 students attended this heartfelt celebration of national pride and unity.

Organized by the Students’ Union and “Students for Egypt” Family.`,
      excerpt: 'A grand ceremony marking the 52nd anniversary of the October Victory with patriotic performances and an inspiring seminar.',
      image: './assets/new2.jpg',
      date: new Date('2025-10-07'),
      author: 'Students’ Union – Faculty of Science',
      category: 'National Celebration',
      type: 'news',
      tags: ['October Victory', 'National Day', 'Patriotism', 'Students Activities']
    },
    {
      id: 3,
      title: 'Honoring Outstanding Students and Volunteers',
      content: `Under the generous patronage of University President Prof. Sabreen Abdel-Gelil and Dean Prof. Mohamed Abdullah Abbas, the Faculty of Science held a special ceremony to honor:

• Top-ranking students in each department
• Volunteer teaching assistants and staff
• Active members of the Students’ Union
• Outstanding participants in student activities

The ceremony celebrated dedication, academic excellence, and contributions to the faculty’s vibrant student life.

Heartfelt thanks to all honorees for their passion and commitment. Together, we build a brighter future!`,
      excerpt: 'A special ceremony honored top students, volunteers, and active participants for their excellence and dedication.',
      image: './assets/new3.jpg',
      date: new Date('2025-11-15'),
      author: 'Faculty Administration',
      category: 'Achievement',
      type: 'news',
      tags: ['Honoring', 'Students', 'Excellence', 'Volunteer']
    },
    {
      id: 4,
      title: 'Scientific Field Trip to El-Dababiya Geological Protected Area',
      content: `A highly successful scientific field trip was organized to El-Dababiya Protected Area in Esna, one of the world’s most important geological sites.

Led by Dr. Mohamed Abdo (Geology Department) and supervised by the Dean, vice deans, and Youth Welfare Administration, the trip allowed students to connect theoretical knowledge with real-world geological phenomena.

Students enjoyed interactive field discussions, hands-on learning, and exploration of this globally significant stratigraphic section.

A truly inspiring day of science and discovery in the heart of Upper Egypt!`,
      excerpt: 'Students explored the world-famous El-Dababiya Geological Protected Area in a hands-on scientific field trip.',
      image: './assets/new4.jpg',
      date: new Date('2025-11-05'),
      author: 'Geology Department & Students’ Union',
      category: 'Field Trip',
      type: 'news',
      tags: ['Geology', 'Field Trip', 'El-Dababiya', 'Education']
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

  getLatest(count: number = 3): News[] {
    return this.news
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, count);
  }

  getByCategory(category: string): News[] {
    return this.news.filter(n => n.category === category);
  }

  getRelatedNews(id: number): News[] {
    return [];
  }
}