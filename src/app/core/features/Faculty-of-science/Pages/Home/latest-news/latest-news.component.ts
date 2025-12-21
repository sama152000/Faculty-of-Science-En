import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Base Component
import { BaseComponent } from '../../../../../../shared/components/base.component';

// Services & Models
import { NewsService } from '../../../Services/real-services/news.service';
import { News } from '../../../model/news.model';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestNewsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  // Services
  private readonly newsService = inject(NewsService);

  // State Signals
  protected news = signal<News[]>([]);
  protected currentIndex = signal<number>(0);

  // Autoplay timer
  private autoplayIntervalId: any;

  // Computed: Total slides count
  protected totalSlides = computed(() => this.news().length);

  // Signal: Is mobile view
  protected isMobile = signal<boolean>(false);

  // Computed: Visible slides count (how many fit in viewport)
  protected visibleSlides = computed(() => {
    if (this.isMobile()) return 1;
    // On desktop, approximately 4 cards visible (container width / card width)
    return 4;
  });

  // Computed: Maximum index for slider (prevents scrolling past last cards)
  protected maxIndex = computed(() => {
    const total = this.totalSlides();
    const visible = this.visibleSlides();
    return Math.max(0, total - visible);
  });

  // Computed: Is slider mode (5 or more news items OR mobile view with more than 1 item)
  protected isSliderMode = computed(() => {
    const newsCount = this.news().length;
    return newsCount >= 5 || (this.isMobile() && newsCount > 1);
  });

  // Computed: Should show navigation buttons
  protected showNavButtons = computed(
    () => this.news().length > this.visibleSlides()
  );

  // Computed: Get slide transform style
  protected getSlideTransform = computed(() => {
    if (this.isMobile()) {
      // On mobile, each slide is 100% width + gap
      return `translateX(-${this.currentIndex() * 100}%)`;
    } else {
      // On desktop, each slide is 320px + 1rem gap (16px) = 336px
      return `translateX(-${this.currentIndex() * 336}px)`;
    }
  });

  // Resize listener
  private resizeListener: (() => void) | null = null;

  ngOnInit(): void {
    this.checkMobileView();
    this.setupResizeListener();
    this.loadLatestNews();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.removeResizeListener();
  }

  /**
   * Check if mobile view
   */
  private checkMobileView(): void {
    this.isMobile.set(window.innerWidth <= 768);
  }

  /**
   * Setup resize listener
   */
  private setupResizeListener(): void {
    this.resizeListener = () => this.checkMobileView();
    window.addEventListener('resize', this.resizeListener);
  }

  /**
   * Remove resize listener
   */
  private removeResizeListener(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  /**
   * Load latest news
   */
  private loadLatestNews(): void {
    this.setLoading();

    this.newsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            // Filter only items with categoryName === 'News'
            // Sort by createdDate descending and take latest (up to 10)
            const latestNews = response.data
              .filter((item) =>
                item.postCategories?.some(
                  (cat: any) => cat.categoryName === 'News'
                )
              )
              .sort(
                (a, b) =>
                  new Date(b.createdDate).getTime() -
                  new Date(a.createdDate).getTime()
              )
              .slice(0, 10);

            this.news.set(latestNews);
            this.startAutoplay();
            this.setSuccess();
          } else {
            this.setError('No news found');
          }
        },
        error: (error) => {
          this.handleError(error, 'Failed to load news');
        },
      });
  }

  /**
   * Start autoplay slider
   */
  private startAutoplay(): void {
    // Only autoplay in slider mode (more than visible items)
    if (!this.isSliderMode()) return;

    this.autoplayIntervalId = setInterval(() => {
      const current = this.currentIndex();
      const max = this.maxIndex();

      // Move to next slide, loop back to 0 when reaching max
      if (current >= max) {
        this.currentIndex.set(0);
      } else {
        this.currentIndex.set(current + 1);
      }
    }, 4000); // Change slide every 4 seconds
  }

  /**
   * Stop autoplay
   */
  private stopAutoplay(): void {
    if (this.autoplayIntervalId) {
      clearInterval(this.autoplayIntervalId);
    }
  }

  /**
   * Next slide
   */
  nextNews(): void {
    const current = this.currentIndex();
    const max = this.maxIndex();

    // Move to next slide, loop back to 0 when reaching max
    if (current >= max) {
      this.currentIndex.set(0);
    } else {
      this.currentIndex.set(current + 1);
    }
  }

  /**
   * Previous slide
   */
  prevNews(): void {
    const current = this.currentIndex();
    const max = this.maxIndex();

    // Move to previous slide, go to max when at 0
    if (current <= 0) {
      this.currentIndex.set(max);
    } else {
      this.currentIndex.set(current - 1);
    }
  }

  /**
   * Format date
   */
  formatDate(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Get excerpt from content
   */
  getExcerpt(content: string, maxLength: number = 100): string {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  }

  /**
   * Get featured image
   */
  getFeaturedImage(item: News): string {
    return (
      item.featuredImagePath ||
      item.postAttachments?.[0]?.url ||
      'assets/images/placeholder.jpg'
    );
  }

  /**
   * Retry loading
   */
  protected override retry(): void {
    this.loadLatestNews();
  }
}
