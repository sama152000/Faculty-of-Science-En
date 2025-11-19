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
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'Research',
      description: 'Students conducting advanced research in our modern laboratories'
    },
    {
      id: 2,
      title: 'Student Activities',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'Events',
      description: 'Active student participation in scientific events and competitions'
    },
    {
      id: 3,
      title: 'Research Center',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'Facilities',
      description: 'State-of-the-art research facilities and equipment'
    },
    {
      id: 4,
      title: 'Academic Seminar',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'Education',
      description: 'Regular seminars and academic discussions'
    },
    {
      id: 5,
      title: 'Department Activities',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'Activities',
      description: 'Various departmental activities and workshops'
    },
    {
      id: 6,
      title: 'Science Exhibition',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
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