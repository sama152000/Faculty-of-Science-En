import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../../Services/real-services/statistics.service';

// Interface matching API response structure
interface Statistic {
  id: string;
  title: string;
  value: number;
  iconPath: string;
  isActive: boolean;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  isVisible = false;
  stats: Statistic[] = [];
  displayValues: number[] = [];
  loading = false;
  error: string | null = null;

  private statisticsService = inject(StatisticsService);
  private animationIntervals: any[] = [];
  private animationStarted = false;

  ngOnInit() {
    this.loadStatistics();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.animationIntervals.forEach((interval) => {
      if (interval) clearInterval(interval);
    });
  }

  /**
   * Load statistics from API
   */
  private loadStatistics(): void {
    this.loading = true;
    this.error = null;

    console.log('🔄 Loading statistics...');

    this.statisticsService.getAllStatistics().subscribe({
      next: (response: any) => {
        console.log('✅ Statistics response:', response);

        if (response && response.data) {
          // Filter only active statistics
          this.stats = response.data.filter((stat: any) => stat.isActive);
          // Initialize display values to 0
          this.displayValues = new Array(this.stats.length).fill(0);
          console.log('📊 Active statistics:', this.stats);

          // Start animation if already visible
          if (this.isVisible && !this.animationStarted) {
            this.startCountAnimation();
          }
        } else {
          console.warn('⚠️ No data in response');
          this.stats = [];
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error loading statistics:', error);
        this.error = 'Error loading statistics';
        this.loading = false;
      },
    });
  }

  /**
   * Setup intersection observer for animation
   */
  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            // Start animation when section becomes visible
            if (this.stats.length > 0 && !this.animationStarted) {
              this.startCountAnimation();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      const element = document.querySelector('.statistics-section');
      if (element) {
        observer.observe(element);
      }
    }, 100);
  }

  /**
   * Start count animation for statistics numbers
   */
  private startCountAnimation(): void {
    this.animationStarted = true;

    this.stats.forEach((stat, index) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current = Math.min(increment * step, stat.value);
        this.displayValues[index] = Math.floor(current);

        if (step >= steps) {
          clearInterval(interval);
          this.displayValues[index] = stat.value;
        }
      }, duration / steps);

      this.animationIntervals.push(interval);
    });
  }
}
