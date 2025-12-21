/**
 * Services Component
 * Displays faculty services using real API data
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

import {
  FacultyServicesService,
  FacultyService,
} from '../../Services/real-services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule, TagModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  private readonly servicesService = inject(FacultyServicesService);

  // State signals
  services = signal<FacultyService[]>([]);
  selectedService = signal<FacultyService | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed
  hasData = computed(() => this.services().length > 0);
  selectedServiceId = computed(() => this.selectedService()?.id || null);

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
        this.error.set('Failed to load services');
        this.loading.set(false);
        console.error('Error loading services:', err);
      },
    });
  }

  selectService(service: FacultyService): void {
    this.selectedService.set(service);
  }

  closeDetails(): void {
    this.selectedService.set(null);
  }

  isServiceSelected(serviceId: string): boolean {
    return this.selectedServiceId() === serviceId;
  }

  getServiceIcon(service: FacultyService): string {
    // If iconPath is a full URL or path, return it
    // Otherwise, use a default icon class
    if (service.iconPath && service.iconPath.startsWith('http')) {
      return service.iconPath;
    }
    return service.iconPath || 'fas fa-cog';
  }

  retry(): void {
    this.loadServices();
  }
}
