import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsService } from '../../../Services/departments.service';
import { Department } from '../../../model/department.model';

@Component({
  selector: 'app-our-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-departments.component.html',
  styleUrls: ['./our-departments.component.css']
})
export class OurDepartmentsComponent implements OnInit {
  departments: Department[] = [];
  leftColumnDepts: Department[] = [];
  rightColumnDepts: Department[] = [];

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit() {
    this.departments = this.departmentsService.getAll();
    this.splitDepartments();
  }

  private splitDepartments() {
    const midpoint = Math.ceil(this.departments.length / 2);
    this.leftColumnDepts = this.departments.slice(0, midpoint);
    this.rightColumnDepts = this.departments.slice(midpoint);
  }
}