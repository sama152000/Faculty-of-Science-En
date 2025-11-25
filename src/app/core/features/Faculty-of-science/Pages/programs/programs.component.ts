import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramsService } from '../../Services/programs.service';
import { Program } from '../../model/program.model';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  programs: Program[] = [];
  selectedProgram: Program | null = null;
  loading = true;
  activeSection = 'overview';

  constructor(private programsService: ProgramsService) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programs = this.programsService.getActivePrograms();
    this.loading = false;
  }

  selectProgram(program: Program): void {
    this.selectedProgram = program;
    this.activeSection = 'overview';
  }

  closeDetails(): void {
    this.selectedProgram = null;
  }

  isProgramSelected(programId: string): boolean {
    return this.selectedProgram?.id === programId;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }

  getLevelBadgeClass(level: string): string {
    switch (level) {
      case 'bachelor': return 'bg-primary';
      case 'master': return 'bg-success';
      case 'phd': return 'bg-danger';
      case 'diploma': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }

  getLevelDisplayName(level: string): string {
    switch (level) {
      case 'bachelor': return 'Bachelor\'s';
      case 'master': return 'Master\'s';
      case 'phd': return 'Ph.D.';
      case 'diploma': return 'Diploma';
      default: return level;
    }
  }
}