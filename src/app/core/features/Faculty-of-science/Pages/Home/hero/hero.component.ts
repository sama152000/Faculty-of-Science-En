import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: HeroSlide[] = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      title: 'Welcome to the Faculty of Science',
      subtitle: 'Excellence in Education, Research, and Innovation'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg',
      title: 'Innovative Research & Discovery',
      subtitle: 'Driving scientific progress through creativity and collaboration'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
      title: 'Empowering Future Scientists',
      subtitle: 'Preparing tomorrow\'s leaders in science and technology'
    }
  ];

  currentSlide = 0;
  autoplayInterval: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}