import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../Services/news.service';
import { News } from '../../../model/news.model';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit, OnDestroy {
  news: News[] = [];
  extendedNews: News[] = [];
  currentIndex = 0;
  private autoplayIntervalId: any;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.news = this.newsService.getLatest(4);
    this.extendedNews = [...this.news, ...this.news];
    // Start autoplay timer
    this.autoplayIntervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.extendedNews.length;
      if (this.currentIndex === this.news.length) {
        setTimeout(() => {
          this.currentIndex = 0;
        }, 300);
      }
    }, 3000); // Change slide every 3 seconds
  }

  ngOnDestroy() {
    if (this.autoplayIntervalId) {
      clearInterval(this.autoplayIntervalId);
    }
  }

  nextNews() {
    this.currentIndex = (this.currentIndex + 1) % this.extendedNews.length;
    if (this.currentIndex === this.news.length) {
      setTimeout(() => {
        this.currentIndex = 0;
      }, 600);
    }
  }

  prevNews() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.news.length;
      setTimeout(() => {
        this.currentIndex = this.news.length - 1;
      }, 600);
    } else {
      this.currentIndex = (this.currentIndex - 1) % this.extendedNews.length;
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
