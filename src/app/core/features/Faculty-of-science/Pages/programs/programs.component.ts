/**
 * Programs Component
 * Displays academic programs as a grid of cards.
 * Clicking a card navigates to programs/:slug for detailed view.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

// Services
import { ProgramsService } from '../../Services/real-services/programs/programs.service';

// Models
import { Program } from '../../model/program.model';

@Component({
  selector: 'app-programs',
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
  ],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  // Services
  private readonly programsService = inject(ProgramsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // State signals
  programs = signal<Program[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed signals
  hasData = computed(() => this.programs().length > 0);

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
        console.error('Error loading programs:', err);
      },
    });
  }

  navigateToProgram(program: Program): void {
    this.router.navigate([this.sanitizeSlug(program.slug)], { relativeTo: this.route });
  }

  private sanitizeSlug(slug: string): string {
    return (slug || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  getProgramImage(program: Program): string | null {
    if (program.programAttachments && program.programAttachments.length > 0) {
      return program.programAttachments[0].url;
    }
    return null;
  }

  retry(): void {
    this.loadPrograms();
  }
}
