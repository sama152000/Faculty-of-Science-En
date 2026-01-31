import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../../Services/gallery.service';
import { GalleryItem } from '../../../model/gallery.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-our-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-gallery.component.html',
  styleUrls: ['./our-gallery.component.css'],
})
export class OurGalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];
  selectedImage: GalleryItem | null = null;
  selectedIndex = 0;

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryItems = this.galleryService.getAll();
  }
  openImage(item: any, index: number) {
    this.selectedImage = item;
    this.selectedIndex = index;

    const modal = new Modal(document.getElementById('imageModal')!);
    modal.show();
  }

  nextImage() {
    this.selectedIndex = (this.selectedIndex + 1) % this.galleryItems.length;
    this.selectedImage = this.galleryItems[this.selectedIndex];
  }

  prevImage() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.galleryItems.length) %
      this.galleryItems.length;
    this.selectedImage = this.galleryItems[this.selectedIndex];
  }
}
