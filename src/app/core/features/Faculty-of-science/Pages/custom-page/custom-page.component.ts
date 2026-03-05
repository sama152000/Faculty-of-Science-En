/**
 * Custom Page Component
 * Displays a custom page loaded by slug from the route.
 * Handles attachments: displays images inline and PDFs as download/view links.
 */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import {
  CustomPagesService,
  CustomPage,
  PageAttachment
} from '../../Services/real-services/custom-pages.service';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-custom-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule, CleanHtmlPipe],
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
})
export class CustomPageComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly customPagesService = inject(CustomPagesService);

  // State signals
  page = signal<CustomPage | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed
  imageAttachments = computed(() =>
    (this.page()?.pageAttachments || []).filter((a) => this.isImage(a))
  );

  pdfAttachments = computed(() =>
    (this.page()?.pageAttachments || []).filter((a) => this.isPdf(a))
  );

  otherAttachments = computed(() =>
    (this.page()?.pageAttachments || []).filter(
      (a) => !this.isImage(a) && !this.isPdf(a)
    )
  );

  hasAttachments = computed(
    () => (this.page()?.pageAttachments || []).length > 0
  );

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      if (slug) {
        this.loadPageBySlug(decodeURIComponent(slug));
      } else {
        this.error.set('Page not specified');
        this.loading.set(false);
      }
    });
  }

  private loadPageBySlug(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.customPagesService.getBySlug(slug).subscribe({
      next: (page) => {
        if (page) {
          this.page.set(page);
        } else {
          // Try matching by pageId or partial slug
          this.loadAllAndMatch(slug);
          return;
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load page');
        this.loading.set(false);
        console.error('Error loading custom page:', err);
      },
    });
  }

  private loadAllAndMatch(slug: string): void {
    this.customPagesService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {

          const found = response.data.find(
            (p) =>
              this.sanitizeSlug(p.slug) === this.sanitizeSlug(slug) ||
              p.pageId === slug
          );

          if (found) {
            this.page.set(found);
          } else {
            this.error.set('Page not found');
          }

        } else {
          this.error.set('Failed to load page');
        }

        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load page');
        this.loading.set(false);
      },
    });
  }

  private sanitizeSlug(text: string): string {
    return (text || '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  isImage(attachment: PageAttachment): boolean {
    const ext = this.getFileExtension(attachment.fileName || attachment.url);
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
  }

  isPdf(attachment: PageAttachment): boolean {
    const ext = this.getFileExtension(attachment.fileName || attachment.url);
    return ext === 'pdf';
  }

  getFileExtension(filename: string): string {
    return (filename || '').split('.').pop()?.toLowerCase() || '';
  }

  getFileName(attachment: PageAttachment): string {
    return (
      attachment.fileName ||
      attachment.url?.split('/').pop() ||
      'File'
    );
  }

  getFileIcon(attachment: PageAttachment): string {

    if (this.isPdf(attachment)) return 'fas fa-file-pdf';

    const ext = this.getFileExtension(attachment.fileName || attachment.url);

    if (['doc', 'docx'].includes(ext)) return 'fas fa-file-word';
    if (['xls', 'xlsx'].includes(ext)) return 'fas fa-file-excel';
    if (['ppt', 'pptx'].includes(ext)) return 'fas fa-file-powerpoint';

    return 'fas fa-file';
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) this.loadPageBySlug(decodeURIComponent(slug));
  }

}
