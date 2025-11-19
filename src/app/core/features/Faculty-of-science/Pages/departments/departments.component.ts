import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentsService } from '../../Services/departments.service';
import { Department } from '../../model/department.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: Department | null = null;
  loading = true;
  searchQuery = '';
  activeSection = 'overview';

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departments = this.departmentsService.getAll();
    this.loading = false;
  }

  selectDepartment(department: Department): void {
    this.selectedDepartment = department;
    this.activeSection = 'overview';
  }

  closeDetails(): void {
    this.selectedDepartment = null;
  }

  isDepartmentSelected(deptId: string): boolean {
    return this.selectedDepartment?.id === deptId;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }

  getDepartmentById(id: string): Department | undefined {
    return this.departmentsService.getById(id);
  }

  getTopDepartments(): Department[] {
    return this.departmentsService.getTopDepartments();
  }

  searchDepartments(query: string): Department[] {
    return this.departmentsService.searchDepartments(query);
  }

  onSearchChange(): void {
    if (this.searchQuery.trim()) {
      this.departments = this.searchDepartments(this.searchQuery);
    } else {
      this.loadDepartments();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.loadDepartments();
  }
}
