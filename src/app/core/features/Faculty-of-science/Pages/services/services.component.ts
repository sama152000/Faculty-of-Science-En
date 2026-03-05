/**
 * Services Component
 * Displays faculty services as a grid of cards.
 * Clicking a card navigates to services/:slug for detailed view.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

import {
  FacultyServicesService,
  FacultyService,
} from '../../Services/real-services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  private readonly servicesService = inject(FacultyServicesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // State signals
  services = signal<FacultyService[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed
  hasData = computed(() => this.services().length > 0);

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading.set(true);
    this.error.set(null);

    this.servicesService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.services.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل الخدمات');
        this.loading.set(false);
        console.error('Error loading services:', err);
      },
    });
  }

  navigateToService(service: FacultyService): void {
    const slug = this.sanitizeSlug(service.slug || service.title);
    console.log('Navigating to service:', slug, 'from slug:', service.slug, 'title:', service.title);
    this.router.navigate([slug], { relativeTo: this.route });
  }

  sanitizeSlug(text: string): string {
    return (text || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  getServiceIcon(service: FacultyService): string {
    if (service.iconPath && service.iconPath.startsWith('http')) {
      return service.iconPath;
    }
    return service.iconPath || 'fas fa-cog';
  }

  retry(): void {
    this.loadServices();
  }
}
