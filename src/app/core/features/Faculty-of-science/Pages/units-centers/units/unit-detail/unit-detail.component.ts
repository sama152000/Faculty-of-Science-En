/**
 * Unit Detail Component
 * Displays a single unit's full details based on slug from the route.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { UnitService, Unit } from '../../../../Services/real-services/units/unit.service';
import { UnitDetailService, UnitDetail } from '../../../../Services/real-services/units/unitdetail.service';
import { UnitMemberService, UnitMember } from '../../../../Services/real-services/units/unitmember.service';
import { CleanHtmlPipe } from '../../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-unit-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule, AvatarModule, CleanHtmlPipe],
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css'],
})
export class UnitDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly unitService = inject(UnitService);
  private readonly unitDetailService = inject(UnitDetailService);
  private readonly unitMemberService = inject(UnitMemberService);

  // State signals
  unit = signal<Unit | null>(null);
  unitDetails = signal<UnitDetail[]>([]);
  unitMembers = signal<UnitMember[]>([]);
  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);
  activeSection = signal('overview');

  // Computed
  hasDetails = computed(() => this.unitDetails().length > 0);
  hasMembers = computed(() => this.unitMembers().length > 0);
  leader = computed(() => this.unitMembers().find((m) => m.isLeader));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.activeSection.set('overview');
        this.loadUnitBySlug(decodeURIComponent(slug));
      } else {
        this.error.set('لم يتم تحديد الوحدة');
        this.loading.set(false);
      }
    });
  }

  private loadUnitBySlug(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.unitService.getAllUnits().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const found = response.data.find(
            (u) => this.sanitizeSlug(u.slug || u.unitTitle) === slug
          );
          if (found) {
            this.unit.set(found);
            this.loadUnitDetails(found.id);
            this.loadUnitMembers(found.id);
          } else {
            this.error.set('الوحدة غير موجودة');
          }
        } else {
          this.error.set('فشل في تحميل بيانات الوحدة');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل بيانات الوحدة');
        this.loading.set(false);
        console.error('Error loading unit:', err);
      },
    });
  }

  loadUnitDetails(unitId: string): void {
    this.detailsLoading.set(true);
    this.unitDetailService.getByUnitId(unitId).subscribe({
      next: (details) => {
        this.unitDetails.set(details);
        this.detailsLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading unit details:', err);
        this.detailsLoading.set(false);
      },
    });
  }

  loadUnitMembers(unitId: string): void {
    this.unitMemberService.getByUnitId(unitId).subscribe({
      next: (members) => {
        this.unitMembers.set(members);
      },
      error: (err) => {
        console.error('Error loading unit members:', err);
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

  getUnitImage(unit: Unit): string | null {
    if (unit.unitAttachments && unit.unitAttachments.length > 0) {
      return unit.unitAttachments[0].url;
    }
    return null;
  }

  goBack(): void {
    this.router.navigate(['/units-centers']);
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) this.loadUnitBySlug(decodeURIComponent(slug));
  }
}
