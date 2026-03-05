/**
 * Departments Component
 * Displays faculty departments as a grid of cards.
 * Clicking a card navigates to departments/:slug for detailed view.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

// Services
import {
  DepartmentsService,
  Department,
} from '../../Services/real-services/departments';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  // Services
  private readonly departmentsService = inject(DepartmentsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // State signals
  departments = signal<Department[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed signals
  hasData = computed(() => this.departments().length > 0);

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading.set(true);
    this.error.set(null);

    this.departmentsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.departments.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل الأقسام');
        this.loading.set(false);
        console.error('Error loading departments:', err);
      },
    });
  }

  navigateToDepartment(department: Department): void {
    this.router.navigate([this.sanitizeSlug(department.slug)], { relativeTo: this.route });
  }

  private sanitizeSlug(slug: string): string {
    return (slug || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  getDepartmentImage(department: Department): string | null {
    if (department.departmentAttachments && department.departmentAttachments.length > 0) {
      const featured = department.departmentAttachments.find((a) => a.isFeatured);
      return featured ? featured.url : department.departmentAttachments[0].url;
    }
    return null;
  }

  retry(): void {
    this.loadDepartments();
  }
}
