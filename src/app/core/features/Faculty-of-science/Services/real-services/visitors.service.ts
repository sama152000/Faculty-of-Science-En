/**
 * Visitors Service
 * Handles all API operations related to site visitors statistics
 * @version 1.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';

export interface VisitorResponse {
  todayViews: number;
}

export interface MonthVisitorResponse {
  monthViews: number;
}

export interface TotalVisitorResponse {
  totalViews: number;
}

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get today's visitor count
   * @returns Observable of today's visitor count
   */
  getToday(): Observable<VisitorResponse> {
    return this.http
      .get<VisitorResponse>(API_ENDPOINTS.VISITORS.TODAY)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get this month's visitor count
   * @returns Observable of monthly visitor count
   */
  getMonth(): Observable<MonthVisitorResponse> {
    return this.http
      .get<MonthVisitorResponse>(API_ENDPOINTS.VISITORS.MONTH)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get total visitor count
   * @returns Observable of total visitor count
   */
  getTotal(): Observable<TotalVisitorResponse> {
    return this.http
      .get<TotalVisitorResponse>(API_ENDPOINTS.VISITORS.TOTAL)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }
}
