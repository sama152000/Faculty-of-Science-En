import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { News } from '../../../model/news.model';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  newsItem: News | null = null;
  relatedItems: News[] = [];
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadNewsItem(id);
    });
  }

  loadNewsItem(id: number): void {
    this.loading = true;
    this.error = false;

    const item = this.newsService.getById(id);
    this.newsItem = item || null;

    if (this.newsItem) {
      this.relatedItems = this.newsService.getRelatedNews(id);
      // If no related items found, get items of the same type
      if (this.relatedItems.length === 0) {
        this.relatedItems = this.newsService.getByType(this.newsItem.type)
          .filter(item => item.id !== id)
          .slice(0, 3);
      }
    } else {
      this.error = true;
    }

    this.loading = false;
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }

  goBackToType(): void {
    if (this.newsItem) {
      this.router.navigate(['/news'], { 
        queryParams: { type: this.newsItem.type } 
      });
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  shareOnSocial(platform: string): void {
    if (!this.newsItem) return;

    const url = window.location.href;
    const title = this.newsItem.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }
}