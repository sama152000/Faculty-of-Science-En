/**
 * Sectors Component
 * Displays faculty sectors with full details using ALL real API services
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

// Services
import { SectorsService } from '../../Services/real-services/sectors/sectors.service';
import { SectorDetailsService } from '../../Services/real-services/sectors/sector-details.service';
import { SectorMembersService } from '../../Services/real-services/sectors/sector-members.service';
import { SectorServicesService } from '../../Services/real-services/sectors/sector-services.service';
import { SectorProgramsService } from '../../Services/real-services/sectors/sector-programs.service';
import { SectorUnitsService } from '../../Services/real-services/sectors/sector-units.service';
import { SectorPostsService } from '../../Services/real-services/sectors/sector-posts.service';

// Models
import {
  Sector,
  SectorDetail,
  SectorMember,
  SectorService as SectorServiceModel,
  SectorProgram,
  SectorUnit,
  SectorPost,
} from '../../model/sector.model';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    AvatarModule,
    TagModule,
  ],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
})
export class SectorsComponent implements OnInit {
  // Services
  private readonly sectorsService = inject(SectorsService);
  private readonly sectorDetailsService = inject(SectorDetailsService);
  private readonly sectorMembersService = inject(SectorMembersService);
  private readonly sectorServicesService = inject(SectorServicesService);
  private readonly sectorProgramsService = inject(SectorProgramsService);
  private readonly sectorUnitsService = inject(SectorUnitsService);
  private readonly sectorPostsService = inject(SectorPostsService);

  // State signals
  sectors = signal<Sector[]>([]);
  selectedSector = signal<Sector | null>(null);
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
  hasData = computed(() => this.sectors().length > 0);
  hasDetails = computed(() => this.sectorDetails().length > 0);
  hasMembers = computed(() => this.sectorMembers().length > 0);
  hasServices = computed(() => this.sectorServices().length > 0);
  hasPrograms = computed(() => this.sectorPrograms().length > 0);
  hasUnits = computed(() => this.sectorUnits().length > 0);
  hasPosts = computed(() => this.sectorPosts().length > 0);
  leader = computed(() => this.sectorMembers().find((m) => m.isLeader));

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

  selectSector(sector: Sector): void {
    this.selectedSector.set(sector);
    this.activeSection.set('overview');
    this.loadAllSectorData(sector.id);
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

  closeDetails(): void {
    this.selectedSector.set(null);
    this.sectorDetails.set([]);
    this.sectorMembers.set([]);
    this.sectorServices.set([]);
    this.sectorPrograms.set([]);
    this.sectorUnits.set([]);
    this.sectorPosts.set([]);
  }

  isSectorSelected(sectorId: string): boolean {
    return this.selectedSector()?.id === sectorId;
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

  retry(): void {
    this.loadSectors();
  }
}
