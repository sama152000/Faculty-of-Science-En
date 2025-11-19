import { Component, OnInit } from '@angular/core';
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
export class LatestNewsComponent implements OnInit {
  news: News[] = [];
  currentIndex = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.news = this.newsService.getLatest(3);
  }

  nextNews() {
    if (this.currentIndex < this.news.length - 1) {
      this.currentIndex++;
    }
  }

  prevNews() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
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