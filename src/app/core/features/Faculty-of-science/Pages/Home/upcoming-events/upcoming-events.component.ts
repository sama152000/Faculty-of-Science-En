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
import { PageRequest } from '../../../model/real model/page-request.model';
import { NewsTypeEnum } from '../../../../../enums/newsType.enum';
import { CleanHtmlPipe } from '../../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule, RouterModule, CleanHtmlPipe],
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingEventsComponent extends BaseComponent implements OnInit {
  // Services
  private readonly newsService = inject(NewsService);

  // State Signals
  protected events = signal<News[]>([]);
  paged: PageRequest = {
    pageNumber: 1,
    pageSize: 5,
    filter: {
      status: 'Published',
      type: NewsTypeEnum.EVENTS,
      isDeleted: false,
    },
    orderByValue: [{ colId: 'publishedDate', sort: 'desc' }],
  };
  ngOnInit(): void {
    this.loadEvents();
  }

  /**
   * Load events from API
   */
  private loadEvents(): void {
    this.setLoading();

    this.newsService.getPaged(this.paged).subscribe({
      next: (response: any) => {
        // Find featured news or use first one
        this.events.set(response.data);
        // Get small news (excluding featured)
        this.setSuccess();
      },
      error: (error) => {
        console.error('Error loading latest news From Server');
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
