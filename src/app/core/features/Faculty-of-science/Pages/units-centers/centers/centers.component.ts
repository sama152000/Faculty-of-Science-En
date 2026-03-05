/**
 * Centers Component
 * Displays centers as a grid of cards.
 * Clicking a card navigates to units-centers/centers/:slug for detailed view.
 */
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { CentersService } from '../../../Services/real-services/centers/centers.service';
import { Center } from '../../../model/centers.model';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule
  ],
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css'],
})
export class CentersComponent implements OnInit {

  private readonly centersService = inject(CentersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Input from parent
  categorySlug = input<string>('centers');

  // State signals
  centers = signal<Center[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed
  hasData = computed(() => this.centers().length > 0);

  ngOnInit(): void {
    this.loadCenters();
  }

  loadCenters(): void {
    this.loading.set(true);
    this.error.set(null);

    this.centersService.getAllCenters().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.centers.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load centers');
        this.loading.set(false);
        console.error('Error loading centers:', err);
      },
    });
  }

  navigateToCenter(center: Center): void {
    const slug = this.sanitizeSlug(center.slug || center.centerName);
    this.router.navigate([this.categorySlug(), slug], {
      relativeTo: this.route
    });
  }

  sanitizeSlug(text: string): string {
    return (text || '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  getCenterImage(center: Center): string | null {
    if (center.centerAttachments && center.centerAttachments.length > 0) {
      return center.centerAttachments[0].url;
    }
    return null;
  }

  retry(): void {
    this.loadCenters();
  }
}
