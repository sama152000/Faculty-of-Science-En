/**
 * Service Detail Component
 * Displays a single service's full details based on slug from the route.
 */
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

import {
  FacultyServicesService,
  FacultyService,
} from '../../../Services/real-services/services.service';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    TagModule,
    CleanHtmlPipe,
  ],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css'],
})
export class ServiceDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly servicesService = inject(FacultyServicesService);

  // State signals
  service = signal<FacultyService | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadServiceBySlug(decodeURIComponent(slug));
      } else {
        this.error.set('لم يتم تحديد الخدمة');
        this.loading.set(false);
      }
    });
  }

  private loadServiceBySlug(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.servicesService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          console.log('Looking for slug:', slug, 'in services:', response.data.map(s => ({ slug: s.slug, title: s.title })));
          const found = response.data.find(
            (s) => this.sanitizeSlug(s.slug || s.title) === slug
          );
          if (found) {
            this.service.set(found);
          } else {
            this.error.set('الخدمة غير موجودة');
          }
        } else {
          this.error.set('فشل في تحميل بيانات الخدمة');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل بيانات الخدمة');
        this.loading.set(false);
        console.error('Error loading service:', err);
      },
    });
  }

  private sanitizeSlug(text: string): string {
    return (text || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  getServiceIcon(service: FacultyService): string {
    if (service.iconPath) {
      return service.iconPath;
    }
    return service.iconPath || 'fas fa-cog';
  }

  goBack(): void {
    this.router.navigate(['/services']);
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadServiceBySlug(decodeURIComponent(slug));
    }
  }
}
