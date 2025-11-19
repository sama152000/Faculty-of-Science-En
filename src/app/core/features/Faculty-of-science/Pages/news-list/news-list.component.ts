import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../Services/news.service';
import { News } from '../../model/news.model';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  allNews: News[] = [];
  filteredNews: News[] = [];
  selectedType: 'all' | 'news' | 'article' = 'all';
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  constructor(public newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.allNews = this.newsService.getAll();
    this.filterNews();
  }

  filterNews(): void {
    if (this.selectedType === 'all') {
      this.filteredNews = this.allNews;
    } else {
      this.filteredNews = this.newsService.getByType(this.selectedType);
    }
    
    this.totalPages = Math.ceil(this.filteredNews.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  onTypeChange(type: 'all' | 'news' | 'article'): void {
    this.selectedType = type;
    this.filterNews();
  }

  getPaginatedNews(): News[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredNews.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
}