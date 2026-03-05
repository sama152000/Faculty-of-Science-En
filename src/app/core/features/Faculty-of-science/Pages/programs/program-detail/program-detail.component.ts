/**
 * Program Detail Component
 * Displays a single program's full details based on slug from the route.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

// Services
import { ProgramsService } from '../../../Services/real-services/programs/programs.service';
import { ProgramDetailsService } from '../../../Services/real-services/programs/program-details.service';
import { ProgramMembersService } from '../../../Services/real-services/programs/program-members.service';

// Models
import {
  Program,
  ProgramDetail,
  ProgramMember,
} from '../../../model/program.model';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-program-detail',
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    AvatarModule,
    TagModule,
    CleanHtmlPipe,
  ],
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css'],
})
export class ProgramDetailComponent implements OnInit {
  // Services
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly programsService = inject(ProgramsService);
  private readonly programDetailsService = inject(ProgramDetailsService);
  private readonly programMembersService = inject(ProgramMembersService);

  // State signals
  program = signal<Program | null>(null);
  programDetails = signal<ProgramDetail[]>([]);
  programMembers = signal<ProgramMember[]>([]);

  loading = signal(true);
  detailsLoading = signal(false);
  error = signal<string | null>(null);
  activeSection = signal('overview');

  // Computed signals
  hasDetails = computed(() => this.programDetails().length > 0);
  hasMembers = computed(() => this.programMembers().length > 0);
  hasGoals = computed(() => {
    const p = this.program();
    return p?.goals && p.goals.length > 0;
  });
  leader = computed(() => this.programMembers().find((m) => m.isLeader));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.activeSection.set('overview');
        this.loadProgramBySlug(decodeURIComponent(slug));
      } else {
        this.error.set('لم يتم تحديد البرنامج');
        this.loading.set(false);
      }
    });
  }

  private loadProgramBySlug(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.programsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const found = response.data.find(
            (p) => this.sanitizeSlug(p.slug) === slug
          );
          if (found) {
            this.program.set(found);
            this.loadAllProgramData(found.id);
          } else {
            this.error.set('البرنامج غير موجود');
          }
        } else {
          this.error.set('فشل في تحميل بيانات البرنامج');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل بيانات البرنامج');
        this.loading.set(false);
        console.error('Error loading program:', err);
      },
    });
  }

  loadAllProgramData(programId: string): void {
    this.detailsLoading.set(true);
    this.loadProgramDetails(programId);
    this.loadProgramMembers(programId);
  }

  loadProgramDetails(programId: string): void {
    this.programDetailsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const filtered = response.data.filter((d) => d.programId === programId);
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
          const filtered = response.data.filter((m) => m.programId === programId);
          this.programMembers.set(filtered);
        }
      },
      error: (err) => {
        console.error('Error loading program members:', err);
      },
    });
  }

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

  private sanitizeSlug(slug: string): string {
    return (slug || '').trim().replace(/\s+/g, '-').toLowerCase();
  }

  goBack(): void {
    this.router.navigate(['/programs']);
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadProgramBySlug(decodeURIComponent(slug));
    }
  }
}
