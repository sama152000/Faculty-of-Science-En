/**
 * Sector Detail Component
 * Displays a single sector's full details based on slug from the route.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

// Services
import { SectorsService } from '../../../Services/real-services/sectors/sectors.service';
import { SectorDetailsService } from '../../../Services/real-services/sectors/sector-details.service';
import { SectorMembersService } from '../../../Services/real-services/sectors/sector-members.service';
import { SectorServicesService } from '../../../Services/real-services/sectors/sector-services.service';
import { SectorProgramsService } from '../../../Services/real-services/sectors/sector-programs.service';
import { SectorUnitsService } from '../../../Services/real-services/sectors/sector-units.service';
import { SectorPostsService } from '../../../Services/real-services/sectors/sector-posts.service';

// Models
import {
  Sector,
  SectorDetail,
  SectorMember,
  SectorService as SectorServiceModel,
  SectorProgram,
  SectorUnit,
  SectorPost,
} from '../../../model/sector.model';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-sector-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    AvatarModule,
    TagModule,
    CleanHtmlPipe,
  ],
  templateUrl: './sector-detail.component.html',
  styleUrls: ['./sector-detail.component.css'],
})
export class SectorDetailComponent implements OnInit {
  // Services
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sectorsService = inject(SectorsService);
  private readonly sectorDetailsService = inject(SectorDetailsService);
  private readonly sectorMembersService = inject(SectorMembersService);
  private readonly sectorServicesService = inject(SectorServicesService);
  private readonly sectorProgramsService = inject(SectorProgramsService);
  private readonly sectorUnitsService = inject(SectorUnitsService);
  private readonly sectorPostsService = inject(SectorPostsService);

  // State signals
  sector = signal<Sector | null>(null);
  sectorDetails = signal<SectorDetail[]>([]);
  sectorMembers = signal<SectorMember[]>([]);
  sectorServices = signal<SectorServiceModel[]>([]);
  sectorPrograms = signal<SectorProgram[]>([]);
  sectorUnits = signal<SectorUnit[]>([]);
  sectorPosts = signal<SectorPost[]>([]);

  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);
  activeSection = signal('overview');

  // Computed signals
  hasDetails = computed(() => this.sectorDetails().length > 0);
  hasMembers = computed(() => this.sectorMembers().length > 0);
  hasServices = computed(() => this.sectorServices().length > 0);
  hasPrograms = computed(() => this.sectorPrograms().length > 0);
  hasUnits = computed(() => this.sectorUnits().length > 0);
  hasPosts = computed(() => this.sectorPosts().length > 0);
  leader = computed(() => this.sectorMembers().find((m) => m.isLeader));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.activeSection.set('overview');
        this.loadSectorBySlug(decodeURIComponent(slug));
      } else {
        this.error.set('Sector not specified');
        this.loading.set(false);
      }
    });
  }

  private loadSectorBySlug(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.sectorsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const found = response.data.find(
            (s) => this.generateSlug(s.slug) === slug
          );

          if (found) {
            this.sector.set(found);
            this.loadAllSectorData(found.id);
          } else {
            this.error.set('Sector not found');
          }
        } else {
          this.error.set('Failed to load sector data');
        }

        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load sector data');
        this.loading.set(false);
        console.error('Error loading sector:', err);
      },
    });
  }

  generateSlug(name: string): string {
    return name
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\u0600-\u06FFa-zA-Z0-9\-]/g, '')
      .toLowerCase();
  }

  loadAllSectorData(sectorId: string): void {
    this.detailsLoading.set(true);
    this.loadSectorDetails(sectorId);
    this.loadSectorMembers(sectorId);
    this.loadSectorServices(sectorId);
    this.loadSectorPrograms(sectorId);
    this.loadSectorUnits(sectorId);
    this.loadSectorPosts(sectorId);
  }

  loadSectorDetails(sectorId: string): void {
    this.sectorDetailsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((d) => d.sectorId === sectorId);
          this.sectorDetails.set(filtered);
        }
        this.detailsLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading sector details:', err);
        this.detailsLoading.set(false);
      },
    });
  }

  loadSectorMembers(sectorId: string): void {
    this.sectorMembersService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((m) => m.sectorId === sectorId);
          this.sectorMembers.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading sector members:', err);
      },
    });
  }

  loadSectorServices(sectorId: string): void {
    this.sectorServicesService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((s) => s.sectorId === sectorId);
          this.sectorServices.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading sector services:', err);
      },
    });
  }

  loadSectorPrograms(sectorId: string): void {
    this.sectorProgramsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((p) => p.sectorId === sectorId);
          this.sectorPrograms.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading sector programs:', err);
      },
    });
  }

  loadSectorUnits(sectorId: string): void {
    this.sectorUnitsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((u) => u.sectorId === sectorId);
          this.sectorUnits.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading sector units:', err);
      },
    });
  }

  loadSectorPosts(sectorId: string): void {
    this.sectorPostsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((p) => p.sectorId === sectorId);
          this.sectorPosts.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading sector posts:', err);
      },
    });
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  isActiveSection(section: string): boolean {
    return this.activeSection() === section;
  }

  getSectorImage(sector: Sector): string | null {
    if (sector.sectorAttachments && sector.sectorAttachments.length > 0) {
      const featured = sector.sectorAttachments.find((a) => a.isFeatured);
      return featured ? featured.url : sector.sectorAttachments[0].url;
    }
    return null;
  }

  goBack(): void {
    this.router.navigate(['/sectors']);
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadSectorBySlug(decodeURIComponent(slug));
    }
  }
}
