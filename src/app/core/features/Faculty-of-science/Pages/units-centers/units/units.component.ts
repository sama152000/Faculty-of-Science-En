/**
 * Units Component
 * Displays units as a grid of cards.
 * Clicking a card navigates to units-centers/units/:slug for detailed view.
 */
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { UnitService, Unit } from '../../../Services/real-services/units/unit.service';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
})
export class UnitsComponent implements OnInit {
  private readonly unitService = inject(UnitService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Input from parent
  categorySlug = input<string>('units');

  // State signals
  units = signal<Unit[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed
  hasData = computed(() => this.units().length > 0);

  ngOnInit(): void {
    this.loadUnits();
  }

  loadUnits(): void {
    this.loading.set(true);
    this.error.set(null);

    this.unitService.getAllUnits().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.units.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل الوحدات');
        this.loading.set(false);
        console.error('Error loading units:', err);
      },
    });
  }

  navigateToUnit(unit: Unit): void {
    const slug = this.sanitizeSlug(unit.slug || unit.unitTitle);
    this.router.navigate([this.categorySlug(), slug], { relativeTo: this.route });
  }

  sanitizeSlug(text: string): string {
    return (text || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  getUnitImage(unit: Unit): string | null {
    if (unit.unitAttachments && unit.unitAttachments.length > 0) {
      return unit.unitAttachments[0].url;
    }
    return null;
  }

  retry(): void {
    this.loadUnits();
  }
}
