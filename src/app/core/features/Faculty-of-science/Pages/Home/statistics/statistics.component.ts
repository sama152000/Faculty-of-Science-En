import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Statistic {
  icon: string;
  value: number;
  label: string;
  suffix?: string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  statistics: Statistic[] = [
    {
      icon: 'fas fa-user-graduate',
      value: 1200,
      label: 'Students'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      value: 30,
      label: 'Academic Staff'
    },
    {
      icon: 'fas fa-flask',
      value: 10,
      label: 'Departments'
    },
    {
      icon: 'fas fa-trophy',
      value: 50,
      label: 'Research Projects'
    }
  ];

  displayValues: number[] = [];
  private animationIntervals: any[] = [];

  ngOnInit() {
    this.displayValues = new Array(this.statistics.length).fill(0);
    this.startCountAnimation();
  }

  ngOnDestroy() {
    this.animationIntervals.forEach(interval => {
      if (interval) clearInterval(interval);
    });
  }

  private startCountAnimation() {
    this.statistics.forEach((stat, index) => {
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