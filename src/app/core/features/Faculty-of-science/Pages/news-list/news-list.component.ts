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

// Constants
const DEFAULT_ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_TAGS = 3;
const EXCERPT_MAX_LENGTH = 150;

@Component({
  selector: 'app-news-list',
  imports: [
    CommonModule,
    RouterModule,
    // PrimeNG
    SkeletonModule,
    TagModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
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
  // STATE SIGNALS (Single Source of Truth)
  // ============================================
  protected readonly allNews = signal<News[]>([]);
  protected readonly categories = signal<Category[]>([]);
  protected readonly selectedCategory = signal<string>('all');
  protected readonly first = signal<number>(0);
  protected readonly rows = signal<number>(DEFAULT_ITEMS_PER_PAGE);

  // ============================================
  // COMPUTED SIGNALS (Derived State)
  // ============================================

  /** Filtered news by selected category */
  protected readonly filteredNews = computed<News[]>(() => {
    const category = this.selectedCategory();
    const news = this.allNews();

    if (category === 'all') {
      return news;
    }

    return news.filter((item) =>
      item.postCategories?.some(
        (cat) => cat.categoryId === category || cat.categoryName === category
      )
    );
  });

  /** Total records for paginator */
  protected readonly totalRecords = computed<number>(() => {
    return this.filteredNews().length;
  });

  /** Paginated news items */
  protected readonly paginatedNews = computed<News[]>(() => {
    const start = this.first();
    const end = start + this.rows();
    return this.filteredNews().slice(start, end);
  });

  /** Has news items to display */
  protected readonly hasNews = computed<boolean>(() => {
    return this.paginatedNews().length > 0;
  });

  /** Show pagination */
  protected readonly showPagination = computed<boolean>(() => {
    return this.totalRecords() > this.rows();
  });

  /** Total news count */
  protected readonly totalNewsCount = computed<number>(() => {
    return this.allNews().length;
  });

  /** Selected category display name */
  protected readonly selectedCategoryName = computed<string>(() => {
    const categoryId = this.selectedCategory();
    if (categoryId === 'all') return 'All News & Articles';
    const category = this.categories().find((c) => c.id === categoryId);
    return category?.name ?? 'Category';
  });

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================
  ngOnInit(): void {
    this.loadNews();
    this.loadCategories();
  }

  // ============================================
  // PRIVATE METHODS - DATA LOADING
  // ============================================

  /**
   * Load all news articles
   * WHY: Separation of data loading logic
   */
  private loadNews(): void {
    this.setLoading();

    this.newsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const sortedNews = this.sortNewsByDate(response.data);
            this.allNews.set(sortedNews);
            this.setSuccess();
          } else {
            this.setError('No news found');
          }
        },
        error: (error: Error) => {
          this.handleError(error, 'Failed to load news');
        },
      });
  }

  /**
   * Load all categories
   * WHY: Separation of data loading logic
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

  /**
   * Sort news by date (newest first)
   * WHY: Pure function for sorting - testable and predictable
   */
  private sortNewsByDate(news: News[]): News[] {
    return [...news].sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  }

  // ============================================
  // PROTECTED METHODS - UI ACTIONS
  // ============================================

  /**
   * Handle category selection
   * WHY: Reset pagination when category changes
   */
  protected onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
    this.first.set(0); // Reset to first page
  }

  /**
   * Handle paginator page change
   * WHY: Unified handler for PrimeNG Paginator
   */
  protected onPageChange(event: PaginatorState): void {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? DEFAULT_ITEMS_PER_PAGE);
  }

  /**
   * Check if category is selected
   * WHY: Template helper for active state
   */
  protected isCategorySelected(categoryId: string): boolean {
    return this.selectedCategory() === categoryId;
  }

  // ============================================
  // PROTECTED METHODS - UTILITIES
  // ============================================

  /**
   * Get count of news in a category
   * WHY: Pure utility function for category counts
   */
  protected getCategoryCount(categoryId: string): number {
    if (categoryId === 'all') {
      return this.allNews().length;
    }
    return this.allNews().filter((item) =>
      item.postCategories?.some(
        (cat) =>
          cat.categoryId === categoryId || cat.categoryName === categoryId
      )
    ).length;
  }

  /**
   * Format date for display
   * WHY: Centralized date formatting
   */
  protected formatDate(date: string | Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  }

  /**
   * Get excerpt from content
   * WHY: Pure utility function for text truncation
   */
  protected getExcerpt(
    content: string | undefined,
    maxLength = EXCERPT_MAX_LENGTH
  ): string {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  }

  /**
   * Get primary category name from news item
   * WHY: Encapsulate category extraction logic
   */
  protected getPrimaryCategory(news: News): string {
    return news.postCategories?.[0]?.categoryName ?? 'Uncategorized';
  }

  /**
   * Get all categories for a news item
   * WHY: Display all categories when item has multiple
   */
  protected getItemCategories(news: News): { id: string; name: string }[] {
    return (
      news.postCategories?.map((cat) => ({
        id: cat.categoryId,
        name: cat.categoryName ?? 'Uncategorized',
      })) ?? []
    );
  }

  /**
   * Check if item has categories
   * WHY: Template helper for conditional rendering
   */
  protected hasCategories(item: News): boolean {
    return (item.postCategories?.length ?? 0) > 0;
  }

  /**
   * Get featured image URL
   * WHY: Encapsulate image resolution logic
   */
  protected getFeaturedImage(item: News): string {
    return (
      item.featuredImagePath ??
      item.postAttachments?.[0]?.url ??
      'assets/images/placeholder.jpg'
    );
  }

  /**
   * Get visible tags (limited to MAX_VISIBLE_TAGS)
   * WHY: Control tag display in template
   */
  protected getVisibleTags(item: News): typeof item.tags {
    return item.tags?.slice(0, MAX_VISIBLE_TAGS) ?? [];
  }

  /**
   * Check if item has tags
   * WHY: Template helper for conditional rendering
   */
  protected hasTags(item: News): boolean {
    return (item.tags?.length ?? 0) > 0;
  }

  /**
   * Get status severity for PrimeNG Tag
   * WHY: Map status to PrimeNG severity
   */
  protected getStatusSeverity(
    status: string | undefined
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

  // ============================================
  // ABSTRACT IMPLEMENTATION
  // ============================================

  /** Retry loading data */
  protected override retry(): void {
    this.loadNews();
    this.loadCategories();
  }
}
