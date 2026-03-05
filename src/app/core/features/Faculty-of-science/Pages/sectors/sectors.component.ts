/**
 * Sectors Component
 * Displays faculty sectors list and navigates to sector detail pages
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

// Services
import { SectorsService } from '../../Services/real-services/sectors/sectors.service';

// Models
import { Sector } from '../../model/sector.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    AvatarModule,
    TagModule,
    CleanHtmlPipe,
  ],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
})
export class SectorsComponent implements OnInit {

  // Services
  private readonly sectorsService = inject(SectorsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // State
  sectors = signal<Sector[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed
  hasData = computed(() => this.sectors().length > 0);

  ngOnInit(): void {
    this.loadSectors();
  }

  loadSectors(): void {
    this.loading.set(true);
    this.error.set(null);

    this.sectorsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.sectors.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load sectors');
        this.loading.set(false);
        console.error('Error loading sectors:', err);
      },
    });
  }

  navigateToSector(sector: Sector): void {
    this.router.navigate([this.generateSlug(sector.slug)], {
      relativeTo: this.route,
    });
  }

  getSectorImage(sector: Sector): string | null {
    if (sector.sectorAttachments && sector.sectorAttachments.length > 0) {
      const featured = sector.sectorAttachments.find((a) => a.isFeatured);
      return featured ? featured.url : sector.sectorAttachments[0].url;
    }
    return null;
  }

  retry(): void {
    this.loadSectors();
  }

  private generateSlug(slug?: string | null): string {
    if (!slug) return '';
    return slug.toLowerCase().replace(/\s+/g, '-');
  }
}
