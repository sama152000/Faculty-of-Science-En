import { Injectable } from '@angular/core';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Event[] = [
    {
      id: 1,
      title: 'Research Symposium',
      description: 'A gathering of researchers to discuss the latest scientific breakthroughs and collaborations in various fields of science.',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      date: new Date('2025-10-25'),
      location: 'Main Auditorium',
      category: 'Research'
    },
    {
      id: 2,
      title: 'Physics Department Seminar',
      description: 'Guest lecture by Dr. Ahmed on quantum materials and their modern applications in technology and industry.',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      date: new Date('2025-11-08'),
      location: 'Physics Lab',
      category: 'Seminar'
    },
    {
      id: 3,
      title: 'Annual Science Exhibition',
      description: 'Students showcase innovative projects from across all departments of the Faculty of Science, highlighting creativity and scientific excellence.',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      date: new Date('2025-12-02'),
      location: 'Exhibition Hall',
      category: 'Exhibition'
    },
    {
      id: 4,
      title: 'Environmental Awareness Day',
      description: 'A campus-wide event promoting sustainability and eco-friendly scientific practices for a better future.',
      image: 'https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      date: new Date('2026-01-15'),
      location: 'Campus Grounds',
      category: 'Awareness'
    }
  ];

  getAll(): Event[] {
    return this.events;
  }

  getById(id: number): Event | undefined {
    return this.events.find(item => item.id === id);
  }

  getUpcoming(count: number = 4): Event[] {
    const now = new Date();
    return this.events
      .filter(event => event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, count);
  }
}