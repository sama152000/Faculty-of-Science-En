import { Injectable } from '@angular/core';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Event[] = [
    {
      id: 1,
      title: 'Anemia and Its Causes – Awareness Seminar',
      description: `The Students’ Union of the Faculty of Science, in collaboration with the Community Service and Environmental Development Sector, Youth Welfare Administration, and the “Students for Egypt” Family,”`,
      speaker: 'Dr. Sahar Mahdy Ahmed – Former Director of the Joint Regional Laboratory',
      supervisors: [
        'Prof. Mohamed Abdullah Abbas – Dean of the Faculty of Science',
        'Assoc. Prof. Rokia El-Omari – Vice Dean for Community Service and Environmental Development',
        'Assoc. Prof. Nagwa Hussein – Student Activities Coordinator & Supervisor of “Students for Egypt” Family',
        'Mr. Wajdi Mounir – Director of Youth Welfare'
      ],
      image: './assets/event3.jpg',
      date: new Date('2025-11-11T13:00:00'),
      location: 'Lecture Hall 1 – Faculty of Science',
      category: 'Health Awareness'
    },
    {
      id: 2,
      title: 'Water Conservation and Wastewater Treatment',
      description: `An educational seminar organized by the Faculty of Science in collaboration with Luxor Drinking Water and Sanitation Company on the importance of water conservation and modern wastewater treatment methods.`,
      speaker: 'Eng. Amani Mohamed El-Madani – Community Awareness Consultant, Luxor Drinking Water and Sanitation Company',
      supervisors: [
        'Prof. Sabreen Abdel-Gelil – President of Luxor University (Acting)',
        'Prof. Mohamed Abdullah Abbas – Dean of the Faculty of Science',
        'Assoc. Prof. Rokia El-Omari – Vice Dean for Community Service',
        'Assoc. Prof. Nagwa Hussein – Supervisor of “Students for Egypt” Family'
      ],
      image: './assets/event4.jpg',
      date: new Date('2025-10-27T13:00:00'),
      location: 'Lecture Hall 1 – Faculty of Science',
      category: 'Environmental Awareness'
    },
    {
      id: 3,
      title: 'The Importance of Waste Recycling and Environmental Protection',
      description: `A scientific seminar highlighting practical methods for waste recycling on campus and at home, and its vital role in reducing pollution and preserving natural resources.`,
      speaker: 'Dr. Ahmed Ismail – Lecturer, Department of Chemistry',
      supervisors: [
        'Prof. Mohamed Abdullah Abbas – Dean of the Faculty',
        'Assoc. Prof. Rokia El-Omari – Vice Dean for Environmental Affairs',
        'Assoc. Prof. Nagwa Hussein – Student Activities Coordinator',
        'Youth Welfare Administration'
      ],
      image: './assets/event1.jpg',
      date: new Date('2025-11-18T13:00:00'), // تاريخ تقريبي لأنه مكتوب "قريباً"
      location: 'Lecture Hall 1 – Faculty of Science',
      category: 'Environmental Awareness'
    },
    {
      id: 4,
      title: 'Combating Harassment – Awareness Seminar',
      description: `An important awareness seminar addressing the issue of harassment, its forms, and how to confront it to build a safe and respectful university environment for all.`,
      speaker: 'Sheikh Mostafa El-Nobi',
      supervisors: [
        'Prof. Mohamed Abdullah Abbas – Dean of the Faculty of Science',
        'Assoc. Prof. Rokia El-Omari – Vice Dean for Community Service and Environmental Development',
        'Assoc. Prof. Nagwa Hussein – Supervisor of “Students for Egypt” Family'
      ],
      image: './assets/event2.jpg',
      date: new Date('2025-11-10T13:00:00'),
      location: 'Lecture Hall 1 – Faculty of Science',
      category: 'Social Awareness'
    }
  ];

  getAll(): Event[] {
    return this.events;
  }

  getById(id: number): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  getUpcoming(count: number = 4): Event[] {
    const now = new Date();
    return this.events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, count);
  }

  getPast(): Event[] {
    const now = new Date();
    return this.events
      .filter(event => event.date < now)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}