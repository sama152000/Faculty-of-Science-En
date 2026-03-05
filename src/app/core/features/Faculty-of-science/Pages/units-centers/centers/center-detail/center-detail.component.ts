/**
 * Center Detail Component
 * Displays a single center's full details based on slug from the route.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { CentersService } from '../../../../Services/real-services/centers/centers.service';
import { CenterDetailService, CenterDetail } from '../../../../Services/real-services/centers/centerdetail.service';
import { CenterMemberService, CenterMember } from '../../../../Services/real-services/centers/centermember.service';
import { Center } from '../../../../model/centers.model';
import { CleanHtmlPipe } from '../../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-center-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule, AvatarModule, TagModule, CleanHtmlPipe],
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.css'],
})
export class CenterDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly centersService = inject(CentersService);
  private readonly centerDetailService = inject(CenterDetailService);
  private readonly centerMemberService = inject(CenterMemberService);

  // State signals
  center = signal<Center | null>(null);
  centerDetails = signal<CenterDetail[]>([]);
  centerMembers = signal<CenterMember[]>([]);
  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);
  activeSection = signal('overview');

  // Computed
  hasDetails = computed(() => this.centerDetails().length > 0);
  hasMembers = computed(() => this.centerMembers().length > 0);
  leader = computed(() => this.centerMembers().find((m) => m.isLeader));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.activeSection.set('overview');
        this.loadCenterBySlug(decodeURIComponent(slug));
      } else {
        this.error.set('لم يتم تحديد المركز');
        this.loading.set(false);
      }
    });
  }

  private loadCenterBySlug(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.centersService.getAllCenters().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const found = response.data.find(
            (c) => this.sanitizeSlug(c.slug || c.centerName) === slug
          );
          if (found) {
            this.center.set(found);
            this.loadCenterDetails(found.id);
            this.loadCenterMembers(found.id);
          } else {
            this.error.set('المركز غير موجود');
          }
        } else {
          this.error.set('فشل في تحميل بيانات المركز');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل بيانات المركز');
        this.loading.set(false);
        console.error('Error loading center:', err);
      },
    });
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

  private sanitizeSlug(text: string): string {
    return (text || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  isActiveSection(section: string): boolean {
    return this.activeSection() === section;
  }

  getCenterImage(center: Center): string | null {
    if (center.centerAttachments && center.centerAttachments.length > 0) {
      return center.centerAttachments[0].url;
    }
    return null;
  }

  goBack(): void {
    this.router.navigate(['/units-centers']);
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) this.loadCenterBySlug(decodeURIComponent(slug));
  }
}
