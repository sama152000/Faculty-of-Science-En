import { Injectable } from '@angular/core';
import { GalleryItem } from '../model/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Laboratory Research',
      image: './assets/new4.jpg',
      category: 'Research',
      description: 'Students conducting advanced research in our modern laboratories'
    },
    {
      id: 2,
      title: 'Student Activities',
      image: './assets/new3.jpg',
      category: 'Events',
      description: 'Active student participation in scientific events and competitions'
    },
    {
      id: 3,
      title: 'Research Center',
      image: './assets/new2.jpg',
      category: 'Facilities',
      description: 'State-of-the-art research facilities and equipment'
    },
    {
      id: 4,
      title: 'Academic Seminar',
      image: './assets/new1.jpg',
      category: 'Education',
      description: 'Regular seminars and academic discussions'
    },
    {
      id: 5,
      title: 'Department Activities',
      image: './assets/new1.jpg',
      category: 'Activities',
      description: 'Various departmental activities and workshops'
    },
    {
      id: 6,
      title: 'Science Exhibition',
      image: './assets/new4.jpg',
      category: 'Exhibition',
      description: 'Annual science exhibition showcasing student projects'
    }
  ];

  getAll(): GalleryItem[] {
    return this.galleryItems;
  }

  getById(id: number): GalleryItem | undefined {
    return this.galleryItems.find(item => item.id === id);
  }

  getByCategory(category: string): GalleryItem[] {
    return this.galleryItems.filter(item => item.category === category);
  }
}