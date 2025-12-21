import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

// Base Component
import { BaseComponent } from '../../../../../shared/components/base.component';

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
} from '../../Services/real-services/departments';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent extends BaseComponent implements OnInit {
  // Services
  private readonly departmentsService = inject(DepartmentsService);
  private readonly departmentDetailsService = inject(DepartmentDetailsService);
  private readonly departmentMembersService = inject(DepartmentMembersService);
  private readonly departmentProgramsService = inject(
    DepartmentProgramsService
  );
  private readonly departmentServicesService = inject(
    DepartmentServicesService
  );

  // State Signals
  protected departments = signal<Department[]>([]);
  protected selectedDepartment = signal<Department | null>(null);
  protected departmentDetails = signal<DepartmentDetail[]>([]);
  protected departmentMembers = signal<DepartmentMember[]>([]);
  protected departmentPrograms = signal<DepartmentProgram[]>([]);
  protected departmentServices = signal<DeptService[]>([]);
  protected activeSection = signal<string>('overview');
  protected searchQuery = signal<string>('');

  // Computed: Get leader/head of department
  protected departmentHead = computed(() => {
    const members = this.departmentMembers();
    return members.find((m) => m.isLeader) || null;
  });

  // Computed: Get featured image from attachments
  protected featuredImage = computed(() => {
    const dept = this.selectedDepartment();
    if (!dept?.departmentAttachments?.length) return null;
    const featured = dept.departmentAttachments.find((a) => a.isFeatured);
    return featured?.url || dept.departmentAttachments[0]?.url || null;
  });

  // Computed: Filtered departments by search
  protected filteredDepartments = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const depts = this.departments();
    if (!query) return depts;
    return depts.filter(
      (d) =>
        d.name?.toLowerCase().includes(query) ||
        d.subTitle?.toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {
    this.loadDepartments();
  }

  /**
   * Load all departments
   */
  private loadDepartments(): void {
    this.setLoading();

    this.departmentsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.departments.set(response.data);
            // Select first department by default if available
            if (response.data.length > 0) {
              this.selectDepartment(response.data[0]);
            }
            this.setSuccess();
          } else {
            this.setError('No departments found');
          }
        },
        error: (error) => {
          this.handleError(error, 'Failed to load departments');
        },
      });
  }

  /**
   * Select a department and load its related data
   */
  selectDepartment(department: Department): void {
    this.selectedDepartment.set(department);
    this.activeSection.set('overview');
    this.loadDepartmentRelatedData(department.id);
  }

  /**
   * Load all related data for selected department
   */
  private loadDepartmentRelatedData(departmentId: string): void {
    forkJoin({
      details: this.departmentDetailsService.getAll(),
      members: this.departmentMembersService.getAll(),
      programs: this.departmentProgramsService.getAll(),
      services: this.departmentServicesService.getAll(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          // Filter data by departmentId
          if (response.details.success && response.details.data) {
            this.departmentDetails.set(
              response.details.data.filter(
                (d) => d.departmentId === departmentId
              )
            );
          }
          if (response.members.success && response.members.data) {
            this.departmentMembers.set(
              response.members.data.filter(
                (m) => m.departmentId === departmentId
              )
            );
          }
          if (response.programs.success && response.programs.data) {
            this.departmentPrograms.set(
              response.programs.data.filter(
                (p) => p.departmentId === departmentId
              )
            );
          }
          if (response.services.success && response.services.data) {
            this.departmentServices.set(
              response.services.data.filter(
                (s) => s.departmentId === departmentId
              )
            );
          }
        },
        error: (error) => {
          console.error('Failed to load department related data:', error);
        },
      });
  }

  /**
   * Close department details
   */
  closeDetails(): void {
    this.selectedDepartment.set(null);
  }

  /**
   * Check if department is selected
   */
  isDepartmentSelected(deptId: string): boolean {
    return this.selectedDepartment()?.id === deptId;
  }

  /**
   * Set active section
   */
  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  /**
   * Check if section is active
   */
  isActiveSection(section: string): boolean {
    return this.activeSection() === section;
  }

  /**
   * Handle search input change
   */
  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchQuery.set('');
  }

  /**
   * Retry loading
   */
  protected override retry(): void {
    this.loadDepartments();
  }
}
