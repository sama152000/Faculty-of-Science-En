/**
 * Hero Component
 * Displays hero slider with data from API
 */
import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import {
  HeroSectionsService,
  HeroSection,
} from '../../../Services/real-services/hero-sections.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly heroService = inject(HeroSectionsService);

  // State signals
  slides = signal<HeroSection[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  currentSlide = signal(0);

  // Computed
  hasSlides = computed(() => this.slides().length > 0);
  activeSlide = computed(() => this.slides()[this.currentSlide()] || null);

  private autoplayInterval: any;

  ngOnInit(): void {
    this.loadHeroSections();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  loadHeroSections(): void {
    this.loading.set(true);
    this.error.set(null);

    this.heroService.getAllHeroSections().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Filter only active hero sections
          const activeSlides = response.data.filter((s) => s.isActive);
          this.slides.set(
            activeSlides.length > 0 ? activeSlides : response.data
          );
          this.startAutoplay();
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load hero sections');
        this.loading.set(false);
        console.error('Error loading hero sections:', err);
      },
    });
  }

  startAutoplay(): void {
    if (this.slides().length > 1) {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide(): void {
    const total = this.slides().length;
    if (total > 0) {
      this.currentSlide.set((this.currentSlide() + 1) % total);
    }
  }

  prevSlide(): void {
    const total = this.slides().length;
    if (total > 0) {
      this.currentSlide.set(
        this.currentSlide() === 0 ? total - 1 : this.currentSlide() - 1
      );
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  getSlideImage(slide: HeroSection): string {
    if (slide.heroAttachments && slide.heroAttachments.length > 0) {
      return slide.heroAttachments[0].url;
    }
    // Default fallback image
    return 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop';
  }

  retry(): void {
    this.loadHeroSections();
  }
}
