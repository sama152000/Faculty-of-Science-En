/**
 * Our Departments Component
 * Displays faculty departments on the home page using real API data
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import {
  DepartmentsService,
  Department,
} from '../../../Services/real-services/departments/departments.service';

@Component({
  selector: 'app-our-departments',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule],
  templateUrl: './our-departments.component.html',
  styleUrls: ['./our-departments.component.css'],
})
export class OurDepartmentsComponent implements OnInit {
  private readonly departmentsService = inject(DepartmentsService);

  // State signals
  departments = signal<Department[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed signals for splitting departments into columns
  leftColumnDepts = computed(() => {
    const depts = this.departments();
    const midpoint = Math.ceil(depts.length / 2);
    return depts.slice(0, midpoint);
  });

  rightColumnDepts = computed(() => {
    const depts = this.departments();
    const midpoint = Math.ceil(depts.length / 2);
    return depts.slice(midpoint);
  });

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
        this.error.set('Failed to load departments');
        this.loading.set(false);
        console.error('Error loading departments:', err);
      },
    });
  }

  getDepartmentImage(dept: Department): string | null {
    if (dept.departmentAttachments && dept.departmentAttachments.length > 0) {
      const featured = dept.departmentAttachments.find((a) => a.isFeatured);
      return featured ? featured.url : dept.departmentAttachments[0].url;
    }
    return null;
  }

  retry(): void {
    this.loadDepartments();
  }
}
