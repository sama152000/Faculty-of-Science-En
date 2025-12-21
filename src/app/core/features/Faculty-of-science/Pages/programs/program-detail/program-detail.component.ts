/**
 * Program Detail Component
 * Displays the detailed view of a selected program
 */
import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import {
  Program,
  ProgramDetail,
  ProgramMember,
} from '../../../model/program.model';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [CommonModule, SkeletonModule, AvatarModule, TagModule],
  templateUrl: './program-detail.component.html',
  styleUrls: ['../programs.component.css'],
})
export class ProgramDetailComponent {
  // Using input() function for signal-based inputs
  program = input<Program | null>(null);
  programDetails = input<ProgramDetail[]>([]);
  programMembers = input<ProgramMember[]>([]);
  detailsLoading = input<boolean>(false);

  activeSection = signal('overview');

  // Computed
  hasDetails = computed(() => this.programDetails().length > 0);
  hasMembers = computed(() => this.programMembers().length > 0);
  hasGoals = computed(() => {
    const p = this.program();
    return p?.goals && p.goals.length > 0;
  });
  leader = computed(() => this.programMembers().find((m) => m.isLeader));

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  isActiveSection(section: string): boolean {
    return this.activeSection() === section;
  }

  getProgramImage(): string | null {
    const p = this.program();
    if (p?.programAttachments && p.programAttachments.length > 0) {
      return p.programAttachments[0].url;
    }
    return null;
  }
}
