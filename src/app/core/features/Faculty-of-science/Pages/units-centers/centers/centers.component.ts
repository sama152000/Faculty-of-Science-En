/**
 * Centers Component
 * Displays centers data from the API
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { CentersService } from '../../../Services/real-services/centers/centers.service';
import {
  CenterDetailService,
  CenterDetail,
} from '../../../Services/real-services/centers/centerdetail.service';
import {
  CenterMemberService,
  CenterMember,
} from '../../../Services/real-services/centers/centermember.service';
import { Center } from '../../../model/centers.model';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    CardModule,
    ButtonModule,
    TagModule,
    AvatarModule,
  ],
  templateUrl: './centers.component.html',
  styleUrls: ['../units-centers.component.css'],
})
export class CentersComponent implements OnInit {
  private readonly centersService = inject(CentersService);
  private readonly centerDetailService = inject(CenterDetailService);
  private readonly centerMemberService = inject(CenterMemberService);

  // State signals
  centers = signal<Center[]>([]);
  selectedCenter = signal<Center | null>(null);
  centerDetails = signal<CenterDetail[]>([]);
  centerMembers = signal<CenterMember[]>([]);
  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);
  activeSection = signal('overview');

  // Computed signals
  hasData = computed(() => this.centers().length > 0);
  hasDetails = computed(() => this.centerDetails().length > 0);
  hasMembers = computed(() => this.centerMembers().length > 0);
  leader = computed(() => this.centerMembers().find((m) => m.isLeader));

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

  selectCenter(center: Center): void {
    this.selectedCenter.set(center);
    this.activeSection.set('overview');
    this.loadCenterDetails(center.id);
    this.loadCenterMembers(center.id);
  }

  loadCenterDetails(centerId: string): void {
    this.detailsLoading.set(true);
    this.centerDetailService.getByCenterId(centerId).subscribe({
      next: (details) => {
        this.centerDetails.set(details);
        this.detailsLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading center details:', err);
        this.detailsLoading.set(false);
      },
    });
  }

  loadCenterMembers(centerId: string): void {
    this.centerMemberService.getByCenterId(centerId).subscribe({
      next: (members) => {
        this.centerMembers.set(members);
      },
      error: (err) => {
        console.error('Error loading center members:', err);
      },
    });
  }

  closeDetails(): void {
    this.selectedCenter.set(null);
    this.centerDetails.set([]);
    this.centerMembers.set([]);
  }

  isCenterSelected(centerId: string): boolean {
    return this.selectedCenter()?.id === centerId;
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  isActiveSection(section: string): boolean {
    return this.activeSection() === section;
  }

  retry(): void {
    this.loadCenters();
  }

  getCenterImage(center: Center): string | null {
    if (center.centerAttachments && center.centerAttachments.length > 0) {
      return center.centerAttachments[0].url;
    }
    return null;
  }
}
