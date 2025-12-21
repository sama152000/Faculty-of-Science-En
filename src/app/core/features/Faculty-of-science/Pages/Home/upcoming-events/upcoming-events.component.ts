import {
  Component,
  OnInit,
  inject,
  signal,
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
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingEventsComponent extends BaseComponent implements OnInit {
  // Services
  private readonly newsService = inject(NewsService);

  // State Signals
  protected events = signal<News[]>([]);

  ngOnInit(): void {
    this.loadEvents();
  }

  /**
   * Load events from API
   */
  private loadEvents(): void {
    this.setLoading();

    this.newsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            // Debug: Log all category names to see what exists
            console.log(
              'All posts categories:',
              response.data.map((item) => ({
                title: item.title,
                categories: item.postCategories?.map(
                  (c: any) => c.categoryName
                ),
              }))
            );

            // Filter only items with categoryName containing 'event'
            // Sort by createdDate descending and take latest 4
            const latestEvents = response.data
              .filter((item) =>
                item.postCategories?.some((cat: any) =>
                  cat.categoryName?.toLowerCase().includes('event')
                )
              )
              .sort(
                (a, b) =>
                  new Date(b.createdDate).getTime() -
                  new Date(a.createdDate).getTime()
              )
              .slice(0, 4);

            console.log('Filtered events:', latestEvents);

            this.events.set(latestEvents);
            this.setSuccess();
          } else {
            this.setError('No events found');
          }
        },
        error: (error) => {
          this.handleError(error, 'Failed to load events');
        },
      });
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
   * Get day from date
   */
  getDay(date: string | Date): string {
    if (!date) return '';
    return new Date(date).getDate().toString();
  }

  /**
   * Get month from date
   */
  getMonth(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short' });
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
   * Get excerpt from content
   */
  getExcerpt(content: string, maxLength: number = 80): string {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  }

  /**
   * Retry loading
   */
  protected override retry(): void {
    this.loadEvents();
  }
}
