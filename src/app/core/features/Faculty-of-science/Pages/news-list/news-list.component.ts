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

// PrimeNG Modules
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

// Base Component
import { BaseComponent } from '../../../../../shared/components/base.component';

// Services & Models
import { NewsService } from '../../Services/real-services/news.service';
import { News, Category } from '../../model/news.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe';
import { PageRequest } from '../../model/real model/page-request.model';

// Constants
const DEFAULT_PAGE_SIZE = 6;
const MAX_VISIBLE_TAGS = 3;

@Component({
  selector: 'app-news-list',
  imports: [
    CommonModule,
    RouterModule,
    SkeletonModule,
    TagModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
    CleanHtmlPipe,
  ],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent extends BaseComponent implements OnInit {
  // ============================================
  // DEPENDENCY INJECTION
  // ============================================
  private readonly newsService = inject(NewsService);

  // ============================================
  // STATE SIGNALS
  // ============================================

  /** Current page news items (from server) */
  protected readonly newsItems = signal<News[]>([]);

  /** Available categories */
  protected readonly categories = signal<Category[]>([]);

  /** Currently selected category ID */
  protected readonly selectedCategory = signal<string>('all');

  /** Current page number (1-based, matches API) */
  protected readonly currentPage = signal<number>(1);

  /** Items per page */
  protected readonly pageSize = signal<number>(DEFAULT_PAGE_SIZE);

  /** Total records count (from server) */
  protected readonly totalRecords = signal<number>(0);

  // ============================================
  // COMPUTED SIGNALS
  // ============================================

  /** PrimeNG Paginator first index (0-based) */
  protected readonly first = computed<number>(
    () => (this.currentPage() - 1) * this.pageSize(),
  );

  /** Whether there are news items to display */
  protected readonly hasNews = computed<boolean>(
    () => this.newsItems().length > 0,
  );

  /** Whether to show the paginator */
  protected readonly showPagination = computed<boolean>(
    () => this.totalRecords() > this.pageSize(),
  );

  /** Display name for selected category */
  protected readonly selectedCategoryName = computed<string>(() => {
    const categoryId = this.selectedCategory();
    if (categoryId === 'all') return 'News & Events';
    const category = this.categories().find((c) => c.id === categoryId);
    return category?.name ?? 'News & Events';
  });

  /** Display text for results count */
  protected readonly resultsText = computed<string>(() => {
    const start = this.first() + 1;
    const end = Math.min(
      this.first() + this.newsItems().length,
      this.totalRecords(),
    );
    const total = this.totalRecords();
    return `Showing ${start} to ${end} of ${total} news`;
  });

  // ============================================
  // LIFECYCLE
  // ============================================

  ngOnInit(): void {
    this.loadCategories();
    this.loadNews();
  }

  // ============================================
  // PRIVATE METHODS — DATA LOADING
  // ============================================

  /**
   * Load news from server using paginated endpoint.
   * Called on init, page change, and category change.
   */
  private loadNews(): void {
    this.setLoading();

    const request = this.buildPageRequest();

    this.newsService
      .getPaged(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.newsItems.set(response.data ?? []);
            this.totalRecords.set(response.totalCount ?? 0);
            this.setSuccess();
          }
        },
        error: (error: Error) => {
          this.handleError(error, 'Failed to load news');
        },
      });
  }

  /**
   * Build the PageRequest object from current state.
   */
  private buildPageRequest(): PageRequest {
    const filter: Record<string, any> = {
      isDeleted: false,
    };

    // Add category filter when a specific category is selected
    if (this.selectedCategory() !== 'all') {
      filter['categoryId'] = this.selectedCategory();
    }

    return {
      pageNumber: this.currentPage(),
      pageSize: this.pageSize(),
      filter,
      orderByValue: [{ colId: 'publishedDate', sort: 'desc' }],
    };
  }

  /**
   * Load categories for the sidebar filter.
   */
  private loadCategories(): void {
    this.newsService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.categories.set(response.data);
          }
        },
        error: (error: Error) => {
          console.error('Failed to load categories:', error.message);
        },
      });
  }

  // ============================================
  // PROTECTED METHODS — UI ACTIONS
  // ============================================

  /**
   * Handle category selection — resets to page 1 and reloads.
   */
  protected onCategoryChange(category: string): void {
    if (this.selectedCategory() === category) return; // Avoid duplicate calls
    this.selectedCategory.set(category);
    this.currentPage.set(1);
    this.loadNews();
  }

  /**
   * Handle paginator page change — loads new page from server.
   */
  protected onPageChange(event: PaginatorState): void {
    const newPage =
      Math.floor((event.first ?? 0) / (event.rows ?? DEFAULT_PAGE_SIZE)) + 1;
    const newSize = event.rows ?? DEFAULT_PAGE_SIZE;

    // Avoid reload if nothing changed
    if (newPage === this.currentPage() && newSize === this.pageSize()) return;

    this.currentPage.set(newPage);
    this.pageSize.set(newSize);
    this.loadNews();
    this.scrollToTop();
  }

  /**
   * Check if a category is currently selected.
   */
  protected isCategorySelected(categoryId: string): boolean {
    return this.selectedCategory() === categoryId;
  }

  // ============================================
  // PROTECTED METHODS — UTILITIES
  // ============================================

  /** Format date for display (Arabic locale) */
  protected formatDate(date: string | Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  }

  /** Get primary category name */
  protected getPrimaryCategory(news: News): string {
    return news.postCategories?.[0]?.categoryName ?? 'Uncategorized';
  }

  /** Get all categories for a news item */
  protected getItemCategories(news: News): { id: string; name: string }[] {
    return (
      news.postCategories?.map((cat) => ({
        id: cat.categoryId,
        name: cat.categoryName ?? 'Uncategorized',
      })) ?? []
    );
  }

  /** Check if news item has categories */
  protected hasCategories(item: News): boolean {
    return (item.postCategories?.length ?? 0) > 0;
  }

  /** Get featured image URL with fallback */
  protected getFeaturedImage(item: News): string {
    return (
      item.featuredImagePath ??
      item.postAttachments?.[0]?.url ??
      'assets/images/placeholder.jpg'
    );
  }

  /** Get visible tags (limited) */
  protected getVisibleTags(item: News): typeof item.tags {
    return item.tags?.slice(0, MAX_VISIBLE_TAGS) ?? [];
  }

  /** Check if news item has tags */
  protected hasTags(item: News): boolean {
    return (item.tags?.length ?? 0) > 0;
  }

  /** Get PrimeNG severity for status */
  protected getStatusSeverity(
    status: string | undefined,
  ): 'success' | 'warn' | 'info' {
    switch (status) {
      case 'Published':
        return 'success';
      case 'Draft':
        return 'warn';
      default:
        return 'info';
    }
  }

  /** Smooth scroll to top of section */
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============================================
  // ABSTRACT IMPLEMENTATION
  // ============================================

  /** Retry loading data from server */
  protected override retry(): void {
    this.currentPage.set(1);
    this.loadCategories();
    this.loadNews();
  }
}
