/**
 * Program List Component
 * Displays the list of academic programs in the sidebar
 */
import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { Program } from '../../../model/program.model';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  template: `
    <div class="programs-sidebar card-custom">
      <h4 class="sidebar-title">
        <i class="fas fa-graduation-cap me-2"></i>
        Study Programs
      </h4>

      <!-- Loading State -->
      @if (loading()) {
      <div class="loading-list">
        @for (i of [1, 2, 3, 4]; track i) {
        <p-skeleton height="5rem" styleClass="mb-2" />
        }
      </div>
      }

      <!-- Programs List -->
      @if (!loading()) {
      <ul class="programs-list">
        @for (program of programs(); track program.id) {
        <li>
          <button
            class="program-btn"
            [class.active]="isSelected(program.id)"
            (click)="onSelectProgram(program)"
          >
            <div class="program-icon">
              @if (getProgramImage(program)) {
              <img
                [src]="getProgramImage(program)"
                [alt]="program.pageTitle"
                class="program-thumb"
              />
              } @else {
              <i class="fas fa-graduation-cap"></i>
              }
            </div>
            <div class="program-info">
              <h6 class="program-name">{{ program.pageTitle }}</h6>
              @if (getShortDescription(program)) {
              <p class="program-desc">{{ getShortDescription(program) }}</p>
              }
            </div>
          </button>
        </li>
        }
      </ul>
      }

      <!-- Empty State -->
      @if (!loading() && programs().length === 0) {
      <div class="text-center py-4 text-muted">
        <i class="fas fa-graduation-cap fa-2x mb-2"></i>
        <p>No programs available</p>
      </div>
      }
    </div>
  `,
  styleUrls: ['../programs.component.css'],
})
export class ProgramListComponent {
  // Using input() function for signal-based inputs
  programs = input<Program[]>([]);
  loading = input<boolean>(false);
  selectedProgramId = input<string | null>(null);

  @Output() programSelected = new EventEmitter<Program>();

  isSelected(programId: string): boolean {
    return this.selectedProgramId() === programId;
  }

  onSelectProgram(program: Program): void {
    this.programSelected.emit(program);
  }

  getProgramImage(program: Program): string | null {
    if (program.programAttachments && program.programAttachments.length > 0) {
      return program.programAttachments[0].url;
    }
    return null;
  }

  getShortDescription(program: Program): string {
    if (program.about) {
      // Strip HTML tags and limit to 80 characters
      const text = program.about.replace(/<[^>]*>/g, '');
      return text.length > 80 ? text.substring(0, 80) + '...' : text;
    }
    return '';
  }
}
