import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../../Services/gallery.service';
import { GalleryItem } from '../../../model/gallery.model';

@Component({
  selector: 'app-our-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-gallery.component.html',
  styleUrls: ['./our-gallery.component.css']
})
export class OurGalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryItems = this.galleryService.getAll();
  }
}