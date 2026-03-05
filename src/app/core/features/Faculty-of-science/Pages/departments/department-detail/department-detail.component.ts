/**
 * Department Detail Component
 * Displays a single department's full details based on slug from the route.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

// Services
import {
  DepartmentsService,
  Department,
  DepartmentDetailsService,
  DepartmentDetail,
  DepartmentMembersService,
  DepartmentMember,
  DepartmentProgramsService,
  DepartmentProgram,
  DepartmentServicesService,
  DepartmentService as DeptService,
} from '../../../Services/real-services/departments';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    AvatarModule,
    TagModule,
    CleanHtmlPipe,
  ],
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
})
export class DepartmentDetailComponent implements OnInit {
  // Services
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly departmentsService = inject(DepartmentsService);
  private readonly departmentDetailsService = inject(DepartmentDetailsService);
  private readonly departmentMembersService = inject(DepartmentMembersService);
  private readonly departmentProgramsService = inject(DepartmentProgramsService);
  private readonly departmentServicesService = inject(DepartmentServicesService);

  // State signals
  department = signal<Department | null>(null);
  departmentDetails = signal<DepartmentDetail[]>([]);
  departmentMembers = signal<DepartmentMember[]>([]);
  departmentPrograms = signal<DepartmentProgram[]>([]);
  departmentServices = signal<DeptService[]>([]);

  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);
  activeSection = signal('overview');

  // Computed signals
  hasDetails = computed(() => this.departmentDetails().length > 0);
  hasMembers = computed(() => this.departmentMembers().length > 0);
  hasPrograms = computed(() => this.departmentPrograms().length > 0);
  hasServices = computed(() => this.departmentServices().length > 0);
  leader = computed(() => this.departmentMembers().find((m) => m.isLeader));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.activeSection.set('overview');
        this.loadDepartmentBySlug(decodeURIComponent(slug));
      } else {
        this.error.set('لم يتم تحديد القسم');
        this.loading.set(false);
      }
    });
  }

  private loadDepartmentBySlug(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.departmentsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const found = response.data.find(
            (d) => this.sanitizeSlug(d.slug) === slug
          );
          if (found) {
            this.department.set(found);
            this.loadAllDepartmentData(found.id);
          } else {
            this.error.set('القسم غير موجود');
          }
        } else {
          this.error.set('فشل في تحميل بيانات القسم');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل بيانات القسم');
        this.loading.set(false);
        console.error('Error loading department:', err);
      },
    });
  }

  loadAllDepartmentData(departmentId: string): void {
    this.detailsLoading.set(true);
    this.loadDepartmentDetails(departmentId);
    this.loadDepartmentMembers(departmentId);
    this.loadDepartmentPrograms(departmentId);
    this.loadDepartmentServices(departmentId);
  }

  loadDepartmentDetails(departmentId: string): void {
    this.departmentDetailsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((d) => d.departmentId === departmentId);
          this.departmentDetails.set(filtered);
        }
        this.detailsLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading department details:', err);
        this.detailsLoading.set(false);
      },
    });
  }

  loadDepartmentMembers(departmentId: string): void {
    this.departmentMembersService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((m) => m.departmentId === departmentId);
          this.departmentMembers.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading department members:', err);
      },
    });
  }

  loadDepartmentPrograms(departmentId: string): void {
    this.departmentProgramsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((p) => p.departmentId === departmentId);
          this.departmentPrograms.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading department programs:', err);
      },
    });
  }

  loadDepartmentServices(departmentId: string): void {
    this.departmentServicesService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((s) => s.departmentId === departmentId);
          this.departmentServices.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading department services:', err);
      },
    });
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  isActiveSection(section: string): boolean {
    return this.activeSection() === section;
  }

  getDepartmentImage(department: Department): string | null {
    if (department.departmentAttachments && department.departmentAttachments.length > 0) {
      const featured = department.departmentAttachments.find((a) => a.isFeatured);
      return featured ? featured.url : department.departmentAttachments[0].url;
    }
    return null;
  }

  private sanitizeSlug(slug: string): string {
    return (slug || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  goBack(): void {
    this.router.navigate(['/departments']);
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadDepartmentBySlug(decodeURIComponent(slug));
    }
  }
}
