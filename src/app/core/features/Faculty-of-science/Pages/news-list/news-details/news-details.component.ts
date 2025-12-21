import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// PrimeNG Modules
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { TooltipModule } from 'primeng/tooltip';

// Base Component
import { BaseComponent } from '../../../../../../shared/components/base.component';

// Services & Models
import { NewsService } from '../../../Services/real-services/news.service';
import {
  News,
  PostAttachment,
  Tag as NewsTag,
} from '../../../model/news.model';

// Types for better type safety
type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'whatsapp';

interface GalleriaImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-news-details',
  imports: [
    CommonModule,
    RouterModule,
    // PrimeNG
    SkeletonModule,
    TagModule,
    ButtonModule,
    CardModule,
    GalleriaModule,
    TooltipModule,
  ],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailsComponent extends BaseComponent implements OnInit {
  // ============================================
  // DEPENDENCY INJECTION
  // ============================================
  private readonly newsService = inject(NewsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ============================================
  // STATE SIGNALS (Single Source of Truth)
  // ============================================
  protected readonly newsItem = signal<News | null>(null);
  protected readonly relatedItems = signal<News[]>([]);

  // ============================================
  // COMPUTED SIGNALS (Derived State)
  // ============================================

  /** Primary category display text */
  protected readonly primaryCategory = computed<string>(() => {
    const categories = this.newsItem()?.postCategories;
    if (!categories?.length) return 'News';
    return categories.map((cat) => cat.categoryName).join(' , ');
  });

  /** Featured image URL */
  protected readonly featuredImage = computed<string | null>(() => {
    const item = this.newsItem();
    if (!item) return null;
    return item.featuredImagePath ?? item.postAttachments?.[0]?.url ?? null;
  });

  /** All attachments for gallery */
  protected readonly attachments = computed<PostAttachment[]>(() => {
    return this.newsItem()?.postAttachments ?? [];
  });

  /** Gallery images formatted for PrimeNG Galleria */
  protected readonly galleriaImages = computed<GalleriaImage[]>(() => {
    return this.attachments().map((att) => ({
      itemImageSrc: att.url,
      thumbnailImageSrc: att.url,
      alt: att.fileName ?? 'Image',
      title: att.fileName ?? '',
    }));
  });

  /** Has attachments to show gallery */
  protected readonly hasGallery = computed<boolean>(() => {
    return this.attachments().length > 1;
  });

  /** Tags list */
  protected readonly tags = computed<NewsTag[]>(() => {
    return this.newsItem()?.tags ?? [];
  });

  /** Has tags */
  protected readonly hasTags = computed<boolean>(() => {
    return this.tags().length > 0;
  });

  /** Article status color */
  protected readonly statusSeverity = computed<'success' | 'warn' | 'info'>(
    () => {
      const status = this.newsItem()?.status;
      switch (status) {
        case 'Published':
          return 'success';
        case 'Draft':
          return 'warn';
        default:
          return 'info';
      }
    }
  );

  /** Formatted created date */
  protected readonly formattedDate = computed<string>(() => {
    const date = this.newsItem()?.createdDate;
    if (!date) return '';
    return this.formatDateValue(date);
  });

  /** Has related items */
  protected readonly hasRelatedItems = computed<boolean>(() => {
    return this.relatedItems().length > 0;
  });

  // ============================================
  // GALLERIA CONFIGURATION
  // ============================================
  protected readonly galleriaResponsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================
  ngOnInit(): void {
    this.subscribeToRouteParams();
  }

  // ============================================
  // PRIVATE METHODS - DATA LOADING
  // ============================================

  /**
   * Subscribe to route params changes
   * WHY: Reactive approach to handle route changes
   */
  private subscribeToRouteParams(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (params) => {
        const id = params['id'] as string;
        if (id) {
          this.loadNewsItem(id);
        }
      },
    });
  }

  /**
   * Load news item by ID
   * WHY: Separation of data fetching logic
   */
  private loadNewsItem(id: string): void {
    this.setLoading();

    this.newsService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.newsItem.set(response.data);
            this.loadRelatedNews(response.data);
            this.setSuccess();
          } else {
            this.setError('Article not found');
          }
        },
        error: (error: Error) => {
          this.handleError(error, 'Failed to load article');
        },
      });
  }

  /**
   * Load related news items
   * WHY: Encapsulated related news logic
   */
  private loadRelatedNews(currentItem: News): void {
    this.newsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const related = this.filterRelatedNews(response.data, currentItem);
            this.relatedItems.set(related);
          }
        },
        error: (error: Error) => {
          console.error('Failed to load related news:', error.message);
        },
      });
  }

  /**
   * Filter related news by category
   * WHY: Pure function for filtering logic - testable and predictable
   */
  private filterRelatedNews(allNews: News[], currentItem: News): News[] {
    const currentCategoryId = currentItem.postCategories?.[0]?.categoryId;
    const maxItems = 3;

    // Filter by same category, exclude current
    let related = allNews.filter(
      (item) =>
        item.id !== currentItem.id &&
        item.postCategories?.some((cat) => cat.categoryId === currentCategoryId)
    );

    // Fallback: get latest news if no related by category
    if (related.length === 0) {
      related = allNews.filter((item) => item.id !== currentItem.id);
    }

    return related.slice(0, maxItems);
  }

  // ============================================
  // PROTECTED METHODS - NAVIGATION (Template Use)
  // ============================================

  /** Navigate back to news list */
  protected goBack(): void {
    this.router.navigate(['/news']);
  }

  /** Navigate back to category */
  protected goBackToCategory(): void {
    const categoryId = this.newsItem()?.postCategories?.[0]?.categoryId;
    if (categoryId) {
      this.router.navigate(['/news'], {
        queryParams: { category: categoryId },
      });
    } else {
      this.goBack();
    }
  }

  // ============================================
  // PROTECTED METHODS - UTILITIES (Template Use)
  // ============================================

  /**
   * Format date for display
   * WHY: Centralized date formatting - consistent across component
   */
  protected formatDateValue(date: string | Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }

  /**
   * Get excerpt from content
   * WHY: Pure utility function for text truncation
   */
  protected getExcerpt(content: string | undefined, maxLength = 80): string {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  }

  /**
   * Get featured image for related item
   * WHY: Encapsulate image resolution logic
   */
  protected getRelatedItemImage(item: News): string {
    return (
      item.featuredImagePath ??
      item.postAttachments?.[0]?.url ??
      'assets/images/placeholder.jpg'
    );
  }

  // ============================================
  // PROTECTED METHODS - SOCIAL SHARING
  // ============================================

  /**
   * Share on social media
   * WHY: Type-safe platform handling with exhaustive switch
   */
  protected shareOnSocial(platform: SocialPlatform): void {
    const item = this.newsItem();
    if (!item) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(item.title);
    const shareUrl = this.buildShareUrl(platform, url, title);

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  /**
   * Build share URL based on platform
   * WHY: Pure function - easy to test and extend
   */
  private buildShareUrl(
    platform: SocialPlatform,
    url: string,
    title: string
  ): string {
    const shareUrls: Record<SocialPlatform, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
    };
    return shareUrls[platform];
  }

  /**
   * Copy link to clipboard
   * WHY: Simple async operation with proper error handling
   */
  protected async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // TODO: Replace with PrimeNG Toast notification
      console.log('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  }

  // ============================================
  // ABSTRACT IMPLEMENTATION
  // ============================================

  /** Retry loading the article */
  protected override retry(): void {
    const id = this.route.snapshot.params['id'] as string;
    if (id) {
      this.loadNewsItem(id);
    }
  }
}
