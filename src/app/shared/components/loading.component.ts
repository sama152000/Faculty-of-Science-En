/**
 * Global Loading Component
 * Displays a loading indicator when HTTP requests are in progress
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    @if (loadingService.isLoading()) {
    <div class="loading-overlay">
      <p-progressSpinner
        styleClass="custom-spinner"
        strokeWidth="3"
        animationDuration="1s"
      />
    </div>
    }
  `,
  styles: `
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(2px);
    }

    :host ::ng-deep .custom-spinner {
      width: 100px;
      height: 100px;
    }

    :host ::ng-deep .custom-spinner circle {
      stroke: var(--primary-color, #273075);
    }
  `,
})
export class LoadingComponent {
  protected loadingService = inject(LoadingService);
}
