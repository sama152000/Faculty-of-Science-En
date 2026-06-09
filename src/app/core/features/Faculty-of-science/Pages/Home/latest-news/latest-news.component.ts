import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

// Base Component
import { BaseComponent } from '../../../../../../shared/components/base.component';

// Services & Models
import { NewsService } from '../../../Services/real-services/news.service';
import { News } from '../../../model/news.model';
import { NewsTypeEnum } from '../../../../../enums/newsType.enum';
import { PageRequest } from '../../../model/real model/page-request.model';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, RouterModule, CleanHtmlPipe, SlicePipe],
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
  protected newsList = signal<News[]>([]);
  protected currentIndex = signal<number>(0);

  // Autoplay timer
  private autoplayIntervalId: any;

  // Computed: Total slides count
  protected totalSlides = computed(() => this.newsList().length);

  // Signal: Is mobile view
  protected isMobile = signal<boolean>(false);

  // Computed: Visible slides count (how many fit in viewport)
  protected visibleSlides = computed(() => {
    if (this.isMobile()) return 1;
    // On desktop, approximately 4 cards visible (container width / card width)
    return 4;
  });

  paged: PageRequest = {
    pageNumber: 1,
    pageSize: 10,
    filter: { status: 'Published', type: NewsTypeEnum.NEWS, isDeleted: false },
    orderByValue: [{ colId: 'publishedDate', sort: 'desc' }],
  };

  // Computed: Maximum index for slider (prevents scrolling past last cards)
  protected maxIndex = computed(() => {
    const total = this.totalSlides();
    const visible = this.visibleSlides();
    return Math.max(0, total - visible);
  });

  // Computed: Is slider mode (5 or more news items OR mobile view with more than 1 item)
  protected isSliderMode = computed(() => {
    const newsCount = this.newsList().length;
    return newsCount >= 5 || (this.isMobile() && newsCount > 1);
  });

  // Computed: Should show navigation buttons
  protected showNavButtons = computed(
    () => this.newsList().length > this.visibleSlides(),
  );

  // Computed: Get slide transform style
  protected getSlideTransform = computed(() => {
    if (this.isMobile()) {
      // On mobile, each slide is 100% width + gap
      // RTL context: Translate positive X to reveal items on the left
      return `translateX(${this.currentIndex() * 100}%)`;
    } else {
      // On desktop, each slide is 320px + 1rem gap (16px) = 336px
      // RTL context: Translate positive X to reveal items on the left
      return `translateX(${this.currentIndex() * 336}px)`;
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

    this.newsService.getPaged(this.paged).subscribe({
      next: (response: any) => {
        // Find featured news or use first one
        this.newsList.set(response.data);
        // Get small news (excluding featured)
        this.startAutoplay();
        this.setSuccess();
      },
      error: (error) => {
        console.error('Error loading latest news From Server');
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
