/**
 * Programs Component
 * Main container for academic programs using real API services
 * Uses ProgramListComponent and ProgramDetailComponent as child components
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

// Child Components
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';

// Services
import { ProgramsService } from '../../Services/real-services/programs/programs.service';
import { ProgramDetailsService } from '../../Services/real-services/programs/program-details.service';
import { ProgramMembersService } from '../../Services/real-services/programs/program-members.service';

// Models
import {
  Program,
  ProgramDetail,
  ProgramMember,
} from '../../model/program.model';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    ProgramListComponent,
    ProgramDetailComponent,
  ],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  // Services
  private readonly programsService = inject(ProgramsService);
  private readonly programDetailsService = inject(ProgramDetailsService);
  private readonly programMembersService = inject(ProgramMembersService);

  // State signals
  programs = signal<Program[]>([]);
  selectedProgram = signal<Program | null>(null);
  programDetails = signal<ProgramDetail[]>([]);
  programMembers = signal<ProgramMember[]>([]);

  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);

  // Computed signals
  hasData = computed(() => this.programs().length > 0);
  selectedProgramId = computed(() => this.selectedProgram()?.id || null);

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.loading.set(true);
    this.error.set(null);

    this.programsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.programs.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load programs');
        this.loading.set(false);
        console.error('Error loading programs:', err);
      },
    });
  }

  onProgramSelected(program: Program): void {
    this.selectedProgram.set(program);
    this.loadProgramDetails(program.id);
    this.loadProgramMembers(program.id);
  }

  loadProgramDetails(programId: string): void {
    this.detailsLoading.set(true);
    this.programDetailsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter(
            (d) => d.programId === programId
          );
          this.programDetails.set(filtered);
        }
        this.detailsLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading program details:', err);
        this.detailsLoading.set(false);
      },
    });
  }

  loadProgramMembers(programId: string): void {
    this.programMembersService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter(
            (m) => m.programId === programId
          );
          this.programMembers.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading program members:', err);
      },
    });
  }

  retry(): void {
    this.loadPrograms();
  }
}
